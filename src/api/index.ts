// lib/axios.ts
import axios from 'axios'
import { API_URL } from 'config/constants/api'

const axiosInstance = axios.create({
  baseURL: API_URL,
})

export default axiosInstance
