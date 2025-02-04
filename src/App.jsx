import React from 'react'
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Main from './components/Main/Main.jsx';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <Main />
    </div>
  )
}

export default App

