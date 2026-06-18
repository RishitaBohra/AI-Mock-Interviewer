import os

from dotenv import load_dotenv

from google import genai


load_dotenv()


client = genai.Client(

api_key=os.getenv(

"GEMINI_API_KEY"

)

)

def generate_questions(

context,

role,

difficulty

):
    prompt=f"""

You are an interviewer.


Role:

{role}


Difficulty:

{difficulty}


Resume Context:

{context}


Generate

5 interview questions.

Only return questions.

"""
    

    response = client.models.generate_content(

    model="gemini-2.5-flash",

    contents=prompt

    )
    return response.text