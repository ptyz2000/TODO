import React from "react";

class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '', author: props.authors[0].username, project: props.projects[0].name, is_active: false,
        }
    }

    handleSubmit(event) {
        this.props.createToDo(this.state.text, this.state.author, this.state.project, this.state.is_active);
        event.preventDefault()
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleCheckbox(event) {
        this.setState({is_active: event.target.checked})
    }

    render() {
        return (<form onSubmit={event => this.handleSubmit(event)}>
            <div className='form-group'>
                <label htmlFor='text'>text</label>
                <textarea className='form-control' name='text' value={this.state.text}
                          onChange={event => this.handleChange(event)}/>
            </div>
            <div className='form-group'>
                <label htmlFor='author'>author</label>
                <select className='form-control' name='author'
                        onChange={event => this.handleChange(event)}>
                    {this.props.authors.map((item, i) => <option value={item.username}
                                                                 key={i}>{item.username}</option>)}
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor='author'>project</label>
                <select className='form-control' name='project'
                        onChange={event => this.handleChange(event)}>
                    {this.props.projects.map((item, i) => <option value={item.name} key={i}>{item.name}</option>)}
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor='is_active'>is active</label>
                <input type='checkbox' className='form-control' name='is_active' value={this.state.is_active}
                       onChange={event => this.handleCheckbox(event)}/>
            </div>
            <input type={'submit'} className={'btn btn-primary'} value={'Save'}/>
        </form>)
    }
}

export default ToDoForm