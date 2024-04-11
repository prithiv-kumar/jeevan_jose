# TASK MANAGEMENT

A brief description of what this project does

The postman json collection is added to repository for API testing purposes

# Project Installation Guide

This guide will walk you through the installation process for setting up the Django server and React client for the project.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Python (version 3.9 or higher)
- Node.js (version 14.x LTS recommended)
- npm (Node.js package manager)

## Django Server Installation

1. Clone the repository to your local machine:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the Django server directory:

   ```bash
   cd server
   ```

3. Create a virtual environment:

   ```bash
   python3 -m venv env
   ```

4. Activate the virtual environment:

   - On macOS/Linux:

     ```bash
     source env/bin/activate
     ```

   - On Windows:

     ```bash
     .\env\Scripts\activate
     ```

5. Navigate to the project:

```bash
cd tasks_back
```

6. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

7. Apply database migrations:

   ```bash
   python manage.py migrate
   ```

8. Start the Django server:

   ```bash
   python manage.py runserver
   ```

   The server should now be running locally on `http://localhost:8000`.

## React Client Installation

1. Navigate to the React client directory:

   ```bash
   cd client/task-cli
   ```

2. Install the required Node.js packages:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm run dev
   ```

   The React client should now be running locally on `http://localhost:3000`.

## Usage

You can now access the project by navigating to `http://localhost:3000` in your web browser. The React client will interact with the Django server to provide the intended functionality of the project.

If you encounter any issues during the installation process, please refer to the project's documentation or seek assistance from the project maintainers.

# TASK MANAGEMENT SYSTEM API Reference

The backend development was implemented with Django, Django Rest Framework, JWT Authetication

there are 2 apps in django backend
accounts and api

accounts handle Authentication
api handle all other APIs

## Authentication

### Login

```http
POST /auth/login/
```

Request Body:

```json
{
  "username": "employee1",
  "password": "123"
}
```

### Register

```http
POST /auth/register/
```

Request Body:

```json
{
  "username": "employee7",
  "password": "123",
  "email": "employee1@gmail.com"
}
```

## Projects

### Get all projects

```http
GET /api/projects/
```

### Get projects created by the user

```http
GET /api/projects/created/
```

### Get single project detail

```http
GET /api/projects/1/
```

### Create a new project

```http
POST /api/projects/
```

Request Body:

```json
{
  "members": [1, 2],
  "name": "project1",
  "description": "project1 des",
  "start_date": "2024-05-13",
  "end_date": "2024-05-15"
}
```

## Tasks

### Get all tasks

```http
GET /api/tasks/
```

### Get single task detail

```http
DELETE /api/tasks/1/
```

### Create a new task

```http
POST /api/tasks/
```

Request Body:

```json
{
  "text": "comment 1",
  "task": 1,
  "user": 2
}
```

## Comments

### Get all comments

```http
GET /api/comments/
```

### Get single comment detail

```http
GET /api/comments/1/
```

### Create a new comment

```http
POST /api/comments/
```

Request Body:

```json
{
  "text": "comment 1",
  "task": 1,
  "user": 2
}
```

## Members

### Get all members

```http
GET /api/members/
```

## Sample Requests

### Get projects sample

```http
GET /api/pros/
```

## Variables

- `access_token`: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyODU4ODUxLCJpYXQiOjE3MTI4NTUyNTEsImp0aSI6ImQ1MmI0NjM5ZTZmMjQ3NTRiYzE1YzdhMTdiNzNmNzgwIiwidXNlcl9pZCI6Mn0.sRw_Ep2TG9nsZZGfLSu04vLYd3FOM5ppmA1gHiH3JSA
- `base_url`: http://127.0.0.1:8000

```

This Markdown document provides a structured overview of the API endpoints, their methods, request bodies, and parameters. It also includes sample requests and variables used in the requests. Adjust the content as needed to fit your requirements.
```
