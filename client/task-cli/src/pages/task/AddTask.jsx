import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../funtions/config';
import Cookies from 'js-cookie';

const AddTask = ({ setShowModal, setcount }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [projectId, setProjectId] = useState('');
    const [assignedToId, setAssignedToId] = useState('');
    const [projects, setProjects] = useState([]);
    const access = Cookies.get('access')

    const header = {
        Authorization: `Bearer ${access}`
    }
    useEffect(() => {
        // Fetch projects data from the API
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${config.base_url}/api/projects/`, { headers: header });
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectChange = (e) => {
        const selectedProjectId = e.target.value;
        setProjectId(selectedProjectId);

        const selectedProject = projects.find(project => project.id === parseInt(selectedProjectId));
        if (selectedProject) {
            const assignedMembers = selectedProject.members.map(member => member.id);
            setAssignedToId(assignedMembers[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${config.base_url}/api/tasks/`, {
                "title": title,
                "description": description,
                "due_date": dueDate,
                "project": projectId,
                "assigned_to": assignedToId
            }, { headers: header });

            console.log('Task created:', response.data);
            setTitle('');
            setDescription('')
            setAssignedToId('')
            setProjectId('')
            setDueDate('')
            setcount(2)
            setShowModal(false)
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} class="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
            </label>
            <label>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} class="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
            </label>
            <label>
                Due Date:
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} class="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
            </label>
            <label>
                Project:
                <select value={projectId} onChange={handleProjectChange} class="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400">
                    <option value="">Select a project</option>
                    {projects.map(project => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                </select>
            </label>
            <label>
                Assigned To (User ID):
                <select value={assignedToId} onChange={(e) => setAssignedToId(e.target.value)} class="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400">
                    {projects.length > 0 && projects.find(project => project.id === parseInt(projectId)) &&
                        projects.find(project => project.id === parseInt(projectId)).members.map(member => (
                            <option key={member.id} value={member.id}>{member.username}</option>
                        ))}
                </select>
            </label>
            <div className="p-3 flex items-center justify-end">
                <div>
                    <button type='submit' className="text-sm text-white bg-blue-500 rounded-md px-4 py-2">Add Task</button>
                </div>
            </div>
        </form>
    );
};

export default AddTask;
