// api/user.js
const express = require("express");

const app = express();

app.use((req, res) => {
    res.status(200);
    res.json({ message: "Ndeewo site Igbo API!" });
});

// GET /users
app.get('/users', (req, res) => {
    const users = [
        { id: 1, name: "Chioma Okeke", city: "Enugu" },
        { id: 2, name: "Chukwuemeka Nwosu", city: "Onitsha" },    
        { id: 3, name: "Adaora Eze", city: "Awka" }
    ];
    res.json({
        success: "Ezinaụlọ",
        users: users
    });
});

// POST /users
app.post('/users', (req, res) => {
    const newUser = req.body;
    console.log("Onye ọhụrụ: ", newUser);

    const users = [
        { id: 1, name: "Chioma Okeke" },
        { id: 2, name: "Chukwuemeka Nwosu" }
    ];

    users.push({
        id: users.length + 1,
        ...newUser
    });

    res.status(201).json({
        success: "Onye ọhụrụ ekelelịrị",
        user: newUser
    });
});

// Export the app
module.exports = app;