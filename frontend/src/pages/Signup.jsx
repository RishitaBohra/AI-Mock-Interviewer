import "./Signup.css";
import { useState } from "react";
import { signupUser } from "../services/api";

function Signup({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const data = await signupUser(name, email, password);

    console.log("Signup Response:", data);

    if (data.success) {
        alert("Account created successfully!");
        onSwitch();
    } else {
        alert(data.message || data.detail || JSON.stringify(data));
    }
};

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="logo">
          AI Mock <span>Interviewer</span>
        </div>

        <h1>
          Start Your <span>AI</span><br />
          Interview Journey
        </h1>

        <p>
          Create your account to upload your resume, practice
          personalized interviews, and receive AI-powered feedback.
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
          <h2>Create Account ✨</h2>

          <p className="subtitle">
            Sign up to begin your AI interview practice.
          </p>

          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <button onClick={handleSignup}>
            Create Account
          </button>

          <p className="switch">
            Already have an account?{" "}
            <span onClick={onSwitch}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;