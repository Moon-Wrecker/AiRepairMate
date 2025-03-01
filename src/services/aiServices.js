// src/services/aiService.js
import { sendMessageToAI } from '../api/repairApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Key for storing conversation history
const CONVERSATION_HISTORY_KEY = 'repair_assistant_conversation';

// Load conversation history from storage
export const loadConversationHistory = async () => {
  try {
    const historyString = await AsyncStorage.getItem(CONVERSATION_HISTORY_KEY);
    return historyString ? JSON.parse(historyString) : [];
  } catch (error) {
    console.error('Error loading conversation history:', error);
    return [];
  }
};

// Save conversation history to storage
export const saveConversationHistory = async (history) => {
  try {
    await AsyncStorage.setItem(CONVERSATION_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving conversation history:', error);
  }
};

// Send a message to the AI and update conversation history
export const sendMessage = async (message, history = []) => {
  try {
    // Add user message to history
    const updatedHistory = [...history, { role: 'user', content: message }];
    
    // Send to backend AI service
    const response = await sendMessageToAI(message, updatedHistory);
    
    // Add AI response to history
    const finalHistory = [...updatedHistory, { role: 'assistant', content: response.message }];
    
    // Save updated history
    await saveConversationHistory(finalHistory);
    
    return {
      response: response.message,
      history: finalHistory,
      repairGuides: response.repairGuides || [],
      tools: response.tools || [],
      difficulty: response.difficulty
    };
  } catch (error) {
    console.error('Error in AI service:', error);
    throw error;
  }
};

// Clear conversation history
export const clearConversation = async () => {
  try {
    await AsyncStorage.removeItem(CONVERSATION_HISTORY_KEY);
    return [];
  } catch (error) {
    console.error('Error clearing conversation history:', error);
    throw error;
  }
};
