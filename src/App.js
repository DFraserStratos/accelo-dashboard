import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import AddItemModal from './components/AddItemModal';
import { AcceloProvider } from './context/AcceloContext';
import useAcceloData from './hooks/useAcceloData';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const { companies, loading, error, refetch } = useAcceloData(apiKey);

  const handleAddItem = (newItems) => {
    setSelectedItems([...selectedItems, ...newItems]);
  };

  const groupedItems = selectedItems.reduce((acc, item) => {
    if (!acc[item.companyId]) {
      acc[item.companyId] = {
        company: companies.find(c => c.id === item.companyId),
        items: []
      };
    }
    acc[item.companyId].items.push(item);
    return acc;
  }, {});

  return (
    <AcceloProvider value={{ apiKey }}>
      <div className="app">
        <NavBar 
          apiKey={apiKey}
          onApiKeyChange={setApiKey}
          onAddItem={() => setIsModalOpen(true)}
        />
        <div className="app-content">
          <Sidebar 
            companies={Object.values(groupedItems).map(g => g.company).filter(Boolean)}
            selectedCompanyId={null}
            onSelectCompany={() => {}}
          />
          <MainContent 
            groupedItems={groupedItems}
          />
        </div>
        {isModalOpen && (
          <AddItemModal
            companies={companies}
            onClose={() => setIsModalOpen(false)}
            onAddItems={handleAddItem}
          />
        )}
      </div>
    </AcceloProvider>
  );
}

export default App;