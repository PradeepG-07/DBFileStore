# Day-9-DBFileStore

## Project Overview 📁
This project is part of the Day 9 assignments for the DBox course. The objective is to create a file storage system using a database.

## Features ✨
- Email based auth system
- Upload files to the database
- Retrieve files from the database
- Delete files from the database
- List all stored files

## Technologies Used 🛠️
- Programming Language: JavaScript
- Database: MongoDB
- Framework: Node.js, Express
- Other Libraries: Multer, Morgan

## Installation 💻
1. Clone the repository:
    ```sh
    git clone git@github.com:PradeepG-07/DBFileStore.git
    ```
2. Navigate to the project directory:
    ```sh
    cd ./Day-9-DBFileStore
    ```

## Usage 🚀
1. Navigate to the backend directory:
    ```sh
    cd backend
    ```
2. Start the application:
    ```sh
    npm start
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Navigate back to the frontend directory:
    ```sh
    cd ../frontend
    ```
5. Open the `index.html` file in your browser.

## API Endpoints 🌐
- `POST /auth/signin` - Sign in a user
- `POST /auth/signup` - Sign up a new user
- `GET /user/files` - Get list of user files
- `GET /user/:id` - Get user information by ID
- `POST /user/files` - Add a new file for the user
- `DELETE /user/files/:fileId` - Delete a user file by file ID
- `GET /uploads/:filename/:token` - Get an uploaded file by filename and token

## Contribution 🤝
Contributions are welcome! If you would like to contribute to this project, please follow these steps:
1. Fork the repository.
    [![GitHub Fork](https://img.shields.io/badge/Fork-100000?style=flat&logo=github&logoColor=white)](https://github.com/PradeepG-07/DBFileStore/fork)
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.
    ![GitHub Pull Request](https://img.shields.io/badge/Pull%20Request-100000?style=flat&logo=github&logoColor=white)

Thank you for your contributions!

## Contact 📧
For any questions or feedback, please contact to email address provided at the profile page.