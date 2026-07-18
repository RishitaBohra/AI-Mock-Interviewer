import { useState } from "react";
import { loginUser } from "../services/api";
import { saveToken } from "../services/auth";

function Login({ onLogin }) {
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
        <div className="login-container">
            <h1>AI Mock Interviewer</h1>

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
        </div>
    );
}

export default Login;