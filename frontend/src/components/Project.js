import React from "react";
import {Link} from "react-router-dom";

class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: props.projects
        }
    }

    filterProjects(event) {
        event.preventDefault();
        this.setState({
            projects: this.props.projects.filter(obj => {
                return obj.name.startsWith(event.target[0].value)
            })
        })
    }

    render() {
        return <div>
            <form onSubmit={event => this.filterProjects(event)}>
                <input type='text' name='filter'/>
                <input type='submit' value='Filter'/>
            </form>
            <table>
                <thead>
                <tr>
                    <th>name</th>
                    <th>repo link</th>
                    <th>authors</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {this.state.projects.map((project, i) => <tr key={i}>
                    <td>{project.name}</td>
                    <td><a href={project.repo}>{project.repo}</a></td>
                    <td>{project.authors.map((item, i) => <option key={i}>{item}</option>)}</td>
                    <td>
                        <button onClick={() => this.props.deleteProject(project.id)} type='button'>Delete</button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            <Link to={'/projects/create'}>Create</Link>
        </div>
    }
}

export default ProjectList