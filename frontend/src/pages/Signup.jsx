import { useState } from "react";
import { signupUser } from "../services/api";

function Signup({ onSwitch }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        const data = await signupUser(name, email, password);

        if (data.success) {
            alert("Account created successfully! Please login.");
            onSwitch();
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="login-container">
            <h1>Create Account</h1>

            <input
                placeholder="Name"
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
                Sign Up
            </button>

            <p>
                Already have an account?{" "}
                <button onClick={onSwitch}>
                    Login
                </button>
            </p>
        </div>
    );
}

export default Signup;