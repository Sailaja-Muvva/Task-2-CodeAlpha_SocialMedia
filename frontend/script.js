const API_URL = "http://127.0.0.1:5000/api";

async function createUser() {

    const name = document.getElementById("userName").value.trim();
    const username = document.getElementById("userUsername").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const bio = document.getElementById("userBio").value.trim();
    const profileImage = document.getElementById("userProfileImage").value.trim();

    if (!name || !username || !email) {
        alert("Name, username and email are required.");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                username,
                email,
                bio,
                profileImage
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Failed to create user");
            return;
        }

        alert("User created successfully! ✅");

        document.getElementById("userName").value = "";
        document.getElementById("userUsername").value = "";
        document.getElementById("userEmail").value = "";
        document.getElementById("userBio").value = "";
        document.getElementById("userProfileImage").value = "";

        loadUsers();

    } catch (error) {

        console.error("Create User Error:", error);

        alert("Backend connection failed.");
    }
}

async function loadUsers() {

    const container = document.getElementById("usersContainer");

    if (!container) {
        console.error("usersContainer not found");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/users`);

        const users = await response.json();

        if (!response.ok) {
            throw new Error(
                users.message || "Failed to load users"
            );
        }

        if (users.length === 0) {

            container.innerHTML = `
                <p>No users available.</p>
            `;

            return;
        }

        container.innerHTML = users.map(user => {

            const firstLetter =
                user.name
                    ? user.name.charAt(0).toUpperCase()
                    : "?";

            return `
                <div class="user-card">

                    <div class="avatar">
                        ${firstLetter}
                    </div>

                    <h3>
                        ${escapeHTML(user.name)}
                    </h3>

                    <p>
                        @${escapeHTML(user.username)}
                    </p>

                    <p>
                        ${escapeHTML(
                            user.bio || "No bio available"
                        )}
                    </p>

                    <p>
                        <strong>User ID:</strong><br>
                        ${escapeHTML(user._id)}
                    </p>

                    <button
                        onclick="viewProfile('${user._id}')"
                    >
                        View Profile
                    </button>

                    <button
                        onclick="followUser('${user._id}')"
                    >
                        Follow
                    </button>

                </div>
            `;

        }).join("");

    } catch (error) {

        console.error("Load Users Error:", error);

        container.innerHTML = `
            <p>
                Unable to load users.
            </p>
        `;
    }
}
async function createPost() {

    const user =
        document.getElementById("postUser").value.trim();

    const content =
        document.getElementById("postContent").value.trim();

    const image =
        document.getElementById("postImage").value.trim();


    if (!user || !content) {

        alert("User ID and post content are required.");

        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/posts`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    user,
                    content,
                    image
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to create post"
            );

            return;
        }


        alert("Post created successfully! ✅");


        document.getElementById("postContent").value = "";
        document.getElementById("postImage").value = "";


        loadPosts();


    } catch (error) {

        console.error(
            "Create Post Error:",
            error
        );

        alert("Backend connection failed.");
    }
}
async function loadPosts() {

    const container =
        document.getElementById("postsContainer");


    if (!container) {
        console.error("postsContainer not found");
        return;
    }


    try {

        const response =
            await fetch(`${API_URL}/posts`);


        const posts =
            await response.json();


        if (!response.ok) {

            throw new Error(
                posts.message ||
                "Failed to load posts"
            );
        }


        if (posts.length === 0) {

            container.innerHTML = `
                <p>No posts available.</p>
            `;

            return;
        }


        container.innerHTML =
            posts.map(post => {

                const userName =
                    post.user?.name ||
                    "Unknown User";


                const username =
                    post.user?.username ||
                    "user";


                const firstLetter =
                    userName
                        .charAt(0)
                        .toUpperCase();


                const likes =
                    post.likes
                        ? post.likes.length
                        : 0;


                return `

                    <div class="post-card">

                        <div class="post-header">

                            <div class="avatar">
                                ${firstLetter}
                            </div>

                            <div>

                                <h3>
                                    ${escapeHTML(userName)}
                                </h3>

                                <p>
                                    @${escapeHTML(username)}
                                </p>

                            </div>

                        </div>


                        <div class="post-content">

                            ${escapeHTML(
                                post.content
                            )}

                        </div>


                        ${
                            post.image
                                ? `
                                    <img
                                        src="${escapeAttribute(
                                            post.image
                                        )}"
                                        alt="Post image"
                                        class="post-image"
                                    >
                                `
                                : ""
                        }


                        <div class="post-actions">

                            <button
                                onclick="likePost('${post._id}')"
                            >
                                ❤️ Like (${likes})
                            </button>

                            <button
                                onclick="loadComments('${post._id}')"
                            >
                                💬 Comments
                            </button>

                        </div>


                        <div
                            id="comments-${post._id}"
                        ></div>

                    </div>

                `;

            }).join("");


    } catch (error) {

        console.error(
            "Load Posts Error:",
            error
        );


        container.innerHTML = `
            <p>
                Unable to load posts.
            </p>
        `;
    }
}


