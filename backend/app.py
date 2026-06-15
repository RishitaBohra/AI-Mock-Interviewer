from fastapi import FastAPI, UploadFile, File
from pypdf import PdfReader

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
    chunks=chunk_text(text) 

    return {

        "text": text,
        "chunks": chunks


    }