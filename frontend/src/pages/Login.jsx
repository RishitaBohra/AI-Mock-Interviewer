import "./Login.css";
import { useState } from "react";
import { loginUser } from "../services/api";
import { saveToken } from "../services/auth";

function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = await loginUser(email, password);

    if (data.success) {
      saveToken(data.token);
      onLogin();
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="logo">
          AI Mock <span>Interviewer</span>
        </div>

        <h1>
          Your Personal <span>AI</span><br />
          Interview Coach
        </h1>

        <p>
          Upload your resume, answer AI-generated interview questions,
          receive personalized feedback, and improve your interview
          confidence.
        </p>

        <div className="features">
          <div className="feature">
            <div className="icon">📄</div>
            Resume Based Questions
          </div>

          <div className="feature">
            <div className="icon">🤖</div>
            AI Evaluation
          </div>

          <div className="feature">
            <div className="icon">📈</div>
            Track Your Progress
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-container">
          <h2>Welcome Back 👋</h2>

          <p className="subtitle">
            Login to continue your interview practice.
          </p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>
            Login
          </button>

          <p className="switch">
            Don't have an account?{" "}
            <span onClick={onSwitch}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;