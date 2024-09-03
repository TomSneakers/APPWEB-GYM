// src/services/authService.js

const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
    signIn: async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to sign in");
            }

            const data = await response.json();

            // Vérification du rôle de l'utilisateur
            if (data.role !== "coach") {
                throw new Error("You are not authorized to access this platform.");
            }

            // Stockage des informations d'authentification
            localStorage.setItem("accessToken", data.token);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userRole", data.role);

            return data;
        } catch (error) {
            throw new Error(error.message || "An unknown error occurred");
        }
    },

    signUp: async (userDetails) => {
        try {
            const response = await fetch(`${API_URL}/api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to sign up");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error.message || "An unknown error occurred");
        }
    },
    // to git here
    getUserDetails: async () => {
        try {
            const userId = localStorage.getItem("userId");
            const response = await fetch(`${API_URL}/api/users/${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch user details");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error.message || "An unknown error occurred");
        }
    },

    logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
    },
};
