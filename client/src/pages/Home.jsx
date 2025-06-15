import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Home = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
      <Navbar />
      <Header />
      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChat((prev) => !prev)}
        style={{
          position: "fixed",
          bottom: 40,
          right: 40,
          zIndex: 1000,
          background: "#4f46e5",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 60,
          height: 60,
          fontSize: 28,
          boxShadow: "0 2px 8px #0003",
          cursor: "pointer",
        }}
        aria-label="Chat with AI"
      >
        💬
      </button>
      {/* Chatbot Iframe Popup */}
      {showChat && (
        <div
          style={{
            position: "fixed",
            bottom: 110,
            right: 40,
            zIndex: 1000,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 16px #0004",
            overflow: "hidden",
          }}
        >
          <iframe
            src="/chatbot.html"
            style={{
              width: 350,
              height: 500,
              border: "none",
              borderRadius: 16,
              display: "block",
            }}
            title="ChatBot"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
