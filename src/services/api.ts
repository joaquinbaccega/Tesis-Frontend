const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://localhost:44311/api/1.0";

export const fetchData = async (endpoint: string, options = {}) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, options);
    let data = null;

    try {
      data = await response.json();
    } catch (_) {
      // Ignore JSON parse errors for responses without body
    }

    if (!response.ok) {
      const message = data?.message || response.statusText || "Error en la API";
      throw new Error(message);
    }

    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};
