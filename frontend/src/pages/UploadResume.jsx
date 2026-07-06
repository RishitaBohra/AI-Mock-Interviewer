import { useEffect, useState } from "react"
import {

uploadResume,

generateQuestions,

evaluateAnswer

}

from "../services/api"
function UploadResume(){
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
useEffect(() => {

    if (!interviewStarted) return

    const timer = setInterval(() => {

        setSeconds((prev) => prev + 1)

    }, 1000)

    return () => clearInterval(timer)

}, [interviewStarted])
const handleGenerateQuestions = async () => {

    const data = await generateQuestions(

        role,

        difficulty

    )

    console.log(data)

    setQuestions(data.questions)

const parsedQuestions = data.questions
  .split("\n")
  .filter((q) => q.trim() !== "")

setQuestionList(parsedQuestions)

setCurrentQuestion(0)
setInterviewCompleted(false)
setSeconds(0)

setInterviewStarted(true)
    setEvaluation("")
setAnswer("")

}
const handleEvaluate = async () => {
  try {
    const data = await evaluateAnswer(questions, answer)

    if (data.evaluation) {
      setEvaluation(data.evaluation)
    } else {
      setEvaluation("Could not evaluate the answer right now. Please try again later.")
    }
  } catch (error) {
    console.error(error)

    setEvaluation(
      "Gemini evaluation is temporarily unavailable because the API quota has been reached. Please try again later."
    )
  }
}

const handleResetInterview = () => {
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
const handleUpload = async () => {

    const data = await uploadResume(file)

    console.log(data)

    alert("Resume Uploaded Successfully")

}
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

     <div className="session-time">
  ⏱{" "}
  {new Date(seconds * 1000)
    .toISOString()
    .substring(11, 19)}
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

  <button onClick={handleGenerateQuestions}>
    Generate Questions ✨
  </button>
</div>
<button
  className="reset-button"
  onClick={handleResetInterview}
>
  🔄 Reset Interview
</button>

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
    disabled={currentQuestion===questionList.length-1}
    onClick={() => {
  if (currentQuestion === questionList.length - 1) {
    setInterviewCompleted(true);
  } else {
    setCurrentQuestion(currentQuestion + 1);
    setAnswer("");
    setEvaluation("");
  }
}}
  >
    Next →
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

  <button
    onClick={handleEvaluate}
    disabled={!answer.trim()}
  >
    Evaluate Response →
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