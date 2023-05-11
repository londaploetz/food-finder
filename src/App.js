import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/RunningSections/Header';
import Login from './Components/Views/Welcome';
import { BrowserRouter as Router } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Home from './Components/Views/Home';
import Signup from './Components/Views/SignUp';

function App() {

  return (
    <div className="App">
        <Router>
       <Routes>
        <Route 
                  path="/home"
                  element={
                  < Home />
                  }
                />
                <Route path="/" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>  
             </Router>       
    </div>
  );
}

export default App;
