import { useEffect, useState } from "react"
import { logout } from "../services/auth";
import {
  uploadResume,
  generateQuestions,
  evaluateAnswer,
  saveInterview,
  generateSummary
} from "../services/api";

function UploadResume({ onLogout, onHistory }) {
const [file,setFile] = useState(null)
const [role,setRole] = useState("")
const [difficulty,setDifficulty] = useState("")
const [questions,setQuestions] = useState("")
const [answer,setAnswer] = useState("")
const [evaluation,setEvaluation] = useState("")
const [questionList, setQuestionList] = useState([])
const [currentQuestion, setCurrentQuestion] = useState(0)
const [seconds, setSeconds] = useState(0)
const [interviewStarted, setInterviewStarted] = useState(false)
const [interviewCompleted, setInterviewCompleted] = useState(false);
const [responses, setResponses] = useState([]);
const [isListening, setIsListening] = useState(false);
const [recognition, setRecognition] = useState(null);
const [summary, setSummary] = useState("");
const [company, setCompany] = useState("Google");
const [loadingQuestions, setLoadingQuestions] = useState(false);
const [loadingEvaluation, setLoadingEvaluation] = useState(false);

useEffect(() => {

    if (!interviewStarted || interviewCompleted)
        return;

    const timer = setInterval(() => {

        setSeconds(prev => prev + 1);

    },1000);

    return () => clearInterval(timer);

},[
    interviewStarted,
    interviewCompleted
]);
useEffect(() => {

  if (!interviewCompleted) return;

  const completeInterview = async () => {

    try {

      await saveInterview(
        role,
        difficulty,
        seconds,
        responses
      );

      const result = await generateSummary(
        responses
      );

      setSummary(result.summary);

    } catch (error) {

      console.error(error);

    }

  };

  completeInterview();

}, [interviewCompleted]);
useEffect(() => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.log("Speech Recognition is not supported.");
    return;
  }

  const recognitionInstance = new SpeechRecognition();

  recognitionInstance.continuous = true;
  recognitionInstance.interimResults = true;
  recognitionInstance.lang = "en-US";

  recognitionInstance.onresult = (event) => {
    let transcript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }

    setAnswer(transcript);
  };

  recognitionInstance.onend = () => {
    setIsListening(false);
  };

  setRecognition(recognitionInstance);
}, []);
useEffect(() => {
  if (questionList.length > 0) {
    speakQuestion();
  }
}, [currentQuestion, questionList]);
useEffect(() => {
  return () => {
    window.speechSynthesis.cancel();
  };
}, []);
const handleGenerateQuestions = async () => {

  try {

    setLoadingQuestions(true);

    const data = await generateQuestions(
      role,
      difficulty,
      company
    );

    setQuestions(data.questions);

    const parsedQuestions = data.questions
      .split("\n")
      .filter((q) => q.trim() !== "");

    setQuestionList(parsedQuestions);

    setCurrentQuestion(0);
    setResponses([]);
    setInterviewCompleted(false);
    setSeconds(0);
    setInterviewStarted(true);
    setEvaluation("");
    setAnswer("");

  } finally {

    setLoadingQuestions(false);

  }
};
const handleEvaluate = async () => {

  try {

    setLoadingEvaluation(true);

    const data = await evaluateAnswer(
      questions,
      answer
    );

    if (data.evaluation) {

      setEvaluation(data.evaluation);

      const currentResponse = {
        question: questionList[currentQuestion],
        answer,
        evaluation: data.evaluation,
      };

      setResponses((prev) => {
        const updated = [...prev];
        updated[currentQuestion] = currentResponse;
        return updated;
      });

    }

  } catch (error) {

    console.error(error);

    setEvaluation(
      "Gemini evaluation is temporarily unavailable."
    );

  } finally {

    setLoadingEvaluation(false);

  }

};

const handleResetInterview = () => {
  window.speechSynthesis.cancel();
  setFile(null);
  setRole("");
  setDifficulty("");
  setQuestions("");
  setQuestionList([]);
  setCurrentQuestion(0);
  setAnswer("");
  setEvaluation("");
  setSeconds(0);
  setInterviewStarted(false);
  setResponses([]);
  setInterviewCompleted(false);
setInterviewStarted(false);
setSeconds(0);
setSummary("");
};

const handleCopyQuestion = async () => {
  try {
    await navigator.clipboard.writeText(
      questionList[currentQuestion]
    );

    alert("Question copied to clipboard!");
  } catch (err) {
    alert("Failed to copy question.");
  }
};
const speakQuestion = () => {
    if (!questionList[currentQuestion]) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
        questionList[currentQuestion]
    );

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((v) =>
        v.lang.startsWith("en")
    );

    if (englishVoice) {
        utterance.voice = englishVoice;
    }

    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
};
const startListening = () => {
  if (!recognition) return;

  recognition.start();
  setIsListening(true);
};

