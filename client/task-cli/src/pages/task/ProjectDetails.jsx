import axios from 'axios';
import React, { useEffect, useState } from 'react'
import config from '../../funtions/config';
import Cookies from 'js-cookie';

function ProjectDetails({ projectid, setShowModal }) {
    const [project, setProject] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const access = Cookies.get('access')
    const header = {
        Authorization: `Bearer ${access}`
    }

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${config.base_url}/api/projects/${projectid}/`, { headers: header });
            console.log(response.data)
            setProject(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProjects();
    }, []);
    if (loading) {
        return (
            <div>Loading</div>
        )
    }
    return (<>
        <div>
            <div>
                <p className='font-bold'>Project Name</p>
                <p className='pl-5'>{project.name}</p>
            </div>
            <div>
                <p className='font-bold'>Project Description</p>
                <p className='pl-5'>{project.description}</p>
            </div>
            <div className='flex justify-between'>
                <div>
                    <p className='font-bold'>Start Date:</p>
                    <p className='pl-5'>{project.start_date}</p>
                </div>
                <div>
                    <p className='font-bold'>End Date:</p>
                    <p className='pl-5'>{project.end_date}</p>
                </div>
            </div>
            <h3 className='font-bold'>Members:</h3>
            <ul className='flex gap-5'>
                {project.members && project.members.map((member) => (
                    <li key={member.id} class="flex bg-[#fff]">
                        <div className='px-2 py-1 bg-slate-400/10 rounded-xl'>
                            <h6 class=" text-md px-2">{member.username}</h6>
                        </div>
                    </li>
                ))}
            </ul>
            {project.created_user && project.created_user.username &&
                <>
                    <p className='font-bold'>Created By:</p>
                    <p>{project.created_user.username}</p>

                </>
            }
        </div >
    </>

    )
}

export default ProjectDetails