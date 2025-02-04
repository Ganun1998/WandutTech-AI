import React from 'react'; // Ensure React is imported
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ContextProvider from './context/context.jsx'; // Make sure to import ContextProvider

const Main = () => {
  return (
    <ContextProvider>
      <App />
    </ContextProvider>
  );
};

// Create the root and render the Main component
createRoot(document.getElementById('root')).render(<Main />);
