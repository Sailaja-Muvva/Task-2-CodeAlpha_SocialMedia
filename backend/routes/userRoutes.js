const express = require("express");
const router = express.Router();

const User = require("../models/userModel");


// =====================================================
// CREATE USER
// POST /api/users
// =====================================================

router.post("/", async (req, res) => {
    try {
        const {
            name,
            username,
            email,
            bio,
            profileImage
        } = req.body;

        if (!name || !username || !email) {
            return res.status(400).json({
                message: "Name, username and email are required"
            });
        }

        const existingUser = await User.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Username or email already exists"
            });
        }

        const user = new User({
            name,
            username,
            email,
            bio,
            profileImage
        });

        const savedUser = await user.save();

        res.status(201).json(savedUser);

    } catch (error) {
        console.error("Create User Error:", error);

        res.status(500).json({
            message: "Failed to create user",
            error: error.message
        });
    }
});


// =====================================================
// GET ALL USERS
// GET /api/users
// =====================================================

router.get("/", async (req, res) => {
    try {
        const users = await User.find()
            .sort({ createdAt: -1 });

        res.json(users);

    } catch (error) {
        console.error("Get Users Error:", error);

        res.status(500).json({
            message: "Failed to get users",
            error: error.message
        });
    }
});


// =====================================================
// GET SINGLE USER
// GET /api/users/:id
// =====================================================

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate("followers", "name username profileImage")
            .populate("following", "name username profileImage");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {
        console.error("Get User Error:", error);

        res.status(500).json({
            message: "Failed to get user",
            error: error.message
        });
    }
});


// =====================================================
// UPDATE USER PROFILE
// PUT /api/users/:id
// =====================================================

router.put("/:id", async (req, res) => {
    try {
        const {
            name,
            username,
            email,
            bio,
            profileImage
        } = req.body;

        const updatedUser =
            await User.findByIdAndUpdate(
                req.params.id,
                {
                    name,
                    username,
                    email,
                    bio,
                    profileImage
                },
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(updatedUser);

    } catch (error) {
        console.error("Update User Error:", error);

        res.status(500).json({
            message: "Failed to update user",
            error: error.message
        });
    }
});


// =====================================================
// FOLLOW / UNFOLLOW USER
// PUT /api/users/:id/follow
// =====================================================

router.put("/:id/follow", async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        if (userId === req.params.id) {
            return res.status(400).json({
                message: "You cannot follow yourself"
            });
        }

        const currentUser =
            await User.findById(userId);

        const targetUser =
            await User.findById(req.params.id);

        if (!currentUser || !targetUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const alreadyFollowing =
            currentUser.following.some(
                id =>
                    id.toString() ===
                    targetUser._id.toString()
            );

        if (alreadyFollowing) {

            currentUser.following =
                currentUser.following.filter(
                    id =>
                        id.toString() !==
                        targetUser._id.toString()
                );

            targetUser.followers =
                targetUser.followers.filter(
                    id =>
                        id.toString() !==
                        currentUser._id.toString()
                );

            await currentUser.save();
            await targetUser.save();

            return res.json({
                message: "User unfollowed successfully",
                following: false
            });
        }

        currentUser.following.push(
            targetUser._id
        );

        targetUser.followers.push(
            currentUser._id
        );

        await currentUser.save();
        await targetUser.save();

        res.json({
            message: "User followed successfully",
            following: true
        });

    } catch (error) {
        console.error("Follow Error:", error);

        res.status(500).json({
            message: "Failed to follow/unfollow user",
            error: error.message
        });
    }
});


// =====================================================
// DELETE USER
// DELETE /api/users/:id
// =====================================================

router.delete("/:id", async (req, res) => {
    try {
        const deletedUser =
            await User.findByIdAndDelete(
                req.params.id
            );

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully",
            user: deletedUser
        });

    } catch (error) {
        console.error("Delete User Error:", error);

        res.status(500).json({
            message: "Failed to delete user",
            error: error.message
        });
    }
});


module.exports = router;