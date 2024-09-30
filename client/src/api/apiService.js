import axios from "axios";

// 기본 axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: "http://localhost:5000",
});

// GET.
export const fetchData = async () => {
    try {
        const response = await apiClient.get('/');
        return response.data;
    } catch (error) {
        console.error("Error fetching data from server:", error);
        throw error;
    }
}