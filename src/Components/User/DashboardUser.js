
import quizIcon from "../../assets/quiz.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiEye, FiEdit2, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { FaQuestionCircle } from "react-icons/fa";


function DashboardUser() {

    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3001/quiz")
          .then((response) => {
            setQuizzes(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des quiz", error);
            setLoading(false);
          });
      }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#000',
      color: '#fff',
      padding: '2rem',
      boxSizing: 'border-box',

    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' , position:'absolute' , top:15 }}>
        <h1 style={{ color:'orange' , fontSize: '2.5rem', fontWeight: 'bold' }}>Quiz App</h1>
        <p style={{ fontSize: '1.1rem' }}>Bienvenue sur la plateforme Quiz.</p>
      </div>
          <div className="table-rows-container" style={{}}>
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <div className="table-row" key={quiz._id}>
                    <div style={{display:'flex' , flexDirection:'column'}}>
                  <h1 className="table-cell">{quiz.title}</h1>
                  <div className="table-cell description" style={{alignSelf:'flex-start' , color:'white'}}>{quiz.description}</div>
                  </div>
                   <button className="button Sbutton"
                   style={{
                    borderColor:'red',
                    backgroundColor:'darkred',
                    alignSelf:'flex-end'
                   }}
                   onClick={() => navigate(`/dashboardAdmin/quiz/${quiz._id}/questions1_1`)}
                   >Commencer</button>
                </div>
              ))
            ) : (
              <div className="empty-state">
                Aucun quiz disponible. Créez-en un nouveau !
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
          height: calc(100vh - 180px);
          display: flex;
          flex-direction: column;
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
    
          display:grid ;
        grid-Template-Columns: repeat(4, 1fr);
            gap: 2rem 1rem;
          width:100% ;

        }
        
        .table-row {
         display:flex;
         flex-direction:column ;
         justify-content:space-between ;
          padding: 1rem 1.5rem;
          align-items: center;
          transition: background 0.2s;
          border-bottom: 1px solid #edf2f7;
          height:200px ;
          width:99.5% ;
          background-color:darkorange ;
        // background-image : url(${quizIcon}) no-repeat ;
        }
        
        .table-row:last-child {
          border-bottom: none;
        }
        
        .table-row:hover {
          background:orange;
        }
        
        .table-cell {
          color: #2d3748;
          padding: 0.5rem 0;
          font-size:20px ;
        }
        
        .description {
          color: #718096;
          font-size: 1em;
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
        
        .view {
          background: #ebf8ff;
          color: #3182ce;
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

          .Sbutton
          {
          background-color:red ;
          color : white ;
          width:200px ;
          height:150px ;
          position:absolute ;
          bottom:10px ;
          left : 50% ;
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
            grid-template-columns: 1fr 1fr;
          }
          
          .table-header .actions,
          .table-row .actions {
            grid-column: span 2;
            justify-content: center;
            margin-top: 1rem;
          }
        }
      `}</style>
        </div>

  

  );
}

export default DashboardUser;
