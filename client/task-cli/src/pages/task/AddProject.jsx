import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import config from '../../funtions/config';
import Cookies from 'js-cookie';

const AddProject = ({ setShowModal, setcount }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [projectId, setProjectId] = useState('');
    const [assignedMembers, setAssignedMembers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [members, setMembers] = useState([]);
    const access = Cookies.get('access')


    const header = {
        Authorization: `Bearer ${access}`
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.base_url}/api/projects/`, {
                "name": title,
                "description": description,
                "start_date": startDate,
                "end_date": dueDate,
                "members": assignedMembers.map((member) => member.value),
            }, { headers: header });
            console.log(response.data);
            setTitle('');
            setDescription('');
            setDueDate('');
            setStartDate('');
            setProjectId('');
            setAssignedMembers([]);
            setcount(2)
            setShowModal(false)
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProjectsAndMembers = async () => {
        try {
            const membersResponse = await axios.get(`${config.base_url}/api/members/`, { headers: header });
            setMembers(membersResponse.data.map((member) => ({
                value: member.id,
                label: member.username,
            })))
            console.log(membersResponse.data)

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProjectsAndMembers();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className='flex flex-col' htmlFor="title">Title
                    <input class="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    /></label>
            </div>
            <div>
                <label className='flex flex-col' htmlFor="description">Description</label>
                <input class="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label className='flex flex-col' htmlFor="dueDate">Start Date</label>
                <input class="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="date"
                    id="dueDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div>
                <label className='flex flex-col' htmlFor="dueDate">End Date</label>
                <input class="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>

            <div>
                <label className='flex flex-col' htmlFor="assignedMembers">Assigned Members</label>
                <Select
                    id="assignedMembers"
                    isMulti
                    value={assignedMembers}
                    onChange={setAssignedMembers}
                    options={members}
                />
            </div>
            <div className="p-3 flex items-center justify-end">
                <div>
                    <button type='submit' className="text-sm text-white bg-blue-500 rounded-md px-4 py-2">Add Project</button>
                    {/* <button className="modal-close text-sm text-gray-400 border rounded-md px-4 py-2">Decline</button> */}
                </div>
            </div>
        </form>
    );
};

export default AddProject;