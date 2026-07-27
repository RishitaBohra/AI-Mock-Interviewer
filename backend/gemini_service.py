import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


# -----------------------------
# Generate Embeddings
# -----------------------------
def get_embedding(text):
    response = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text
    )

    return response.embeddings[0].values


# -----------------------------
# Generate Interview Questions
# -----------------------------
def generate_questions(
    context,
    role,
    difficulty,
    company
):

    prompt = f"""
You are an experienced technical interviewer.

Role:
{role}

Difficulty:
{difficulty}

Target Company:
{company}

Resume Context:
{context}

Generate exactly 5 technical interview questions.

The questions should resemble the interview style commonly asked at {company}.

Use the candidate's resume context whenever possible to personalize the questions.

Only return the questions.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text


# -----------------------------
# Evaluate Candidate Answer
# -----------------------------
def evaluate_answer(question, answer):

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
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text

# -----------------------------
# Generate Overall Interview Summary
# -----------------------------
def generate_interview_summary(responses):

    prompt = f"""
You are a senior technical interviewer.

Below are all the interview responses of a candidate.

{responses}

Based on the complete interview, generate:

1. Overall Score (/10)
2. Technical Knowledge (/10)
3. Communication Skills (/10)
4. Problem Solving (/10)
5. Confidence (/10)

Then provide:

Strengths:
- 3 bullet points

Areas for Improvement:
- 3 bullet points

Keep the response concise and professional.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text