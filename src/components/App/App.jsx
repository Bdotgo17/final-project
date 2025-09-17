import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../../pages/SavedNews";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
