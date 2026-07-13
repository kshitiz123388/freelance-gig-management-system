import { auth } from "./auth.js";
import { gigManager } from "./gig.js";

// ---- Element references ----
const views = {
    dashboard: document.getElementById("view-dashboard"),
    login: document.getElementById("view-login"),
    register: document.getElementById("view-register"),
    gigForm: document.getElementById("view-gig-form")
};

const navAuthLinks = document.getElementById("nav-auth-links");
const navBrandLink = document.getElementById("nav-brand-link");
const notificationBanner = document.getElementById("notification-banner");

const btnGoAddGig = document.getElementById("btn-go-add-gig");
const gigsLoading = document.getElementById("gigs-loading");
const gigsGridContainer = document.getElementById("gigs-grid-container");
const gigsEmptyState = document.getElementById("gigs-empty-state");

const formUserLogin = document.getElementById("form-user-login");
const formUserRegister = document.getElementById("form-user-register");
const linkGoRegister = document.getElementById("link-go-register");
const linkGoLogin = document.getElementById("link-go-login");

const gigFormViewTitle = document.getElementById("gig-form-view-title");
const formGigTransaction = document.getElementById("form-gig-transaction");
const gigFormFieldId = document.getElementById("gig-form-field-id");
const gigFieldTitle = document.getElementById("gig-field-title");
const gigFieldClient = document.getElementById("gig-field-client");
const gigFieldBudget = document.getElementById("gig-field-budget");
const gigFieldStatus = document.getElementById("gig-field-status");
const btnGigFormCancel = document.getElementById("btn-gig-form-cancel");

// ---- Helpers ----

function showView(name) {
    Object.values(views).forEach(view => view.classList.add("hidden"));
    views[name].classList.remove("hidden");
}

function showNotification(message, type = "success") {
    notificationBanner.textContent = message;
    notificationBanner.className = `notification ${type}`;
    notificationBanner.classList.remove("hidden");

    setTimeout(() => {
        notificationBanner.classList.add("hidden");
    }, 3000);
}

function renderNav() {
    navAuthLinks.innerHTML = "";

    if (auth.isAuthenticated()) {
        const user = auth.getUser();

        const welcome = document.createElement("span");
        welcome.className = "nav-welcome";
        welcome.textContent = `Hi, ${user?.name ?? "there"}`;

        const logoutBtn = document.createElement("button");
        logoutBtn.className = "btn btn-secondary btn-sm";
        logoutBtn.textContent = "Logout";
        logoutBtn.addEventListener("click", () => {
            auth.logout();
            renderNav();
            loadDashboard();
            showView("dashboard");
        });

        navAuthLinks.append(welcome, logoutBtn);
        btnGoAddGig.classList.remove("hidden");
    } else {
        const loginLink = document.createElement("a");
        loginLink.href = "#";
        loginLink.textContent = "Login";
        loginLink.addEventListener("click", (e) => {
            e.preventDefault();
            showView("login");
        });

        const registerLink = document.createElement("a");
        registerLink.href = "#";
        registerLink.textContent = "Register";
        registerLink.addEventListener("click", (e) => {
            e.preventDefault();
            showView("register");
        });

        navAuthLinks.append(loginLink, registerLink);
        btnGoAddGig.classList.add("hidden");
    }
}

async function loadDashboard() {
    gigsLoading.classList.remove("hidden");
    gigsGridContainer.classList.add("hidden");
    gigsEmptyState.classList.add("hidden");
    gigsGridContainer.innerHTML = "";

    try {
        const response = await gigManager.getAllGigs();
        const gigs = response.data || [];

        if (gigs.length === 0) {
            gigsEmptyState.classList.remove("hidden");
        } else {
            gigs.forEach(gig => {
                const card = gigManager.createCard(gig, openEditGigForm, handleDeleteGig);
                gigsGridContainer.appendChild(card);
            });
            gigsGridContainer.classList.remove("hidden");
        }
    } catch (error) {
        showNotification(error.message, "error");
    } finally {
        gigsLoading.classList.add("hidden");
    }
}

function resetGigForm() {
    formGigTransaction.reset();
    gigFormFieldId.value = "";
    gigFormViewTitle.textContent = "Add Gig";
}

async function openEditGigForm(id) {
    try {
        const response = await gigManager.getGig(id);
        const gig = response.data;

        gigFormFieldId.value = gig.id;
        gigFieldTitle.value = gig.title;
        gigFieldClient.value = gig.clientName;
        gigFieldBudget.value = gig.budget;
        gigFieldStatus.value = gig.status;
        gigFormViewTitle.textContent = "Edit Gig";

        showView("gigForm");
    } catch (error) {
        showNotification(error.message, "error");
    }
}

async function handleDeleteGig(id) {
    if (!confirm("Delete this gig? This cannot be undone.")) {
        return;
    }

    try {
        await gigManager.deleteGig(id);
        showNotification("Gig deleted successfully");
        loadDashboard();
    } catch (error) {
        showNotification(error.message, "error");
    }
}

// ---- Event listeners ----

navBrandLink.addEventListener("click", (e) => {
    e.preventDefault();
    showView("dashboard");
    loadDashboard();
});

linkGoRegister.addEventListener("click", (e) => {
    e.preventDefault();
    showView("register");
});

linkGoLogin.addEventListener("click", (e) => {
    e.preventDefault();
    showView("login");
});

btnGoAddGig.addEventListener("click", () => {
    resetGigForm();
    showView("gigForm");
});

btnGigFormCancel.addEventListener("click", () => {
    showView("dashboard");
});

formUserLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await auth.login(email, password);
        showNotification(response.message || "Login successful");
        formUserLogin.reset();
        renderNav();
        showView("dashboard");
        loadDashboard();
    } catch (error) {
        showNotification(error.message, "error");
    }
});

formUserRegister.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
        const response = await auth.register(name, email, password);
        showNotification(response.message || "Registration successful");
        formUserRegister.reset();
        showView("login");
    } catch (error) {
        showNotification(error.message, "error");
    }
});

formGigTransaction.addEventListener("submit", async (e) => {
    e.preventDefault();

    const gig = {
        id: gigFormFieldId.value || null,
        title: gigFieldTitle.value,
        clientName: gigFieldClient.value,
        budget: gigFieldBudget.value,
        status: gigFieldStatus.value
    };

    try {
        await gigManager.saveGig(gig);
        showNotification(gig.id ? "Gig updated successfully" : "Gig created successfully");
        resetGigForm();
        showView("dashboard");
        loadDashboard();
    } catch (error) {
        showNotification(error.message, "error");
    }
});

// ---- Init ----

renderNav();
loadDashboard();
showView("dashboard");
