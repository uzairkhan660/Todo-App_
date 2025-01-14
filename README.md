Sure! Here's the updated `README.md` file without the folder structure section:

---

# MERN Todo App with Passport.js

This is a **MERN (MongoDB, Express, React, Node.js)** application that allows users to manage their todos. The app uses **Passport.js** for user authentication.

### Features:
- User authentication (Login/Signup) using Passport.js.
- Add, update, and delete todos.
- Secure API routes with JWT and Passport.js.

### Technologies Used:
- **MongoDB** - Database to store user and todo data.
- **Express** - Web framework for Node.js.
- **React** - Frontend for the application.
- **Node.js** - Backend runtime.
- **Passport.js** - Authentication middleware.
- **JWT** - JSON Web Token for secure API routes.

---

## Setup and Installation

Follow the steps below to set up and run the application.

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/uzairkhan660/Todo-App_.git
```

### 2. Install Dependencies for Server (Backend)

Go to the `server` directory and install the required npm packages:

```bash
cd server
npm install
```

### 3. Install Dependencies for Client (Frontend)

Go to the `client` directory and install the required npm packages:

```bash
cd client
npm install
```

### 4. Start the Backend Server

Navigate back to the `server` directory and start the backend server:

```bash
npm start
```

This will start the backend on `http://localhost:5000`.

### 5. Start the Frontend (React) Application

Open another terminal, navigate to the `client` directory, and start the React frontend:

```bash
cd client
npm start
```

This will start the React frontend on `http://localhost:3000`.

---

## Usage

1. Open `http://localhost:3000` in your browser.
2. Register a new user or log in using Google OAuth or local credentials.
3. Once logged in, you can perform CRUD operations on your todos.
   - **Add a Todo**: Enter a task and click 'Add'.
   - **Update a Todo**: Edit a task and click 'Save'.
   - **Delete a Todo**: Click the 'Delete' button next to the task.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This version has removed the folder structure section as requested. Let me know if you'd like any further adjustments!
