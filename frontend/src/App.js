import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute';  
import {AuthProvider} from './context/AuthContext';

import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import CreateEntryPage from './pages/CreateEntryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider> 
          <Header /> 
          <Routes>
            <Route element={<PrivateRoute><DashboardPage/></PrivateRoute>} path="/" exact />
            <Route element={<PrivateRoute><CreateEntryPage/></PrivateRoute>} path="/create-entry" />
            <Route element={<LoginPage/>} path="/login" />
            <Route element={<RegisterPage/>} path="/register" />
          </Routes>
        </AuthProvider> 
      </Router>
    </div>
  );
}

export default App;
