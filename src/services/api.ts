const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://localhost:44311/api/1.0";

export const fetchData = async (endpoint: string, options = {}) => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }
};
