const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

let messages = []; // Temporary storage for messages (they are lost when the server restarts)

// API to send a message (POST /send)
app.post("/send", (req, res) => {
    const { name, text } = req.body;

    if (!name || !text) {
        return res.status(400).json({ error: "Both name and text are required" });
    }

    // Store the message
    messages.push({ name, text });

    return res.json({ success: true, message: "Message received" });
});

// API to get messages (GET /messages)
app.get("/messages", (req, res) => {
    res.json({ messages: messages });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
