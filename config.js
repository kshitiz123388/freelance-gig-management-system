// Centralized config so secrets aren't duplicated/hardcoded across files.
// In production, set JWT_SECRET as a real environment variable.
module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || "dev_secret_change_me_in_env"
};
