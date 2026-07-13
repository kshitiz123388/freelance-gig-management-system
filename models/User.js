const bcrypt = require("bcrypt");

// Temporary database
const users = [];

class User {

    // Find user by email
    static async findByEmail(email) {

        return users.find(user => user.email === email);

    }

    // Create new user
    static async create(userData) {

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = {

            id: Date.now().toString(),

            name: userData.name,

            email: userData.email,

            password: hashedPassword

        };

        users.push(newUser);

        return newUser;

    }

    // Compare password
    static async comparePassword(password, hash) {

        return await bcrypt.compare(password, hash);

    }

}

module.exports = User;