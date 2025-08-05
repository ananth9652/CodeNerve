import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const guidelinesDir = path.join(__dirname, "guidelines");
const faissIndexPath = path.join(__dirname, "faiss-index");

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
});

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

async function loadDocs() {
  const files = fs.readdirSync(guidelinesDir);
  const docs = files.map(file => {
    const content = fs.readFileSync(path.join(guidelinesDir, file), "utf-8");
    return new Document({ pageContent: content, metadata: { source: file } });
  });

  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 50 });
  return await splitter.splitDocuments(docs);
}

async function buildVectorStore() {
  console.log("⚙ Building FAISS index...");
  const docs = await loadDocs();
  const vectorStore = await FaissStore.fromDocuments(docs, embeddings);
  await vectorStore.save(faissIndexPath);
  console.log(" FAISS index built and saved.");
}

async function loadVectorStore() {
  console.log(" Loading FAISS index...");
  return await FaissStore.load(faissIndexPath, embeddings);
}

(async () => {
  if (!fs.existsSync(faissIndexPath)) {
    await buildVectorStore();
  }

  const vectorStore = await loadVectorStore();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post("/api/review", async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) {
        return res.status(400).json({ message: "Code is required." });
      }

      const relevantDocs = await vectorStore.similaritySearch(code, 3);
      const context = relevantDocs.map(doc => doc.pageContent).join("\n");

      const prompt = `You are an expert code reviewer. Use the following coding guidelines:\n
        ${context}\n\nNow review this code and provide suggestions:\n\n${code}`;
      const response = await model.invoke(prompt);

      
      let reviewText = "";
      if (typeof response.content === "string") {
        reviewText = response.content;
      } else if (Array.isArray(response.content)) {
        reviewText = response.content.map(c => c.text || "").join("\n");
      } else {
        reviewText = response.toString();
      }

      res.json({ review: reviewText });
    } catch (err) {
      console.error("Error during review:", err);
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  });

  app.listen(3000, () => {
    console.log("Server running on 3000");
  });
})();
