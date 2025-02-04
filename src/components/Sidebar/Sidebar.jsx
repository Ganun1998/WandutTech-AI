import React, { useContext, useState } from 'react';
import './Sidebar.css';
import menu_icon from '../../assets/menu_icon.png';
import plus_icon from '../../assets/plus_icon.png';
import message_icon from '../../assets/message_icon.png';
import question_icon from '../../assets/question_icon.png';
import history_icon from '../../assets/history_icon.png';
import setting_icon from '../../assets/setting_icon.png';
import { Context } from '../../context/context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, setRecentPrompt, newChat, prevPrompts } = useContext(Context); // Ensure prevPrompts is included

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    try {
      await onSent(prompt);
    } catch (error) {
      console.error("Error sending prompt:", error);
    }
  };

  return (
    <div className='sidebar'>
      <div className='top'>
        <img 
          className="menu" 
          src={menu_icon} 
          alt="Menu Icon" 
          onClick={() => setExtended(!extended)} 
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={plus_icon} alt="New Chat Icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div 
                key={index} // Added key prop
                onClick={() => loadPrompt(item)} 
                className="recent-entry"
              >
                <img src={message_icon} alt="Message Icon" />
                <p>{item.slice(0, 18)}....</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={question_icon} alt="Help Icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={history_icon} alt="Activity Icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={setting_icon} alt="Settings Icon" />
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;