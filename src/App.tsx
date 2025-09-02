import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.page";
import "./App.css";
import HeaderComponent from "./layouts/header/header.component";
import FooterComponent from "./layouts/footer/footer.component";
import LoginComponent from "./layouts/log-in/log-in.component";
import { useState } from "react";
import SignupModal from "./layouts/sign-up/sign-up.component";
function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  return (
    <BrowserRouter>
       <LoginComponent  isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}/>
       <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)}/>
       <HeaderComponent onLoginOpen={() => setIsLoginOpen(true)} onSignupOpen={() => setIsSignupOpen(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
