# Interviewer AI 🎤🤖

An AI-powered mock interview platform that generates personalized interview questions from an uploaded resume using Retrieval-Augmented Generation (RAG). The application evaluates candidate responses using Google's Gemini API and provides real-time interview practice.

## 🚀 Live Demo

**Frontend:** https://ai-mock-interviewer-woad-delta.vercel.app/



---

## ✨ Features

- 📄 Upload Resume (PDF)
- 🤖 AI-generated interview questions based on your resume
- 🔍 Retrieval-Augmented Generation (RAG)
- 🧠 Semantic Search using ChromaDB
- 📚 Resume Chunking & Vector Embeddings
- 🎯 Role-based interview generation
- 📈 Difficulty selection (Easy / Medium / Hard)
- ⏱ Live interview timer
- 📝 Answer evaluation using Gemini AI
- 💡 AI-generated feedback and improvement suggestions
- 🌙 Modern responsive UI

---

## 🏗 Tech Stack

### Frontend
- React.js
- Vite
- Axios
- CSS

### Backend
- FastAPI
- Python
- Gemini API
- Sentence Transformers
- ChromaDB
- PyPDF

### AI / RAG
- Resume Parsing
- Text Chunking
- Vector Embeddings
- Semantic Search
- Retrieval-Augmented Generation (RAG)

---

## 📂 Project Structure

```
AI-Mock-Interviewer
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── services
│
├── backend
│   ├── app.py
│   ├── embeddings.py
│   ├── vector_store.py
│   ├── gemini_service.py
│   ├── chroma_db
│   └── requirements.txt
│
└── README.md
```

---

## ⚙️ How It Works

1. Upload Resume PDF
2. Extract text from resume
3. Split text into semantic chunks
4. Generate embeddings using Sentence Transformers
5. Store embeddings in ChromaDB
6. Retrieve relevant resume context
7. Generate interview questions using Gemini API
8. Evaluate candidate responses
9. Display AI-generated feedback

---

## 🧠 AI Pipeline

```
Resume PDF
      │
      ▼
Text Extraction
      │
      ▼
Chunking
      │
      ▼
Sentence Transformer Embeddings
      │
      ▼
ChromaDB Vector Store
      │
      ▼
Semantic Retrieval
      │
      ▼
Gemini API
      │
      ▼
Interview Questions + Evaluation
```

---

## 🛠 Installation

### Clone Repository

```bash
git clone https://github.com/RishitaBohra/AI-Mock-Interviewer.git

cd AI-Mock-Interviewer
```

### Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run FastAPI

```bash
uvicorn app:app --reload
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` inside the backend directory.

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

## 📌 API Endpoints

## API Endpoints

- GET / - Backend status
- GET /health - Health check
- POST /upload - Upload resume
- POST /generate-questions - Generate interview questions
- POST /evaluate-answer - Evaluate answer

---

## 📸 Screenshots

- Resume Upload
- AI Question Generation
- Live Interview
- AI Evaluation

*(Add screenshots here)*

---

## 🎯 Future Improvements

- 🎙 Voice-based interviews
- 📊 Interview analytics dashboard
- 📄 Downloadable interview reports
- 🌍 Multi-language support
- 🔐 User authentication
- ☁ Persistent cloud vector database

---

## 👩‍💻 Author

**Rishita Bohra**

GitHub: https://github.com/RishitaBohra

LinkedIn: *(Add your LinkedIn profile)*

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub!