import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import SignIn from "../SignIn/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
export default App;