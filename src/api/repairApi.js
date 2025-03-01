// // src/api/repairApi.js
// import axios from 'axios';

// // Define your backend API URL
// const API_URL = 'http://your-backend-url.com/api';

// // Function to get repair guides based on search query
// export const searchRepairGuides = async (query) => {
//   try {
//     const response = await axios.post(`${API_URL}/search`, { query });
//     return response.data;
//   } catch (error) {
//     console.error('Error searching repair guides:', error);
//     throw error;
//   }
// };

// // Function to get a specific repair guide by ID
// export const getRepairGuide = async (guideId) => {
//   try {
//     const response = await axios.get(`${API_URL}/guides/${guideId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching repair guide:', error);
//     throw error;
//   }
// };

// // Function to send a message to the AI assistant
// export const sendMessageToAI = async (message, conversationHistory = []) => {
//   try {
//     const response = await axios.post(`${API_URL}/assistant`, {
//       message,
//       history: conversationHistory
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error communicating with AI assistant:', error);
//     throw error;
//   }
// };


// src/api/repairApi.js (mock version)
import { mockRepairGuides, mockAIResponses } from './mockData';

// Function to get repair guides based on search query
export const searchRepairGuides = async (query) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return filtered guides based on query
  return mockRepairGuides.filter(guide => 
    guide.title.toLowerCase().includes(query.toLowerCase()) ||
    guide.description.toLowerCase().includes(query.toLowerCase())
  );
};

// Function to get a specific repair guide by ID
export const getRepairGuide = async (guideId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const guide = mockRepairGuides.find(g => g.id === guideId);
  if (!guide) {
    throw new Error('Guide not found');
  }
  return guide;
};

// Function to send a message to the AI assistant
export const sendMessageToAI = async (message, conversationHistory = []) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Look for exact match in mock responses
  const exactMatch = mockAIResponses[message.toLowerCase()];
  if (exactMatch) {
    return exactMatch;
  }
  
  // Default response if no match found
  return {
    message: `I understand you're asking about "${message}". I can help with various repair tasks. Could you provide more details about what you're trying to fix?`,
    repairGuides: [],
    tools: [],
    difficulty: null
  };
};
