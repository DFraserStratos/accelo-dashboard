import React, { useState, useEffect } from 'react';
import { X, Search, Loader, Building2, Briefcase, FileText } from 'lucide-react';
import { searchCompanies, getCompanyProjects, getCompanyAgreements } from '../services/acceloApi';
import './AddItemModal.css';

const AddItemModal = ({ onClose, onAddItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const delayDebounceFn = setTimeout(() => {
        handleSearch();
      }, 300);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setCompanies([]);
    }
  }, [searchTerm]);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchCompanies(searchTerm);
      setCompanies(results);
    } catch (err) {
      setError('Failed to search companies');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCompany = async (company) => {
    setSelectedCompany(company);
    setLoading(true);
    setError(null);
    try {
      const [projects, agreements] = await Promise.all([
        getCompanyProjects(company.id),
        getCompanyAgreements(company.id)
      ]);
      
      const formattedItems = [
        ...projects.map(p => ({ ...p, type: 'project', companyId: company.id, companyName: company.name })),
        ...agreements.map(a => ({ ...a, type: 'agreement', companyId: company.id, companyName: company.name }))
      ];
      
      setItems(formattedItems);
    } catch (err) {
      setError('Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleItem = (item) => {
    setSelectedItems(prev => {
      const exists = prev.find(i => i.id === item.id && i.type === item.type);
      if (exists) {
        return prev.filter(i => !(i.id === item.id && i.type === item.type));
      }
      return [...prev, item];
    });
  };

  const handleAddItems = () => {
    onAddItems(selectedItems);
    onClose();
  };

  const isItemSelected = (item) => {
    return selectedItems.some(i => i.id === item.id && i.type === item.type);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Items to Dashboard</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {!selectedCompany ? (
            <>
              <div className="search-container">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  autoFocus
                />
              </div>

              {loading && (
                <div className="loading-state">
                  <Loader className="spinner" size={24} />
                  <p>Searching...</p>
                </div>
              )}

              {error && (
                <div className="error-state">
                  <p>{error}</p>
                </div>
              )}

              {!loading && companies.length > 0 && (
                <div className="company-list">
                  {companies.map(company => (
                    <div
                      key={company.id}
                      className="company-list-item"
                      onClick={() => handleSelectCompany(company)}
                    >
                      <Building2 size={20} />
                      <div className="company-info">
                        <span className="company-name">{company.name}</span>
                        {company.website && (
                          <span className="company-website">{company.website}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && searchTerm.length >= 2 && companies.length === 0 && (
                <div className="empty-results">
                  <p>No companies found</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="selected-company">
                <button
                  className="back-button"
                  onClick={() => {
                    setSelectedCompany(null);
                    setItems([]);
                    setSelectedItems([]);
                  }}
                >
                  ← Back to search
                </button>
                <h3>
                  <Building2 size={20} />
                  {selectedCompany.name}
                </h3>
              </div>

              {loading && (
                <div className="loading-state">
                  <Loader className="spinner" size={24} />
                  <p>Loading items...</p>
                </div>
              )}

              {!loading && items.length > 0 && (
                <div className="items-list">
                  {items.map(item => (
                    <label
                      key={`${item.type}-${item.id}`}
                      className={`item-checkbox ${isItemSelected(item) ? 'selected' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={isItemSelected(item)}
                        onChange={() => handleToggleItem(item)}
                      />
                      <div className="item-content">
                        {item.type === 'project' ? <Briefcase size={18} /> : <FileText size={18} />}
                        <span className="item-title">{item.title}</span>
                        <span className="item-type">{item.type}</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {!loading && items.length === 0 && (
                <div className="empty-results">
                  <p>No active projects or agreements found</p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-add"
            onClick={handleAddItems}
            disabled={selectedItems.length === 0}
          >
            Add {selectedItems.length} {selectedItems.length === 1 ? 'Item' : 'Items'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
