# <p align="center">AI Code Review Tool</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"></a>
  <a href="#"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/LangChain-3498DB?style=for-the-badge" alt="LangChain"></a>
</p>

## Introduction

This project is an AI-powered code review tool designed to help developers improve the quality and consistency of their code. It utilizes a React frontend for user interaction and a Node.js backend with Langchain for generating code reviews based on a set of guidelines. The target users are software developers looking to automate and enhance their code review process.

## Table of Contents

1.  [Key Features](#key-features)
2.  [Installation Guide](#installation-guide)
3.  [Usage](#usage)
4.  [Environment Variables](#environment-variables)
5.  [Project Structure](#project-structure)
6.  [Technologies Used](#technologies-used)
7.  [License](#license)

## Key Features

*   **AI-Powered Code Review:** Generates comprehensive code reviews using a language model and a knowledge base of coding guidelines.
*   **Customizable Guidelines:** Supports loading coding guidelines from multiple files, allowing for customization to specific project needs.
*   **Efficient Similarity Search:** Uses FAISS for fast similarity search of relevant guidelines based on the input code.
*   **React Frontend:** Provides a user-friendly interface for submitting code and viewing reviews.
*   **Asynchronous Processing:** Handles code review requests asynchronously to ensure responsiveness.

## Installation Guide

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

4.  **Create a `.env` file in the `backend` directory:**

    ```
    OPENAI_API_KEY=<your_openai_api_key>
    ```

5.  **Run the backend server:**

    ```bash
    cd ../backend
    npm start
    ```

6.  **Run the frontend application:**

    ```bash
    cd ../frontend
    npm run dev # or npm start, depending on your setup
    ```

## Usage

1.  Open the frontend application in your web browser.
2.  Paste your code into the provided textarea.
3.  Click the "Review Code" button.
4.  The AI-generated code review will be displayed below the textarea.

The frontend communicates with the backend via the `/api/review` endpoint, sending the code for review and receiving the generated feedback.

## Environment Variables

*   `OPENAI_API_KEY`: Your OpenAI API key, required for accessing the language model.

## Project Structure

```
├── backend/
│   ├── index.js              # Main backend server file (Node.js with Express)
│   ├── package.json          # Backend dependencies and scripts
│   ├── package-lock.json
│   ├── guidelines/           # Directory containing coding guideline files
│   │   ├── style-guide.txt
│   │   ├── security-checks.txt
│   │   └── naming-conventions.txt
│   └── faiss-index/          # Directory to store faiss index
│       └── docstore.json     # faiss docstore
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main React component
│   │   ├── main.jsx          # Entry point for the React application
│   │   ├── index.css         # Global styles
│   │   ├── App.css           # Component-specific styles
│   │   └── assets/
│   │       └── react.svg    # React logo
│   ├── index.html            # HTML entry point
│   ├── package.json          # Frontend dependencies and scripts
│   ├── package-lock.json
│   ├── vite.config.js        # Vite configuration
│   └── eslint.config.js      # ESLint Configuration
```

## Technologies Used

<p align="center">
    <a href="#"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"></a>
    <a href="#"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"></a>
    <a href="#"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"></a>
    <a href="#"><img src="https://img.shields.io/badge/LangChain-3498DB?style=for-the-badge" alt="LangChain"></a>
    <a href="#"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"></a>
</p>

*   **Backend:** Node.js, Express.js, Langchain, faiss-node
*   **Frontend:** React, Axios
*   **Other:** OpenAI API

## License

MIT
