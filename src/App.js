import Auth from './Components/Auth';
import './Styles/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardUser from './Components/User/DashboardUser';
import DashboardAdmin from './Components/Admin/DashboardAdmin';
import UsersList from './Components/Admin/UsersManagement/usersList';
import EditUser from './Components/Admin/UsersManagement/editUser';
import AddUser from './Components/Admin/UsersManagement/addUser';
import QuizList from './Components/Admin/QuizManagement/QuizList';
import AddQuiz from './Components/Admin/QuizManagement/AddQuiz';
import EditQuiz from './Components/Admin/QuizManagement/EditQuiz';
import QuestionList from './Components/Admin/QuestionManagement/QuestionList';
import AddQuestion from './Components/Admin/QuestionManagement/AddQuestion';
import EditQuestion from './Components/Admin/QuestionManagement/EditQuestion';
import Question1_1 from './Components/User/Question1_1';

function App() {
  return (
    // Dans App.js
<Router>
  <Routes>
    <Route path="/" element={<Auth />} />
    <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
    <Route path="/dashboardUser" element={<DashboardUser />} />
    <Route path="dashboardAdmin/users" element={<UsersList />} />
    <Route path="dashboardAdmin/users/addUser" element={<AddUser />} />
    <Route path="dashboardAdmin/users/editUser/:id" element={<EditUser />} />
    <Route path="/dashboardAdmin/quizzes" element={<QuizList />} />
    <Route path="/dashboardAdmin/quizzes/add" element={<AddQuiz />} />
    <Route path="/dashboardAdmin/quizzes/edit/:quizId" element={<EditQuiz />} />
    <Route path="/dashboardAdmin/quiz/:quizId/questions" element={<QuestionList />} />
    <Route path="/dashboardAdmin/quiz/:quizId/add-question" element={<AddQuestion />} />
    <Route path="/dashboardAdmin/quiz/:quizId/edit-question/:questionId" element={<EditQuestion />} />
    <Route path="/dashboardAdmin/quiz/:quizId/questions1_1" element={<Question1_1 />} />

    


  </Routes>
</Router>
);
}

export default App;
