import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/RunningSections/Header';
import Login from './Components/Views/Welcome';
import { BrowserRouter as Router } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Home from './Components/Views/Home';
import Signup from './Components/Views/SignUp';
import { AuthProvider } from './provider/AuthProvider';

function App() {

  return (
    <div className="App">
        <Router>
       
        <AuthProvider>
       <Routes>
        <Route 
                  path="/home"
                  element={
                  < Home />
                  }
                /> 
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
             
            </Routes>  
            </AuthProvider>
             </Router>       
    </div>
  );
}

export default App;
