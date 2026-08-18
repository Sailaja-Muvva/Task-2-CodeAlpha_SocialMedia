console.log("SERVER FILE STARTED");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "CodeAlpha Social Media API is running successfully"
    });
});


const PORT = 5000;

async function startServer() {

    try {

        if (!process.env.MONGO_URI) {
            console.error("❌ MONGO_URI is missing in .env");
            return;
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected");

        app.listen(PORT, "127.0.0.1", () => {
            console.log(
                `🚀 Server running on http://127.0.0.1:${PORT}`
            );
        });

    } catch (error) {

        console.error(
            "❌ MongoDB Connection Error:",
            error.message
        );

    }
}

startServer();