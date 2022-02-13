import React from "react";
import {Link} from "react-router-dom";


const ProjectItem = ({project, deleteProject}) => {
    // noinspection JSUnresolvedVariable
    return (<tr>
        <td>
            {project.name}
        </td>
        <td>
            <a href={project.repo}>{project.repo}</a>
        </td>
        <td>
            {project.authors.map((item, i) => <option key={i}>{item}</option>)}
        </td>
        <td>
            <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
        </td>
    </tr>)
};

const ProjectList = ({projects, deleteProject}) => {
    return (<div>
        <table>
            <thead>
            <tr>
                <th>
                    name
                </th>
                <th>
                    repo link
                </th>
                <th>
                    authors
                </th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {projects.map((project, i) => <ProjectItem project={project} deleteProject={deleteProject} key={i}/>)}
            </tbody>
        </table>
        <Link to={'/projects/create'}>Create</Link>
    </div>)
};

export default ProjectList