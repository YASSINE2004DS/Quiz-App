import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiArrowLeft } from 'react-icons/fi';

const Question1_1 = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
const [score, setScore] = useState(0);
const [showScore, setShowScore] = useState(false);
const [selectedAnswer, setSelectedAnswer] = useState(null);
const [sauvegarderdAnswer, setSauvegardeanswer] = useState([]);

const handleAnswer = (choice) => {
  setSelectedAnswer(choice);
  if (choice === questions[currentIndex].correctAnswer) {
    setScore((prev) => prev + 1);
  }
  setSauvegardeanswer((prev)=>([...prev , choice]));
};

const handleNext = () => {
  if (currentIndex + 1 < questions.length) {
    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(sauvegarderdAnswer[currentIndex+1] || null); 
  } else {
    setShowScore(true);
  }
};
const handlePrecedent = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedAnswer(sauvegarderdAnswer[currentIndex-1]);
    } else {
      setShowScore(true);
    }
  };



  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/questions/quiz/${quizId}`);
        setQuestions(res.data);
        setLoading(false);
      } catch (error) {
        alert("Erreur lors du chargement des questions");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId]);

  const handleDelete = async (questionId) => {
      try {
        await axios.delete(`http://localhost:3001/questions/${questionId}`);
        setQuestions(questions.filter((q) => q._id !== questionId));
      } catch (error) {
        console.error("Erreur lors de la suppression de la question");
      }
  };

  return (
    <div className="quiz-list-container" style={{backgroundColor:'black' , width:'100vw' , alignItems:'center' , display:'flex' , flexDirection:'column'}}>
        <div style={{ display:'flex' , flexDirection:'column' ,}}>
      <div className="header" style={{alignSelf:'flex-start',}}>
        <button className="back-button" onClick={() => navigate(-1)}>
          <FiArrowLeft className="icon" /> Retour
        </button>
      </div>

      {loading ? (
        <div className="loader">Chargement...</div>
      ) : (
        <div className="quiz-table">
          <div className="table-header">
            <div className="header-cell">Question {currentIndex+1}</div>
          {!showScore && (<span style={{color:'darkred'}}>🛑 Veuillez choisir une réponse avant de passer à la suivante. Une seule réponse doit être choisie à la fois. </span>)}  
          </div>

   

          <div className="table-rows-container">
  {questions.length > 0 && !showScore ? (
    <div className="table-row" key={questions[currentIndex]._id}>
      <div className="table-cell" style={{fontWeight:'bold' , fontSize:20 ,}}>
        <strong>{questions[currentIndex].text}</strong>
      </div>
      <div className="table-cell" style={{width:'100%' }}>
        <ul className="choices-list">
          {questions[currentIndex].choices.map((choice, index) => (
            <li
              key={index}
              className="choice-item"
          
              onClick={() =>!selectedAnswer && handleAnswer(choice)}
              style={{ cursor: selectedAnswer==null ? 'pointer' : 'default' , backgroundColor: 
                ( (choice==questions[currentIndex].correctAnswer && selectedAnswer==questions[currentIndex].correctAnswer) )
                ? 'green' : selectedAnswer== choice ? 'red' : 'white' , padding:30 , fontWeight:'bold' , fontSize:20 , }}
            >
              {choice}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div className="empty-state" style={{height:200 , display:'block'}}>
     <div> 🎉 Quiz terminé !</div><br /><br/>
     
      <div style={{fontWeight:'bold'  ,}}>Votre score : <span style={{color:(score >= questions.length/2 ) ? 'green' : 'red' , fontWeight:'bold' ,}}>{score} / {questions.length} </span>
      {(score >= questions.length/2) ? (
        <span>✅</span>
      ):(
        <span>❌</span>
      )
      }
      </div>  
    </div>
  )}

  {!showScore && (
  <div style={{ textAlign: 'right', padding: '1rem' , display:'flex' , justifyContent:'flex-end' , columnGap:5 }}>
        {(currentIndex > 0) && (  <button
        onClick={handlePrecedent}
        className="add-button"
        style={{backgroundColor:"darkviolet"}}
      >
        précedent
      </button>
  )}
      <button
        onClick={handleNext}
        className="add-button"
        disabled={selectedAnswer === null}
        style={{backgroundColor:selectedAnswer===null ? "gray" : "darkviolet"}}
      >
        Suivant
      </button>
    </div>
  )}
</div>

        </div>
      )}
      </div>

      <style jsx>{`
        .quiz-list-container {
          padding: 2rem;
          width: 100%;
          height: 100vh;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          gap: 1rem;
        }
        
        h1 {
          color: #2d3748;
          font-size: 1.8rem;
          font-weight: 600;
          margin: 0;
          flex-grow: 1;
          text-align: center;
        }
        
        .back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #edf2f7;
          color: #4a5568;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .back-button:hover {
          background: #e2e8f0;
        }
        
        .add-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #4f46e5;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .add-button:hover {
          background: #4338ca;
          transform: translateY(-1px);
        }
        
        .quiz-table {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          height: fit-content;
          display: flex;
          flex-direction: column;
          width:60rem;

        }
        
        .table-header {
          display: grid;
          grid-template-columns: 2fr 3fr 1fr;
          background: #f7fafc;
          padding: 1rem 1.5rem;
          font-weight: 600;
          color: #4a5568;
          border-bottom: 1px solid #e2e8f0;
          flex-shrink: 0;
        }
        
        .table-rows-container {
          overflow-y: auto;
          flex-grow: 1;

        }
        
        .table-row {
          display: flex;
          flex-direction:column ;
          padding: 1rem 1.5rem;
          align-items: center;
          transition: background 0.2s;
          border-bottom: 1px solid #edf2f7;
        
        }
        
        .table-row:last-child {
          border-bottom: none;
        }
        
        .table-row:hover {
          background: #f8fafc;
        }
        
        .table-cell {
          color: #2d3748;
          padding: 0.5rem 0;
        }
        
        .choices-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        
        .choice-item {
          padding: 0.5rem 0;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .choice-item:last-child {
          border-bottom: none;
        }
        
        .choice-item.correct {
          color: #38a169;
          font-weight: 600;
        }
        
        .actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
        }
        
        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .action-btn .icon {
          font-size: 1.1rem;
        }
        
        .edit {
          background: #fefcbf;
          color: #d69e2e;
        }
        
        .delete {
          background: #fff5f5;
          color: #e53e3e;
        }
        
        .action-btn:hover {
          transform: scale(1.1);
        }
        
        .empty-state {
          padding: 3rem;
          text-align: center;
          color: #a0aec0;
          font-size: 1.1rem;
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .loader {
          padding: 2rem;
          text-align: center;
          color: #4a5568;
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        @media (max-width: 768px) {
          .header {
            flex-direction: row;
            flex-wrap: wrap;
          }
          
          h1 {
            order: 1;
            width: 100%;
            margin: 1rem 0;
          }
          
          .back-button {
            order: 0;
          }
          
          .add-button {
            order: 2;
          }
          
          .table-header, .table-row {
            grid-template-columns: 1fr;
          }
          
          .table-header .actions,
          .table-row .actions {
            grid-column: 1;
            justify-content: flex-start;
            margin-top: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Question1_1;