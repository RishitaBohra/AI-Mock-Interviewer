import { useState } from "react";
import UploadResume from "./pages/UploadResume";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InterviewHistory from "./pages/InterviewHistory";
import { isLoggedIn } from "./services/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [showSignup, setShowSignup] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  if (loggedIn) {
    return showHistory ? (
      <InterviewHistory
        onBack={() => setShowHistory(false)}
      />
    ) : (
      <UploadResume
        onLogout={() => setLoggedIn(false)}
        onHistory={() => setShowHistory(true)}
      />
    );
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