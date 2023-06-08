import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './RunningSections/Header';
import Login from './Views/Welcome';
import Signup from './Views/Signup';
import { BrowserRouter as Router } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Home from './Views/Home';
import  TestProvider  from './AuthContext.js';
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
                 <Route 
                  path="/"
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
