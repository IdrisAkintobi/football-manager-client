import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Auth />} />
    </Routes>
  </Router>
);

export default App;
