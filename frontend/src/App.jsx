import { useState } from "react";
import UploadResume from "./pages/UploadResume";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { isLoggedIn } from "./services/auth";

function App() {
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());
    const [showSignup, setShowSignup] = useState(false);

    if (loggedIn) {
        return <UploadResume />;
    }

    return showSignup ? (
        <Signup
            onSwitch={() => setShowSignup(false)}
        />
    ) : (
        <Login
            onLogin={() => setLoggedIn(true)}
            onSwitch={() => setShowSignup(true)}
        />
    );
}

export default App;