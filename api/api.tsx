import axios from "axios";

const baseUrl =
  (import.meta as any).env.VITE_API_URL || "http://localhost:3001";

export const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth-storage")
    ? JSON.parse(localStorage.getItem("auth-storage") as string).token
    : null;

  if (token) {
    try {
      const { state } = JSON.parse(token);
      if (state?.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }
    } catch (error: any) {
      throw error;
    }
  }
  return config;
});

export const adminLoginApi = async (username: string, password: string) => {
  try {
    const res = await apiClient.post(
      `${baseUrl}/api/auth/login`,
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};


// Semesters
export const getSemestersApi = async () => (await apiClient.get(`${baseUrl}/api/auth/semesters`)).data.data;
export const createSemesterApi = async (data: any) => (await apiClient.post('/api/semesters', data)).data;
export const deleteSemesterApi = async (id: string) => (await apiClient.delete(`/api/semesters/${id}`)).data;


//subjects
 
export const getAllSubjectsApi = async () => (await apiClient.get(`${baseUrl}/api/auth/subjects`)).data.data;
export const createSubjectApi = async (data: { name: string;  semester_id: string }) => {
    const res = await apiClient.post(`${baseUrl}/api/auth/subjects`, data);
    return res.data;
};