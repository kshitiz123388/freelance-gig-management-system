import { api } from "./api.js";
import { auth } from "./auth.js";

// Escape user-supplied text before it goes into innerHTML, to prevent XSS
function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
}

const gigManager = {

    // Get all gigs
    async getAllGigs() {
        return await api.get("/gigs");
    },

    // Get one gig
    async getGig(id) {
        return await api.get(`/gigs/${id}`);
    },

    // Save Gig (Create or Update)
    async saveGig(gig) {

        const data = {
            title: gig.title,
            clientName: gig.clientName,
            budget: gig.budget,
            status: gig.status
        };

        if (gig.id) {
            return await api.put(`/gigs/${gig.id}`, data);
        } else {
            return await api.post("/gigs", data);
        }
    },

    // Delete Gig
    async deleteGig(id) {
        return await api.delete(`/gigs/${id}`);
    },

    // Create Gig Card
    createCard(gig, editFunction, deleteFunction) {

        const card = document.createElement("div");
        card.className = "gig-card";

        let badgeClass = "badge-available";

        if (gig.status === "In Progress") {
            badgeClass = "badge-progress";
        }

        if (gig.status === "Completed") {
            badgeClass = "badge-completed";
        }

        const user = auth.getUser();

        let buttons = "";

        if (user && user.id === gig.userId) {

            buttons = `
                <div class="gig-card-actions">

                    <button class="btn btn-secondary btn-sm edit-btn">
                        Edit
                    </button>

                    <button class="btn btn-danger btn-sm delete-btn">
                        Delete
                    </button>

                </div>
            `;

        }

        card.innerHTML = `

            <div>

                <div class="gig-card-header">

                    <h3>${escapeHtml(gig.title)}</h3>

                    <span class="badge ${badgeClass}">
                        ${escapeHtml(gig.status)}
                    </span>

                </div>

                <p>
                    <strong>Client :</strong> ${escapeHtml(gig.clientName)}
                </p>

                <p>
                    <strong>Budget :</strong> $${escapeHtml(gig.budget)}
                </p>

            </div>

            ${buttons}

        `;

        if (user && user.id === gig.userId) {

            card.querySelector(".edit-btn")
                .addEventListener("click", () => {
                    editFunction(gig.id);
                });

            card.querySelector(".delete-btn")
                .addEventListener("click", () => {
                    deleteFunction(gig.id);
                });

        }

        return card;
    }

};

export { gigManager };
