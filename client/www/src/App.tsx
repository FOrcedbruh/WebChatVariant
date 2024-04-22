import { io } from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import ChatPage from "./pages/chat/chatPage";

const socket = io('http://localhost:8080');

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home socket={socket}/>}/>
                <Route path="/chat" element={<ChatPage socket={socket}/>}/>
            </Routes>
        </>
    )
}

export default App;