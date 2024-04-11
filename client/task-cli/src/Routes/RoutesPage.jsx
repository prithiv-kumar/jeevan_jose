import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Login from '../pages/Login';
import RegisterPage from '../pages/RegisterPage';
import Task from '../pages/task/Task';
import Projects from '../pages/task/Projects';
import CreatedProjects from '../pages/task/CreatedProjects';

function RoutesPage() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/tasks" element={<Task />} />
                <Route path="/projects/self/" element={<CreatedProjects />} />
            </Routes>
        </Router>
    )
}

export default RoutesPage