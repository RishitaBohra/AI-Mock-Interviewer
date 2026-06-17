from fastapi import FastAPI, UploadFile, File
from pypdf import PdfReader
from embeddings import get_embedding

from vector_store import store_chunks

from vector_store import (

store_chunks,

clear_collection

)

app = FastAPI()


@app.get("/")
def home():

    return {

        "message":"Backend Running"

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


    embeddings = []

    for chunk in chunks:

        embedding = get_embedding(chunk)

        embeddings.append(

            embedding.tolist()

        )

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