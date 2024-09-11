import React from "react";
import CardGame from "./components/ui/CardGame";
import MessageBoard from "./components/MessageBoard";

const App = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <h1 style={{ textAlign: "center" }}>Bilingual Message Board</h1>
      <div className="flex-1 flex items-center justify-center p-4">
        <CardGame />
      </div>
      <div className="flex-1">
        <MessageBoard />
      </div>
    </div>
  );
};

export default App;
