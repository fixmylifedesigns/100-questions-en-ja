import React, { useState, useEffect } from 'react';
import questions from '../../questions.json'
// Sample questions (you can expand this list)

const CardGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [language, setLanguage] = useState('english');
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(true);
    const timer = setTimeout(() => setFlipped(false), 300);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex, language]);

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
  };

  const randomQuestion = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * questions.length);
    } while (newIndex === currentQuestionIndex);
    setCurrentQuestionIndex(newIndex);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'japanese' : 'english');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        perspective: '1000px',
        width: '300px',
        height: '200px',
        marginBottom: '20px',
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}>
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            // padding: '20px',
            textAlign: 'center',
            fontSize: '18px',
            color: '#333',
          }}>
            <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '14px', color: '#666' }}>
              Card {currentQuestionIndex + 1}/{questions.length}
            </div>
            {questions[currentQuestionIndex][language]}
          </div>
        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '300px',
        marginBottom: '20px',
      }}>
        <button onClick={prevQuestion} style={buttonStyle}>Previous</button>
        <button onClick={randomQuestion} style={{...buttonStyle, backgroundColor: '#FFA500'}}>Random</button>
        <button onClick={nextQuestion} style={buttonStyle}>Next</button>
      </div>
      <button onClick={toggleLanguage} style={{
        ...buttonStyle,
        backgroundColor: '#4CAF50',
        width: '300px',
      }}>
        Switch to {language === 'english' ? 'Japanese' : 'English'}
      </button>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 15px',
  fontSize: '14px',
  color: 'white',
  backgroundColor: '#007bff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

export default CardGame;