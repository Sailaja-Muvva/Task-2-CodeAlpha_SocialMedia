# 🌐 CodeAlpha Social Media

A full-stack and user-friendly Social Media Platform built with **HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB**. The application allows users to create profiles, share posts, like and comment on posts, follow other users, and view user profiles.

This project was developed as part of my **CodeAlpha Full Stack Development Internship**.

## 🚀 Features

* 👤 Create and view user profiles
* 📝 Create and publish posts
* 📰 Display recent posts
* ❤️ Like posts
* 💬 Add comments to posts
* 👥 Follow other users
* 📊 View followers and following counts
* 🖼️ Support for profile and post image URLs
* 🔍 View individual user profiles
* 🌐 REST API based backend
* 💾 Store users, posts, comments, and relationships in MongoDB
* 🎨 Simple and responsive user interface

## 🛠️ Technologies Used

* **HTML5** – Web page structure
* **CSS3** – Styling and responsive design
* **JavaScript** – Frontend functionality and API communication
* **Node.js** – Backend runtime
* **Express.js** – REST API and server
* **MongoDB** – Database
* **Mongoose** – MongoDB object modeling
* **CORS** – Frontend-backend communication
* **Git & GitHub** – Version control

## 📂 Project Structure

```text
CodeAlpha_SocialMedia/
│
├── backend/
│   ├── models/
│   │   ├── userModel.js
│   │   ├── postModel.js
│   │   └── commentModel.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── postRoutes.js
│   │   └── commentRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── screenshots/
│   ├── home.png
│   ├── create-post.png
│   ├── comments.png
│   └── profile-follow.png
│
├── README.md
└── .gitignore
```

> **Note:** `.env` contains the MongoDB connection string and should not be uploaded to GitHub.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project folder

```bash
cd CodeAlpha_SocialMedia
```

### 3. Open the backend

```bash
cd backend
```

### 4. Install dependencies

```bash
npm install
```

### 5. Configure environment variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

### 6. Start the backend server

```bash
node server.js
```

The backend API will run at:

```text
http://127.0.0.1:5000
```

### 7. Run the frontend

Open the `frontend/index.html` file using **VS Code Live Server**.

The frontend will normally be available at:

```text
http://127.0.0.1:5500/frontend/index.html
```

## 🔗 API Endpoints

### 👤 Users

```text
GET    /api/users
POST   /api/users
GET    /api/users/:id
```

### 📝 Posts

```text
GET    /api/posts
POST   /api/posts
```

### 💬 Comments

```text
GET    /api/comments/:postId
POST   /api/comments
```

## 🧑‍💻 How to Use

### 1. Create User

Open **Create User** and enter:

* Name
* Username
* Email
* Bio
* Optional profile image URL

Click **Create User**.

### 2. Create a Post

Open **Create Post**.

Enter:

* User ID
* Post content
* Optional image URL

Click **Create Post**.

### 3. Like a Post

Click the **❤️ Like** button below a post.

### 4. Comment on a Post

Open the **💬 Comments** section, enter your comment, and submit it.

### 5. Follow a User

Go to the **People** section and click **Follow** on another user.

### 6. View Profile

Click **View Profile** to see the user's profile information, followers, and following details.

## 🗄️ Database

The application uses **MongoDB** to store application data.

The main collections/models include:

| Collection | Description                     |
| ---------- | ------------------------------- |
| Users      | Stores user profile information |
| Posts      | Stores user posts               |
| Comments   | Stores comments on posts        |

User relationships such as followers and following are also stored in the user data.

## 🔒 Security

* MongoDB credentials are stored in `.env`.
* `.env` is excluded using `.gitignore`.
* API keys or database credentials are not hard-coded in the source code.

## 🎯 Learning Outcomes

Through this project, I learned and practiced:

* Full-stack web development
* HTML, CSS and JavaScript
* Node.js and Express.js
* REST API development
* MongoDB and Mongoose
* CRUD operations
* Frontend-backend communication
* User profile management
* Like and comment functionality
* Follow/follower relationships
* Git and GitHub project management

## 🔮 Future Improvements

Possible future enhancements include:

* 🔐 User authentication and login
* 🔑 Password hashing and authentication
* 🔔 Notifications
* 🔍 Post search
* 🏷️ Hashtags
* 🖼️ Direct image uploads
* ✏️ Edit and delete posts
* 📱 Improved mobile interface
* 🌙 Dark mode
* 💬 Real-time messaging

## 🎓 Internship

This project was developed as part of my **CodeAlpha Full Stack Development Internship**.

## 👨‍💻 Author

**Sailaja Muvva**

MCA Student | Full Stack Developer

## 📄 License

This project is created for educational and internship purposes.