const stopListening = () => {
  if (!recognition) return;

  recognition.stop();
  setIsListening(false);
};
const handleUpload = async () => {

    const data = await uploadResume(file)

    console.log(data)

    alert("Resume Uploaded Successfully")

  
}
const handleLogout = () => {
    window.speechSynthesis.cancel();
    logout();
    onLogout();
};
return (
  <div className="app-shell">
    <header className="topbar">
  <div className="brand">
    <span className="brand-icon">◈</span>
    <span>Interviewer</span>
  </div>

  <div className="live-status">
    <span className="status-dot"></span>
    Live Interview Practice
  </div>

  <div className="header-right">
  <div className="session-time">
    ⏱{" "}
    {new Date(seconds * 1000)
      .toISOString()
      .substring(11, 19)}
  </div>

  <button
    className="nav-button"
    onClick={onHistory}
    style={{ marginRight: "10px" }}
  >
    📜 History
  </button>

  <button
    className="logout-btn"
    onClick={handleLogout}
  >
    Logout
  </button>
</div>
</header>

    <main className="interview-layout">
  <div className="sidebar-panel">
  <p className="section-label">RESUME</p>

  <div className={`resume-card ${file ? "resume-ready" : ""}`}>
  <span className="file-icon">{file ? "✓" : "▣"}</span>

  <div>
    <strong>{file ? file.name : "No resume selected"}</strong>
    <p>{file ? "Ready to upload" : "Choose a PDF to begin"}</p>
  </div>
</div>

  <label className="file-picker">
  <span>Choose Resume PDF</span>

  <input
    type="file"
    accept=".pdf"
    onChange={(e) => setFile(e.target.files[0])}
  />
</label>

  <button onClick={handleUpload}>
    Upload Resume
  </button>

  <p className="section-label">INTERVIEW SETUP</p>

  <label>Role</label>
  <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
  >
    <option value="SDE Intern">SDE Intern</option>
    <option value="Frontend Developer">Frontend Developer</option>
    <option value="Flutter Developer">Flutter Developer</option>
  </select>

  <label>Difficulty</label>
  <select
    value={difficulty}
    onChange={(e) => setDifficulty(e.target.value)}
  >
    <option value="Easy">Easy</option>
    <option value="Medium">Medium</option>
    <option value="Hard">Hard</option>
  </select>

  <label>Company</label>

<select
  value={company}
  onChange={(e) => setCompany(e.target.value)}
>
  <option>Google</option>
  <option>Amazon</option>
  <option>Microsoft</option>
  <option>Infosys</option>
  <option>TCS</option>
  <option>Accenture</option>
  <option>Flipkart</option>
</select>

  <button
  onClick={handleGenerateQuestions}
  disabled={loadingQuestions}
>
  {loadingQuestions
    ? "🤖 Generating..."
    : "Generate Questions ✨"}
</button>

<button
    className="reset-button"
    onClick={handleResetInterview}
>
    🔄 Reset Interview
</button>

</div>



<div className="question-panel">
  <p className="section-label">QUESTION</p>



  {interviewCompleted ? (

<div className="completion-card">

  <div className="completion-icon">🎉</div>

  <h2>Interview Completed!</h2>

  <p>
    Congratulations! You have successfully completed your mock interview.
  </p>

  <div className="completion-stats">
    <p><strong>Questions Attempted:</strong> {questionList.length}</p>

    <p>
      <strong>Time Taken:</strong>{" "}
      {new Date(seconds * 1000)
        .toISOString()
        .substring(11, 19)}
    </p>
  </div>
  {summary && (

<div className="evaluation-box">

    <p className="section-label">
        OVERALL INTERVIEW REPORT
    </p>

    <pre>{summary}</pre>

</div>

)}

</div>

) : questionList.length > 0 ? (
  <>
    <h2>
      Question {currentQuestion + 1} of {questionList.length}
    </h2>
    <div className="progress-container">
  {questionList.map((_, index) => (
    <div
      key={index}
      className={`progress-dot ${
        index <= currentQuestion ? "active-dot" : ""
      }`}
    />
  ))}
</div>

  <div className="question-header">
  <h3>Interview Question</h3>

  <button
    className="copy-button"
    onClick={handleCopyQuestion}
  >
    📋 Copy
  </button>
</div>

<pre className="question-text">
  {questionList[currentQuestion]}
</pre>

<div style={{ marginTop: "10px", marginBottom: "15px" }}>
  <button
    className="nav-button"
    onClick={speakQuestion}
  >
    🔊 Read Question
  </button>
</div>
    <div className="question-navigation">

  <button
    className="nav-button"
    disabled={currentQuestion === 0}
    onClick={()=>{
      setCurrentQuestion(currentQuestion-1)
      setAnswer("")
      setEvaluation("")
    }}
  >
    ← Previous
  </button>

  <button
  className="nav-button"
  onClick={() => {
    if (currentQuestion === questionList.length - 1) {
      setInterviewCompleted(true);
    } else {
      window.speechSynthesis.cancel();
      setCurrentQuestion(currentQuestion + 1);
      setAnswer("");
      setEvaluation("");
    }
  }}
>
  {currentQuestion === questionList.length - 1
    ? "Finish Interview"
    : "Next →"}
</button>

</div>
  </>
) : (
   <div className="start-card">
  <div className="start-icon">◈</div>

  <h3>Your interview is ready to begin</h3>

  <p>
    Upload your resume, choose a role and difficulty,
    then generate your first question.
  </p>
</div>
  )}
</div>

<div className="answer-panel">
  <p className="section-label">YOUR ANSWER</p>

  <textarea
    placeholder="Write your detailed answer here..."
    value={answer}
    onChange={(e) => setAnswer(e.target.value)}
  />
  <div style={{ marginTop: "10px", marginBottom: "15px" }}>
  {!isListening ? (
    <button
      className="nav-button"
      onClick={startListening}
    >
      🎤 Start Speaking
    </button>
  ) : (
    <button
      className="logout-btn"
      onClick={stopListening}
    >
      ⏹ Stop Recording
    </button>
  )}
</div>

  <button
  onClick={handleEvaluate}
  disabled={!answer.trim() || loadingEvaluation}
>
  {loadingEvaluation
    ? "🧠 Evaluating..."
    : "Evaluate Response →"}
</button>

  {evaluation && (
    <div className="evaluation-box">
      <p className="section-label">EVALUATION</p>
      <pre>{evaluation}</pre>
    </div>
  )}
</div>
    </main>
  </div>
)

}

export default UploadResume