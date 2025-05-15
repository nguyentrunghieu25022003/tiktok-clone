import { Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import Following from "./pages/Following";
import Live from "./pages/Live";
import Upload from "./pages/Upload";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile/:authorId" element={<Profile />} />
        <Route path="discover" element={<Discover />} />
        <Route path="following" element={<Following />} />
        <Route path="live" element={<Live />} />
        <Route path="upload" element={<Upload />} />
      </Route>
    </Routes>
  );
}

export default App;
