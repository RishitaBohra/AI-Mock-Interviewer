from fastapi import FastAPI, UploadFile, File
from pypdf import PdfReader
from gemini_service import (
    generate_questions,
    evaluate_answer,
    get_embedding
)
from pydantic import BaseModel

from fastapi.middleware.cors import CORSMiddleware

from vector_store import search_chunks



from vector_store import (

store_chunks,

clear_collection

)

from models import UserSignup
from auth import hash_password
from database import users_collection
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-mock-interviewer-woad-delta.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():

    return {

        "message":"Backend Running"

    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "AI Mock Interviewer Backend"
    }

def chunk_text(

text,

chunk_size=500

):

    chunks=[]

    for i in range(

        0,

        len(text),

        chunk_size

    ):

        chunk=text[i:i+chunk_size]

        chunks.append(chunk)

    return chunks
@app.post("/upload")
async def upload_resume(

    file: UploadFile = File(...)

):

    reader = PdfReader(file.file)

    text = ""

    for page in reader.pages:

        text += page.extract_text()

    chunks = chunk_text(text)


    embeddings = [get_embedding(chunk) for chunk in chunks]

    clear_collection()
    store_chunks(

        chunks,

        embeddings

    )


    return {

        "text": text,

        "chunks": chunks,

        "stored": True,

        "total_chunks": len(chunks)

    }

class InterviewRequest(

    BaseModel

):

    role:str

    difficulty:str

class EvaluationRequest(

    BaseModel

):

    question:str

    answer:str

@app.post(

    "/generate-questions"

)

def interview(

    request:

    InterviewRequest

):


    query = request.role

    query_embedding = get_embedding(query)


    results = search_chunks(

        query_embedding

    )



    context = "\n".join(

        results["documents"][0]

    )



    questions = generate_questions(

        context,

        request.role,

        request.difficulty

    )



    return {

        "questions":

        questions

    }


@app.post(

    "/evaluate-answer"

)

def evaluate(

    request:

    EvaluationRequest

):


    result = evaluate_answer(

        request.question,

        request.answer

    )


    return {

        "evaluation":

        result

    }

@app.post("/signup")
def signup(user: UserSignup):

    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if existing_user:
        return {
            "success": False,
            "message": "Email already registered."
        }

    hashed_password = hash_password(user.password)

    users_collection.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hashed_password
    })

    return {
        "success": True,
        "message": "User registered successfully."
    }