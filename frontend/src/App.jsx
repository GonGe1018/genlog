import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing.jsx";
import Blog from "./pages/Blog/Blog";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/blog" element={<Blog />} />
      </Routes>
  );
}

export default App;
