import React, { useState, useEffect } from 'react'
import DashUI from './DashUI'
import axios from 'axios';
import config from '../../funtions/config';
import Cookies from 'js-cookie';
import AddProject from './AddProject';
import AddTask from './AddTask';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';



function formatDate(dateString) {
    const dateParts = dateString.split('-');
    const formattedDate = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = formattedDate.getDate();
    const month = months[formattedDate.getMonth()];
    const year = formattedDate.getFullYear();
    return `${day} ${month} ${year}`;
}

function Task() {
    const [projects, setProjects] = useState([]);
    const access = Cookies.get('access')
    const [showModal, setShowModal] = useState(false);
    const [showModalwarning, setShowModalwarning] = useState(false);
    const [count, setcount] = useState(0)

    const header = {
        Authorization: `Bearer ${access}`
    }
    const GetProject = () => {
        const apiUrl = `${config.base_url}/api/pros/`;
        axios.get(apiUrl, { headers: header })
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    useEffect(() => {
        GetProject()
    }, [count])

    const AddtaskPopupWarning = () => {

        if (projects.length === 0) {
            setShowModalwarning(true)

        } else {
            setShowModal(true)
        }

    }

    return (
        <div className="relative bg-yellow-50 overflow-hidden max-h-screen flex">
            <DashUI sideactive={"tasks"}></DashUI>
            <div className="ml-60 h-screen overflow-auto w-full">
                <div className="flex flex-col  h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 " >
                    <div className=" flex justify-between px-10 mt-6">
                        <h1 className="text-2xl font-bold">Project Tasks Board</h1>
                        <button className="flex items-center justify-center p-2  ml-auto text-[#4b3517] rounded hover:bg-[#4b3517] hover:text-white border border-[#4b3517]" onClick={() => AddtaskPopupWarning()}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            <span>Add Task</span>
                        </button>
                    </div>

                    <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
                        {projects
                            .filter(project => project.tasks.length > 0) // Filter out projects with no tasks
                            .map(project => (
                                <Project key={project.id} project={project} setcount={setcount} />
                            ))}
                    </div>





                </div>

            </div>
            {showModal ? (
                <div id="modal" className="flex items-center justify-center h-screen w-screen fixed top-0 bg-black bg-opacity-60" onClick={() => { setShowModal(false); }}>
                    <div className="bg-white max-w-xl w-full rounded-md" onClick={(event) => { event.stopPropagation(); }} >
                        <div className="p-3 flex items-center justify-between border-b border-b-gray-300">
                            <h3 className="font-semibold text-xl">Add Project</h3>
                            <span className="modal-close cursor-pointer" onClick={() => setShowModal(false)} >×</span>
                        </div>
                        <div className="p-3 border-b border-b-gray-300">
                            <AddTask setShowModal={setShowModal} setcount={setcount} />
                        </div>

                    </div>
                </div>) : null}

            {showModalwarning ? (
                <div id="modal" className="flex items-center justify-center h-screen w-screen fixed top-0 bg-black bg-opacity-60" onClick={() => { setShowModalwarning(false); }}>
                    <div className="bg-white max-w-xl w-full rounded-md" onClick={(event) => { event.stopPropagation(); }} >
                        <div className="p-3 flex items-center justify-end">
                            <span className="modal-close cursor-pointer" onClick={() => setShowModalwarning(false)} >×</span>
                        </div>
                        <div className=" flex justify-center p-3  pb-7">
                            ADD PROJECT TO CONTINUE
                        </div>
                        <br />
                        <div className=" flex justify-center p-3  pb-7">

                            <Link to='/projects' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Add Project</Link>
                        </div>

                    </div>
                </div>) : null}


        </div >
    )
}

export default Task



const Project = ({ project, setcount }) => {
    return (
        <div className="flex flex-col flex-shrink-0 w-72">
            <div className="flex items-center flex-shrink-0 h-10 px-2">
                <span className="block text-sm font-semibold">{project.name}</span>
            </div>
            <div className="flex flex-col pb-2 overflow-auto">
                {project.tasks.map(task => (
                    <TaskItem key={task.id} task={task} setcount={setcount} />
                ))}
            </div>
        </div>
    );
};

const TaskItem = ({ task, setcount }) => {
    const [selectedOption, setSelectedOption] = useState(task.status || '');

    const access = Cookies.get('access')
    const header = {
        Authorization: `Bearer ${access}`
    }
    const getTaskStatusColor = (status) => {
        switch (status) {
            case 'todo':
                return 'text-blue-500 bg-blue-100';
            case 'in progress':
                return 'text-yellow-500 bg-yellow-100';
            case 'done':
                return 'text-green-500 bg-green-100';
            default:
                return 'text-gray-500 bg-gray-100';
        }
    };
    const DeleteTasks = async (id) => {
        try {
            const response = await axios.delete(`${config.base_url}/api/tasks/${id}/`, { headers: header });
            console.log(response.data)
            setcount(2)
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };
    const handleSelectChange = async (task, event) => {
        const selectedValue = event.target.value;

        try {
            const response = await axios.patch(`${config.base_url}/api/tasks/${task.id}/`, { "status": selectedValue }, { headers: header });
            console.log('Data uploaded successfully:', response.data);
            setcount(3)
        } catch (error) {
            console.error('Error uploading data:', error);
        }

        setSelectedOption(selectedValue);
    };


    return (
        <div className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100" draggable="true">
            <h4 className="mt-3 text-sm font-medium">{task.title}</h4>
            <button className="absolute right-1 top-1 text-xs font-medium text-gray-400 hover:bg-red-300 p-1 rounded-md" onClick={() => { DeleteTasks(task.id) }}>
                <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
            <div className="flex items-center justify-between w-full mt-3 text-xs font-medium text-gray-400">
                <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                    </svg>

                    <span className="ml-1 leading-none">Due Date : {formatDate(task.due_date)}</span>

                </div>
                {/* <span className={`flex items-center h-6 px-3 text-xs font-semibold ${getTaskStatusColor(task.status)} rounded-full`}>{task.status}</span> */}
                <select className={`flex items-center h-6 px-3 text-xs font-semibold ${getTaskStatusColor(task.status)} rounded-full`} value={selectedOption} onChange={(e) => { handleSelectChange(task, e) }} >
                    <option value="todo">todo</option>
                    <option value="in_progress">in progress</option>
                    <option value="done">done</option>
                </select>

            </div>

        </div>
    );
};