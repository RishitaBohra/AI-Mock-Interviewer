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