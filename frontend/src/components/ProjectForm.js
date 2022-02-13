import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', repo: '', authors: [props.authors[0].username]
        }
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.authors, this.state.repo);
        event.preventDefault()
    }

    handleChange(event) {
        if (event.target.name === 'authors') {
            let value = Array.from(event.target.selectedOptions, option => option.value);
            this.setState({authors: value})
        } else {
            this.setState({[event.target.name]: event.target.value})
        }
    }

    render() {
        return (<form onSubmit={event => this.handleSubmit(event)}>
            <div className='form-group'>
                <label htmlFor='login'>name</label>
                <input type='text' className='form-control' name='name' value={this.state.name}
                       onChange={event => this.handleChange(event)}/>
            </div>
            <div className='form-group'>
                <label htmlFor='authors'>authors</label>
                <select multiple className='form-control' name='authors'
                        onChange={event => this.handleChange(event)}>
                    {this.props.authors.map((item, i) => <option value={item.username}
                                                                 key={i}>{item.username}</option>)}
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor='repo'>repo</label>
                <input type='url' className='form-control' name='repo' value={this.state.repo}
                       onChange={event => this.handleChange(event)}/>
            </div>
            <input type='submit' className='btn btn-primary' value='Save'/>
        </form>)
    }
}

export default ProjectForm