// =====================================================
// LIKE POST
// =====================================================

async function likePost(postId) {

    const userId =
        document.getElementById("postUser")
            .value.trim();


    if (!userId) {

        alert(
            "Enter your User ID in Create Post first."
        );

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/posts/${postId}/like`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        userId
                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to like post"
            );

            return;
        }


        loadPosts();


    } catch (error) {

        console.error(
            "Like Error:",
            error
        );
    }
}
async function followUser(targetUserId) {

    const userId =
        document.getElementById("postUser")
            .value.trim();


    if (!userId) {

        alert(
            "Enter your User ID in Create Post first."
        );

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/users/${targetUserId}/follow`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        userId
                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to follow user"
            );

            return;
        }


        alert(data.message);

        loadUsers();


    } catch (error) {

        console.error(
            "Follow Error:",
            error
        );
    }
}


// =====================================================
// VIEW PROFILE
// =====================================================

async function viewProfile(userId) {

    const container =
        document.getElementById(
            "profileContainer"
        );


    if (!container) return;


    try {

        const response =
            await fetch(
                `${API_URL}/users/${userId}`
            );


        const user =
            await response.json();


        if (!response.ok) {

            alert(
                user.message ||
                "User not found"
            );

            return;
        }


        const firstLetter =
            user.name
                ? user.name.charAt(0).toUpperCase()
                : "?";


        const followers =
            user.followers
                ? user.followers.length
                : 0;


        const following =
            user.following
                ? user.following.length
                : 0;


        container.innerHTML = `

            <div class="profile-avatar">
                ${firstLetter}
            </div>

            <h3>
                ${escapeHTML(user.name)}
            </h3>

            <p>
                @${escapeHTML(user.username)}
            </p>

            <p>
                ${escapeHTML(
                    user.bio || "No bio available"
                )}
            </p>

            <p>
                <strong>
                    ${followers}
                </strong>
                Followers
            </p>

            <p>
                <strong>
                    ${following}
                </strong>
                Following
            </p>

        `;


    } catch (error) {

        console.error(
            "Profile Error:",
            error
        );
    }
}

async function loadComments(postId) {

    const container =
        document.getElementById(
            `comments-${postId}`
        );


    if (!container) return;


    try {

        const response =
            await fetch(
                `${API_URL}/comments/post/${postId}`
            );


        const comments =
            await response.json();


        if (!response.ok) {

            throw new Error(
                comments.message ||
                "Failed to load comments"
            );
        }


        let html = "";


        if (comments.length === 0) {

            html += `
                <p>No comments yet.</p>
            `;

        } else {

            html += comments.map(comment => {

                const name =
                    comment.user?.name ||
                    "User";


                return `

                    <div class="comment">

                        <strong>
                            ${escapeHTML(name)}
                        </strong>

                        <p>
                            ${escapeHTML(
                                comment.content
                            )}
                        </p>

                    </div>

                `;

            }).join("");
        }


        html += `

            <div class="comment-form">

                <input
                    id="comment-user-${postId}"
                    placeholder="User ID"
                >

                <input
                    id="comment-text-${postId}"
                    placeholder="Write a comment..."
                >

                <button
                    onclick="addComment('${postId}')"
                >
                    Comment
                </button>

            </div>

        `;


        container.innerHTML = html;


    } catch (error) {

        console.error(
            "Comments Error:",
            error
        );
    }
}

async function addComment(postId) {

    const user =
        document.getElementById(
            `comment-user-${postId}`
        ).value.trim();


    const content =
        document.getElementById(
            `comment-text-${postId}`
        ).value.trim();


    if (!user || !content) {

        alert(
            "User ID and comment are required."
        );

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/comments`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        post: postId,
                        user,
                        content
                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to add comment"
            );

            return;
        }


        loadComments(postId);


    } catch (error) {

        console.error(
            "Comment Error:",
            error
        );
    }
}


// =====================================================
// SECURITY HELPERS
// =====================================================

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {

    return escapeHTML(value);
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadUsers();

        loadPosts();

    }
);