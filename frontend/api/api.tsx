import axios from "axios";

// Use empty string for Docker (Nginx will proxy /api/* to backend)
// Use localhost:3001 only for local development without Docker
const baseUrl =  "";

export const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const storage = localStorage.getItem("auth-storage");
  if (storage) {
    try {
      const parsedStorage = JSON.parse(storage);
      const token = parsedStorage.state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error parsing auth token:", error);
    }
  }
  return config;
});

// Auth
export const adminLoginApi = async (username: string, password: string) => {
  const res = await apiClient.post("/api/auth/login", { username, password });
  return res.data;
};

// Semesters - use RELATIVE paths only
export const getSemestersApi = async () => 
  (await apiClient.get("/api/semesters")).data.data;

export const getSemestersByIdApi = async (id: string) => 
  (await apiClient.get(`/api/semesters/${id}`)).data.data;

export const createSemesterApi = async ({ name, number }: { name: string; number: number }) => 
  (await apiClient.post("/api/semesters", { name, number })).data;

export const deleteSemesterApi = async (id: string) => 
  (await apiClient.delete(`/api/semesters/${id}`)).data;

// Subjects - use RELATIVE paths only
export const getAllSubjectsApi = async () => 
  (await apiClient.get("/api/subjects")).data.data;

export const getSubjectsByIdApi = async (id: string) => 
  (await apiClient.get(`/api/subjects/${id}`)).data.data;

export const createSubjectApi = async (name: string, semester_id: string) => 
  (await apiClient.post("/api/subjects", { name, semester_id })).data;

export const getSubjectsBySemesterApi = async (semesterId: string) => 
  (await apiClient.get(`/api/subjects/by-semester/${semesterId}`)).data;

// Chapters - use RELATIVE paths only
export const getChaptersApi = async (subjectId: string) => 
  (await apiClient.get(`/api/chapters/by-sub/${subjectId}`)).data.data;

export const getChaptersByIdApi = async (chapterId: string) => 
  (await apiClient.get(`/api/chapters/by-id/${chapterId}`)).data.data;

export const getChaptersBySubjectApi = async (subjectId: string) => 
  (await apiClient.get(`/api/chapters/by-sub/${subjectId}`)).data.data;

export const createChapterApi = async (name: string, number: number, subject_id: string) => 
  (await apiClient.post("/api/chapters", { name, number, subject_id })).data;

export const deleteChapterApi = async (id: string) => 
  (await apiClient.delete(`/api/chapters/${id}`)).data;

// Notes - use RELATIVE paths only
export const getNotesApi = async (chapterId: string) => 
  (await apiClient.get(`/api/notes/by-chap/${chapterId}`)).data.data;

export const createNoteApi = async (data: any) => 
  (await apiClient.post("/api/notes", data)).data;

export const deleteNoteApi = async (id: string) => 
  (await apiClient.delete(`/api/notes/${id}`)).data;