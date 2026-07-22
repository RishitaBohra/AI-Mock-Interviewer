import { getToken } from "./auth";
const BASE_URL = "https://interviewer-backend-mnq2.onrender.com";

export const uploadResume = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData,
    });

    return response.json();
};

export const generateQuestions = async (role, difficulty) => {
    const response = await fetch(`${BASE_URL}/generate-questions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
            role,
            difficulty,
        }),
    });

    return response.json();
};

export const evaluateAnswer = async (question, answer) => {
    const response = await fetch(`${BASE_URL}/evaluate-answer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
            question,
            answer,
        }),
    });

    return response.json();
};
export const saveInterview = async (
  role,
  difficulty,
  duration,
  responses
) => {

  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/save-interview`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        role,
        difficulty,
        duration,
        responses,
      }),
    }
  );

  return response.json();
};
export const getInterviewHistory = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/interview-history`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};
export const loginUser = async (email, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    return response.json();
};
export const signupUser = async (name, email, password) => {
    const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    });

    return await response.json();
};