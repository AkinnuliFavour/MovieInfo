// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // adjust this to your API's URL
  withCredentials: true // This is the key setting
});

export default api;

// You can then define your API methods using this instance
export const getForums = () => api.get('/forums');
export const createForum = (forumData: {name: string, description: string}) => api.post('/forums', forumData);
export const getMessages = (forumId: string) => api.get(`/messages/${forumId}`);
export const createMessage = (messageData: {forumId: string, text: string}) => api.post('/messages', messageData);
export const deleteMessage = (messageId: string) => api.delete(`/messages/${messageId}`);
export const updateMessage = (messageId: string, messageData: {text: string}) => api.put(`/messages/${messageId}`, messageData);
export const fetchArticle = (url: string) => api.get('/articles', { params: { url } });
// ... other API methods