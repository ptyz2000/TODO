import React from "react";


const ProjectItem = ({project}) => {
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
    </tr>)
};

const ProjectList = ({projects}) => {
    return (<table>
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
        </tr>
        </thead>
        <tbody>
        {projects.map((project, i) => <ProjectItem project={project} key={i}/>)}
        </tbody>
    </table>)
};

export default ProjectList