import React, { useContext, useRef, useState, useEffect } from 'react';
import './Main.css'; 
import user_icon from '../../assets/user_icon.png'; 
import compass_icon from '../../assets/compass_icon.png';
import bulb_icon from '../../assets/bulb_icon.png';
import code_icon from '../../assets/code_icon.png';
import message_icon from '../../assets/message_icon.png';
import Gallery_icon from '../../assets/Gallery_icon.png';
import Microphone_icon from '../../assets/Microphone_icon.png';
import Send_icon from '../../assets/Send_icon.png';
import Wandut_icon from '../../assets/Wandut_icon.png';
import { Context } from '../../context/context'; 

const Main = () => {
  const { 
    onSent, 
    recentPrompt, 
    showResult, 
    loading, 
    resultData, 
    setInput, 
    input, 
    userImage 
  } = useContext(Context);
  
  const fileInputRef = useRef(null);
  const [inputHeight, setInputHeight] = useState(40);
  const [isRecording, setIsRecording] = useState(false);
  const [userName, setUserName] = useState('');
  const [emailVisible, setEmailVisible] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      const name = email.split('@')[0];
      setUserName(name.charAt(0).toUpperCase() + name.slice(1));
      setUserEmail(email);
    }
  }, []);

  const handleGalleryClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      // Process the file for analysis
      sendFileForAnalysis(file);
    }
  };

  const sendFileForAnalysis = (file) => {
    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append('file', file);

    // Send the file to your AI backend (replace with your actual endpoint)
    fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // You may want to set the result data here to display it
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setInputHeight(e.target.scrollHeight);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && input) {
      e.preventDefault();
      sendInput();
    }
  };

  const sendInput = () => {
    if (input) {
      onSent();
      setInput('');
      setInputHeight(40);
    }
  };

  const handleMicrophoneClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript); 
      sendInput(); 
    };

    recognition.onerror = (event) => {
      console.error('Error occurred in recognition: ' + event.error);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const toggleEmailVisibility = () => {
    setEmailVisible(!emailVisible);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>WandutTech-AI</p>
        <img 
          src={userImage || user_icon} 
          alt="User icon" 
          onClick={toggleEmailVisibility}
          style={{ cursor: 'pointer' }} 
        />
        {emailVisible && <p className="user-email">{userEmail}</p>}
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, {userName || 'User'}.</span></p>
              <p>How can I assist you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest places to see on an upcoming trip</p>
                <img src={compass_icon} alt="Compass icon" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={bulb_icon} alt="Light bulb icon" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={message_icon} alt="Message icon" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={code_icon} alt="Code icon" />
              </div>
            </div>
          </>
        ) : (
          <div className='result'>
            <div className="result-title">
              <img src={userImage || user_icon} alt="User icon" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={Wandut_icon} alt="Wandut icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input 
              onChange={handleInputChange} 
              onKeyDown={handleInputKeyDown} 
              value={input} 
              type="text" 
              placeholder="Ask WandutTech-AI anything"
            />
            <div>
              <img 
                src={Gallery_icon} 
                alt="Gallery icon" 
                onClick={handleGalleryClick}
                style={{ cursor: 'pointer' }}
              />
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                style={{ display: 'none' }}
              />
              <img 
                src={Microphone_icon} 
                alt="Microphone icon" 
                onClick={handleMicrophoneClick}
                style={{ cursor: 'pointer', opacity: isRecording ? 0.5 : 1 }}
              />
              {input ? (
                <img 
                  onClick={sendInput} 
                  src={Send_icon} 
                  alt="Send icon" 
                />
              ) : null}
            </div>
          </div>
          
          {/* Copyright Section */}
          <div className="copyright">
            <p>Copyright © 2025 WandutTech. All rights reserved. Developer, Engineer Ganun Gattang.</p>
          </div>
          
        </div> 
        
      </div>
    </div>
  );
}

export default Main;