const express = require("express");
const router = express.Router();

const Comment = require("../models/commentModel");

// CREATE COMMENT
// POST /api/comments
router.post("/", async (req, res) => {
    try {
        const { post, user, content } = req.body;

        if (!post || !user || !content) {
            return res.status(400).json({
                message: "Post, user and content are required"
            });
        }

        const comment = new Comment({
            post,
            user,
            content
        });

        const savedComment = await comment.save();

        const populatedComment = await Comment.findById(
            savedComment._id
        )
            .populate("user", "name username profileImage")
            .populate("post", "content");

        res.status(201).json(populatedComment);

    } catch (error) {
        console.error("Create Comment Error:", error);

        res.status(500).json({
            message: "Failed to create comment",
            error: error.message
        });
    }
});


// GET COMMENTS FOR A POST
// GET /api/comments/post/:postId
router.get("/post/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({
            post: req.params.postId
        })
            .populate("user", "name username profileImage")
            .sort({ createdAt: -1 });

        res.json(comments);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get comments",
            error: error.message
        });
    }
});


// DELETE COMMENT
// DELETE /api/comments/:id
router.delete("/:id", async (req, res) => {
    try {
        const deletedComment =
            await Comment.findByIdAndDelete(req.params.id);

        if (!deletedComment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        res.json({
            message: "Comment deleted successfully",
            comment: deletedComment
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete comment",
            error: error.message
        });
    }
});


module.exports = router;