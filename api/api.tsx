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
export const createSemesterApi = async ({name:string, number:number}) => (await apiClient.post('/api/semesters', { name, number })).data;
export const deleteSemesterApi = async (id: string) => (await apiClient.delete(`/api/semesters/${id}`)).data;


//subjects
 
export const getAllSubjectsApi = async () => (await apiClient.get(`${baseUrl}/api/auth/subjects`)).data.data;
export const createSubjectApi = async (name:string, semester_id:string)  => {
    const res = await apiClient.post(`${baseUrl}/api/auth/subjects`, { name, semester_id });
    return res.data;
};

//chapters 
export const getChaptersApi = async (subjectId: string) => {
  const res = await apiClient.get(`/api/auth/chapters?subjectId=${subjectId}`);
  return res.data.data;
};

export const createChapterApi = async (name: string, number: number, subject_id: string) => {
  const res = await apiClient.post('/api/auth/chapters', { name, number, subject_id });
  return res.data;
};

export const deleteChapterApi = async (id: string) => {
  const res = await apiClient.delete(`/api/auth/chapters/${id}`);
  return res.data;
};


//notes// ...existing code...
export const getNotesApi = async (chapterId: string) => {
    const res = await apiClient.get(`/api/auth/notes?chapterId=${chapterId}`);
    return res.data.data;
};

export const createNoteApi = async (data: any) => {
    const res = await apiClient.post('/api/auth/notes', data);
    return res.data;
};

export const deleteNoteApi = async (id: string) => {
    const res = await apiClient.delete(`/api/auth/notes/${id}`);
    return res.data;
};