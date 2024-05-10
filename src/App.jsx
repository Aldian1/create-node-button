import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import EasyConnectExample from "./pages/EasyConnectExample.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/easy-connect" element={<EasyConnectExample />} />
      </Routes>
    </Router>
  );
}

export default App;
