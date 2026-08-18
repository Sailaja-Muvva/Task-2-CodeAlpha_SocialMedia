const express = require("express");
const router = express.Router();

const Post = require("../models/postModel");
const User = require("../models/userModel");


// =====================================================
// CREATE POST
// POST /api/posts
// =====================================================

router.post("/", async (req, res) => {
    try {
        const {
            user,
            content,
            image
        } = req.body;

        if (!user || !content) {
            return res.status(400).json({
                message: "User ID and content are required"
            });
        }

        const existingUser =
            await User.findById(user);

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const post = new Post({
            user,
            content,
            image
        });

        const savedPost =
            await post.save();

        const populatedPost =
            await Post.findById(savedPost._id)
                .populate(
                    "user",
                    "name username profileImage"
                );

        res.status(201).json(
            populatedPost
        );

    } catch (error) {
        console.error(
            "Create Post Error:",
            error
        );

        res.status(500).json({
            message: "Failed to create post",
            error: error.message
        });
    }
});


// =====================================================
// GET ALL POSTS
// GET /api/posts
// =====================================================

router.get("/", async (req, res) => {
    try {

        const posts =
            await Post.find()
                .populate(
                    "user",
                    "name username profileImage"
                )
                .sort({
                    createdAt: -1
                });

        res.json(posts);

    } catch (error) {

        console.error(
            "Get Posts Error:",
            error
        );

        res.status(500).json({
            message: "Failed to get posts",
            error: error.message
        });
    }
});


// =====================================================
// GET SINGLE POST
// GET /api/posts/:id
// =====================================================

router.get("/:id", async (req, res) => {
    try {

        const post =
            await Post.findById(
                req.params.id
            )
            .populate(
                "user",
                "name username profileImage"
            );

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.json(post);

    } catch (error) {

        console.error(
            "Get Post Error:",
            error
        );

        res.status(500).json({
            message: "Failed to get post",
            error: error.message
        });
    }
});


// =====================================================
// LIKE / UNLIKE POST
// PUT /api/posts/:id/like
// =====================================================

router.put("/:id/like", async (req, res) => {
    try {

        const {
            userId
        } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const post =
            await Post.findById(
                req.params.id
            );

        const user =
            await User.findById(userId);

        if (!post || !user) {
            return res.status(404).json({
                message: "Post or user not found"
            });
        }

        const alreadyLiked =
            post.likes.some(
                id =>
                    id.toString() ===
                    userId.toString()
            );

        if (alreadyLiked) {

            post.likes =
                post.likes.filter(
                    id =>
                        id.toString() !==
                        userId.toString()
                );

            await post.save();

            return res.json({
                message: "Post unliked",
                liked: false,
                likes: post.likes.length
            });
        }

        post.likes.push(userId);

        await post.save();

        res.json({
            message: "Post liked",
            liked: true,
            likes: post.likes.length
        });

    } catch (error) {

        console.error(
            "Like Post Error:",
            error
        );

        res.status(500).json({
            message: "Failed to like post",
            error: error.message
        });
    }
});


// =====================================================
// DELETE POST
// DELETE /api/posts/:id
// =====================================================

router.delete("/:id", async (req, res) => {
    try {

        const deletedPost =
            await Post.findByIdAndDelete(
                req.params.id
            );

        if (!deletedPost) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.json({
            message: "Post deleted successfully",
            post: deletedPost
        });

    } catch (error) {

        console.error(
            "Delete Post Error:",
            error
        );

        res.status(500).json({
            message: "Failed to delete post",
            error: error.message
        });
    }
});


module.exports = router;