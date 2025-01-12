import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Flask backend URL

export const loginUser = async (username, password) => {
  return await axios.post(`${API_URL}/login`, { username, password });
};