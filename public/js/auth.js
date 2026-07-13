import { api } from './api.js';

export const auth = {

    // Check if user is logged in
    isAuthenticated() {
        return localStorage.getItem("gig_auth_token") !== null;
    },

    // Get logged in user
    getUser() {
        const user = localStorage.getItem("gig_user_profile");
        return user ? JSON.parse(user) : null;
    },

    // Login
    async login(email, password) {

        const response = await api.post("/auth/login", {
            email,
            password
        });

        if (response.success) {
            localStorage.setItem("gig_auth_token", response.token);
            localStorage.setItem(
                "gig_user_profile",
                JSON.stringify(response.user)
            );
        }

        return response;
    },

    // Register
    async register(name, email, password) {

        return await api.post("/auth/register", {
            name,
            email,
            password
        });

    },

    // Logout
    logout() {
        localStorage.removeItem("gig_auth_token");
        localStorage.removeItem("gig_user_profile");
    }

};