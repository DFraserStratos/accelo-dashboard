import React, { useState } from 'react';
import { Eye, EyeOff, Plus } from 'lucide-react';
import './NavBar.css';

const NavBar = ({ apiKey, onApiKeyChange, onAddItem }) => {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">Accelo Dashboard</h1>
        
        <div className="api-key-container">
          <input
            type={showApiKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="Enter Accelo API Key"
            className="api-key-input"
          />
          <button
            onClick={() => setShowApiKey(!showApiKey)}
            className="toggle-visibility-btn"
            aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
          >
            {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          onClick={onAddItem}
          className="add-item-btn"
          disabled={!apiKey}
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>
    </nav>
  );
};

export default NavBar;