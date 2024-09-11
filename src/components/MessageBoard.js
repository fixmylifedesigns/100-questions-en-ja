import React, { useState } from "react";

// Replace with your actual Google Translate API key
const GOOGLE_TRANSLATE_API_KEY = "AIzaSyAho3iyPuT2yumTDf_pGfCcXLjp8m0gymE";

const translateText = async (text, targetLang) => {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          target: targetLang,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Translation request failed");
    }

    const data = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return "Translation error";
  }
};

const isJapanese = (text) => {
  return /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(
    text
  );
};

function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      setIsLoading(true);
      const isEnglish = !isJapanese(inputText);
      let translatedText;
      try {
        translatedText = await translateText(
          inputText,
          isEnglish ? "ja" : "en"
        );
      } catch (error) {
        translatedText = "Translation failed";
      }
      const newMessage = {
        original: inputText,
        translated: translatedText,
        isEnglish: isEnglish,
      };
      setMessages([...messages, newMessage]);
      setInputText("");
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
          marginBottom: "20px",
          height: "200px",
          overflowY: "auto",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              textAlign: message.isEnglish ? "right" : "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                maxWidth: "70%",
                padding: "10px",
                borderRadius: "10px",
                background: message.isEnglish ? "#007bff" : "#28a745",
                color: "white",
              }}
            >
              <div>{message.original}</div>
              <div
                style={{ fontSize: "0.8em", opacity: 0.8, marginTop: "5px" }}
              >
                {message.translated}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", marginBottom: "10px" }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            flexGrow: 1,
            padding: "10px",
            marginRight: "10px",
            borderRadius: "20px",
            border: "1px solid #ccc",
          }}
          placeholder="Type a message in English or Japanese..."
          disabled={isLoading}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "20px",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Translating..." : "Send"}
        </button>
      </form>
      <button
        onClick={handleClear}
        style={{
          width: "100%",
          padding: "10px",
          background: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "20px",
        }}
      >
        Clear All Messages
      </button>
    </div>
  );
}

export default MessageBoard;
