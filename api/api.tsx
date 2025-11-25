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
  const storage = localStorage.getItem("auth-storage");

  if (storage) {
    try {
      const parsedStorage = JSON.parse(storage);
      // Access token from the state object (Zustand persist pattern)
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
export const getSemestersApi = async () => (await apiClient.get(`${baseUrl}/api/semesters`)).data.data;
export const getSemestersByIdApi = async (id:string) => (await apiClient.get(`${baseUrl}/api/semesters/${id}`)).data.data;
export const createSemesterApi = async ({name , number}: {name: string, number: number}) => (await apiClient.post('/api/semesters', { name, number })).data;
export const deleteSemesterApi = async (id: string) => (await apiClient.delete(`/api/semesters/${id}`)).data;

//subjects
 
export const getAllSubjectsApi = async () => (await apiClient.get(`${baseUrl}/api/subjects`)).data.data;
export const getSubjectsByIdApi = async (id:string) => (await apiClient.get(`${baseUrl}/api/subjects/${id}`)).data.data;
export const createSubjectApi = async (name:string, semester_id:string)  => {
    const res = await apiClient.post(`${baseUrl}/api/subjects`, { name, semester_id });
    return res.data;
};
export const getSubjectsBySemesterApi = async (semesterId:string) => {
    const res = await apiClient.get(`${baseUrl}/api/subjects/by-semester/${semesterId}`);
    return res.data;
};

//chapters 
export const getChaptersApi = async (subjectId: string) => {
  const res = await apiClient.get(`/api/chapters/by-sub/${subjectId}`);
  return res.data.data;
};

export const getChaptersByIdApi = async (chapterId: string) => {
  const res = await apiClient.get(`/api/chapters/by-id/${chapterId}`);
  return res.data.data;
};

export const getChaptersBySubjectApi = async (subjectId: string) => {
  const res = await apiClient.get(`/api/chapters/by-sub/${subjectId}`);
  return res.data.data;
};

export const createChapterApi = async (name: string, number: number, subject_id: string) => {
  const res = await apiClient.post('/api/chapters', { name, number, subject_id });
  return res.data;
};

export const deleteChapterApi = async (id: string) => {
  const res = await apiClient.delete(`/api/chapters/${id}`);
  return res.data;
};

//notes apis
export const getNotesApi = async (chapterId: string) => {
    const res = await apiClient.get(`/api/notes/by-chap/${chapterId}`);
    return res.data.data;
};

export const createNoteApi = async (data: any) => {
    const res = await apiClient.post('/api/notes', data);
    return res.data;
};

export const deleteNoteApi = async (id: string) => {
    const res = await apiClient.delete(`/api/notes/${id}`);
    return res.data;
};