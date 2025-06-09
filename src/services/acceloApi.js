import axios from 'axios';

const API_BASE_URL = 'https://api.accelo.com/api/v0';

let apiClient = null;

const initializeApiClient = (apiKey) => {
  apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });
};

// Company endpoints
export const getCompanies = async (apiKey, filters = {}) => {
  if (!apiClient || apiClient.defaults.headers['Authorization'] !== `Bearer ${apiKey}`) {
    initializeApiClient(apiKey);
  }
  
  const params = new URLSearchParams();
  if (filters.standing) {
    params.append('_filters', `standing(${filters.standing})`);
  }
  
  const response = await apiClient.get('/companies', { params });
  return response.data.response || [];
};

export const searchCompanies = async (searchTerm) => {
  if (!apiClient) return [];
  
  const params = new URLSearchParams({
    '_search': searchTerm,
    '_limit': 20
  });
  
  const response = await apiClient.get('/companies', { params });
  return response.data.response || [];
};

export const getCompanyDetails = async (companyId) => {
  if (!apiClient) return null;
  
  const response = await apiClient.get(`/companies/${companyId}`);
  return response.data.response;
};

// Project (Job) endpoints
export const getProjects = async (filters = {}) => {
  if (!apiClient) return [];
  
  const params = new URLSearchParams();
  const filterArray = [];
  
  if (filters.companyId) {
    filterArray.push('against_type(company)');
    filterArray.push(`against_id(${filters.companyId})`);
  }
  
  if (filters.standing) {
    filterArray.push(`standing(${filters.standing})`);
  }
  
  if (filterArray.length > 0) {
    params.append('_filters', filterArray.join(','));
  }
  
  const response = await apiClient.get('/jobs', { params });
  return response.data.response || [];
};

export const getCompanyProjects = async (companyId) => {
  return getProjects({ companyId, standing: 'active' });
};

export const getProjectHours = async (projectId) => {
  if (!apiClient) return null;
  
  const params = new URLSearchParams();
  params.append('_filters', `against_type(job),against_id(${projectId})`);
  
  const response = await apiClient.get('/activities/allocations', { params });
  return response.data.response;
};

// Agreement (Contract) endpoints
export const getAgreements = async (filters = {}) => {
  if (!apiClient) return [];
  
  const params = new URLSearchParams();
  const filterArray = [];
  
  if (filters.companyId) {
    filterArray.push('against_type(company)');
    filterArray.push(`against_id(${filters.companyId})`);
  }
  
  if (filters.standing) {
    filterArray.push(`standing(${filters.standing})`);
  }
  
  if (filterArray.length > 0) {
    params.append('_filters', filterArray.join(','));
  }
  
  const response = await apiClient.get('/contracts', { params });
  return response.data.response || [];
};

export const getCompanyAgreements = async (companyId) => {
  return getAgreements({ companyId, standing: 'active' });
};

export const getAgreementPeriods = async (agreementId) => {
  if (!apiClient) return [];
  
  const params = new URLSearchParams({
    '_fields': 'contract_budget(time)'
  });
  
  const response = await apiClient.get(`/contracts/${agreementId}/periods`, { params });
  return response.data.response || [];
};

// Batch fetch functions for dashboard
export const fetchProjectsWithHours = async (companyId) => {
  const projects = await getCompanyProjects(companyId);
  
  const projectsWithHours = await Promise.all(
    projects.map(async (project) => {
      const hours = await getProjectHours(project.id);
      return {
        id: project.id,
        title: project.title,
        type: 'project',
        status: project.standing,
        billable: hours?.billable || 0,
        nonBillable: hours?.nonbillable || 0,
        charged: hours?.charged || 0
      };
    })
  );
  
  return projectsWithHours;
};

export const fetchAgreementsWithUsage = async (companyId) => {
  const agreements = await getCompanyAgreements(companyId);
  
  const agreementsWithUsage = await Promise.all(
    agreements.map(async (agreement) => {
      const periods = await getAgreementPeriods(agreement.id);
      const currentPeriod = periods.find(p => p.standing === 'opened') || periods[0];
      
      return {
        id: agreement.id,
        title: agreement.title,
        type: 'agreement',
        status: agreement.standing,
        used: currentPeriod?.contract_budget?.time || 0,
        allowance: currentPeriod?.contract_budget?.time || 0,
        periodEnd: currentPeriod?.date_expires || null
      };
    })
  );
  
  return agreementsWithUsage;
};

// Error handling wrapper
export const apiRequest = async (requestFn) => {
  try {
    return await requestFn();
  } catch (error) {
    if (error.response) {
      // API returned an error response
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.message || 'API request failed');
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.request);
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      console.error('Error:', error.message);
      throw error;
    }
  }
};