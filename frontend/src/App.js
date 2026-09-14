
import './App.css';
import{Routes,Route} from 'react-router-dom'

import PublicLayout from './Layout/PublicLayout';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Location from './pages/public/Location';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register'
import ProtectedRoute from './components/ProtctedRoute';
import Dashboard from './pages/student/Dashboard'
import Profile from './pages/student/Profile';
import Payment from './pages/student/Payment';
import Comments from './pages/student/Comments';
import Documents from './pages/student/Documents'
import Application from './pages/student/Application';
import StudentLayout from './Layout/StudentLayout';
import RegistrarLayout from './Layout/RegiserarLayout';
import RApplication from './pages/registrar/RApplication'
import RStudents from './pages/registrar/RStudents';
import RComments from './pages/registrar/RComments';
import RReports from './pages/registrar/RReports';
import RDashboard from './pages/registrar/RDashboard';
import DeanLayout from './Layout/DeanLayout';
import DDashboard from './pages/dean/DDashboard';
import DStudents from './pages/dean/DStudents';
import DPayments from './pages/dean/DPayments';
import DComments from './pages/dean/DComments';
import DReports from './pages/dean/DReports';

function App() {
  return (

    <Routes>
    {/* PUBLIC */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/location" element={<Location />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* STUDENT */}
      <Route
        path="/student"
        element={<ProtectedRoute role="student">
          <StudentLayout/>
        </ProtectedRoute>}
      >
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="profile" element={<Profile />} />
        <Route path="application" element={<Application />} />
        <Route path="documents" element={<Documents />} />
        <Route path="payment" element={<Payment />} />
        <Route path="comments" element={<Comments />} />
      </Route>
        {/* REGISTRAR */}
        <Route
          path="/registrar"
          element={
            <ProtectedRoute role="registrar">
              <RegistrarLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<RDashboard/>} />
          <Route path="applications" element={<RApplication />} />
          <Route path="students" element={<RStudents />} />
          <Route path="comments" element={<RComments />} />
          <Route path="reports" element={<RReports />} />
        </Route>
         {/* DEAN */}
        <Route
          path="/dean"
          element={
            <ProtectedRoute role="dean">
              <DeanLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DDashboard />} />
          <Route path="students" element={<DStudents />} />
          <Route path="payments" element={<DPayments />} />
          <Route path="comments" element={<DComments />} />
          <Route path="reports" element={<DReports />} />
        </Route>
       
    </Routes>
  
      
  );
}

export default App;
