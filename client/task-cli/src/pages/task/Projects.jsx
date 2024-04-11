import React, { useEffect, useState } from 'react'
import DashUI from './DashUI'
import config from '../../funtions/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import AddProject from './AddProject';
import ProjectDetails from './ProjectDetails';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const access = Cookies.get('access')
    const [showModal, setShowModal] = useState(false);
    const [showprojectModal, setshowprojectModal] = useState(false);
    const [projectid, setprojectid] = useState()
    const [count, setcount] = useState(0)

    const header = {
        Authorization: `Bearer ${access}`
    }

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${config.base_url}/api/projects/`, { headers: header });
            console.log(response.data)
            setProjects(response.data);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProjects();
    }, [count]);

    function formatDate(dateString) {
        const dateParts = dateString.split('-');
        const formattedDate = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const day = formattedDate.getDate();
        const month = months[formattedDate.getMonth()];
        const year = formattedDate.getFullYear();
        return `${day} ${month} ${year}`;
    }
    const DeleteProject = async (id) => {
        try {
            const response = await axios.delete(`${config.base_url}/api/projects/${id}/`, { headers: header });
            console.log(response.data)
            fetchProjects();
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    return (
        <div className="relative bg-yellow-50 overflow-hidden max-h-screen flex">
            <DashUI sideactive={"projects"}></DashUI>
            <div className="ml-60 h-screen w-full">
                <div className="flex flex-col  h-screen overflow-auto  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 ">
                    <div className="flex justify-between px-10 mt-6 ">
                        <h1 className="text-2xl font-bold">Projects</h1>

                        <button className="flex items-center justify-center p-2  ml-auto text-[#4b3517] rounded hover:bg-[#4b3517] hover:text-white border border-[#4b3517]" onClick={() => setShowModal(true)}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            <span>Add Project</span>
                        </button>
                    </div>
                    <div className="flex  px-10 mt-4 space-x-6 w-full">
                        <div className="flex flex-col flex-shrink-0 w-full">
                            <div className="flex flex-wrap gap-5 pb-2 w-full">

                                {projects.map((project) => {
                                    return (
                                        <div className="relative flex flex-col w-44 items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100" draggable="true" onClick={() => { setprojectid(project.id); setshowprojectModal(true) }}>
                                            <button className="absolute right-1 top-1 text-xs font-medium text-gray-400 hover:bg-red-300 p-1 rounded-md" onClick={(e) => { e.stopPropagation(); DeleteProject(project.id) }} >
                                                <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                            </button>
                                            <h2 className="mt-3 text-2xl font-medium">{project.name}</h2>
                                            <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                                                    </svg>
                                                    <span className="ml-1 leading-none">{formatDate(project.end_date)}</span>
                                                </div>
                                                <div className="relative flex items-center ml-4">
                                                    <span className="ml-1 leading-none">4</span>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
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
                            <AddProject setShowModal={setShowModal} setcount={setcount} />
                        </div>
                        {/* <div className="p-3 flex items-center justify-end">
                        <div>
                            <button className="text-sm text-white bg-blue-500 rounded-md px-4 py-2">Add Task</button>
                            <button className="modal-close text-sm text-gray-400 border rounded-md px-4 py-2">Decline</button>
                        </div>
                    </div> */}
                    </div>
                </div>) : null}
            {showprojectModal ? (
                <div id="modal" className="flex items-center justify-center h-screen w-screen fixed top-0 bg-black bg-opacity-60" onClick={() => { setshowprojectModal(false); }}>
                    <div className="bg-white max-w-xl w-full rounded-md" onClick={(event) => { event.stopPropagation(); }} >
                        <div className="p-3 flex items-center justify-between border-b border-b-gray-300">
                            <h3 className="font-semibold text-xl">Project Details</h3>
                            <span className="modal-close cursor-pointer" onClick={() => setshowprojectModal(false)} >×</span>
                        </div>
                        <div className="p-3 border-b border-b-gray-300">
                            <ProjectDetails projectid={projectid} setShowModal={setShowModal} />
                        </div>
                        {/* <div className="p-3 flex items-center justify-end">
                        <div>
                            <button className="text-sm text-white bg-blue-500 rounded-md px-4 py-2">Add Task</button>
                            <button className="modal-close text-sm text-gray-400 border rounded-md px-4 py-2">Decline</button>
                        </div>
                    </div> */}
                    </div>
                </div>) : null}


        </div >
    )
}

export default Projects