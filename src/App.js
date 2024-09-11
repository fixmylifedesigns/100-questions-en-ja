import React, { useState, useEffect } from "react";
import CardGame from "./components/ui/CardGame";
import { Button } from "./components/ui/Button";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import questions from "./questions.json";
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
