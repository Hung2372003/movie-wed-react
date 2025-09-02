import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.page";
import "./App.css";
import HeaderComponent from "./layouts/header/header.component";
import FooterComponent from "./layouts/footer/footer.component";

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
