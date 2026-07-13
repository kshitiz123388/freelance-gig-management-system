const BASE_URL = "/api";

// Headers
function getHeaders() {
    const token = localStorage.getItem("gig_auth_token");

    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
}

// Handle Response
async function handleResponse(response) {

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}

export const api = {

    // GET Request
    async get(endpoint) {

        const response = await fetch(BASE_URL + endpoint, {
            method: "GET",
            headers: getHeaders()
        });

        return handleResponse(response);
    },

    // POST Request
    async post(endpoint, body) {

        const response = await fetch(BASE_URL + endpoint, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(body)
        });

        return handleResponse(response);
    },

    // PUT Request
    async put(endpoint, body) {

        const response = await fetch(BASE_URL + endpoint, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(body)
        });

        return handleResponse(response);
    },

    // DELETE Request
    async delete(endpoint) {

        const response = await fetch(BASE_URL + endpoint, {
            method: "DELETE",
            headers: getHeaders()
        });

        return handleResponse(response);
    }

};