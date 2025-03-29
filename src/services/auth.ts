import { fetchData } from "./api";

export const login = async (email: string, password: string) => {
    console.log("email", email);
    console.log("password", password);
    return fetchData("Login/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password: password }), // Asegurar que el backend lo espera así
    });
};

