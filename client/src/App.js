import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDocs from "./pages/UserDocs";
import CreateDoc from "./pages/CreateDoc";
import DocEdit from "./pages/DocEdit";
import ViewDoc from "./pages/ViewDoc";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-doc" element={<CreateDoc />} />
        <Route path="/my-docs" element={<UserDocs />} />
        <Route path="/edit-doc/:id" element={<DocEdit />} />
        <Route path="/view-doc/:id" element={<ViewDoc />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
