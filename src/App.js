import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/RunningSections/Header';
import HomePage from "./Components/Views/HomePage"



function App() {

  return (
    <div className="App">
      <Header/>
      <HomePage/> 
    </div>
  );
}

export default App;
