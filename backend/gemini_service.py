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


def evaluate_answer(

    question,

    answer

):


    prompt = f"""

You are a technical interviewer.


Question:

{question}


Candidate Answer:

{answer}


Evaluate the answer and provide:

1. Score out of 10

2. Correctness

3. Missing Points

4. Ideal Answer


Keep the response concise.

"""


    response = client.models.generate_content(

        model="gemini-2.0-flash",

        contents=prompt

    )


    return response.text