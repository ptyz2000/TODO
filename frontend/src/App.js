import "./App.css";
import UserList from "./components/User";
import ProjectList from "./components/Project";
import ToDoList from "./components/ToDo";
import TopMenu from "./components/Menu";
import LoginForm from "./components/Auth";
import ProjectForm from "./components/ProjectForm";
import ToDoForm from "./components/ToDoForm";

import React from "react";
import axios from "axios";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Cookies from "universal-cookie";

const NotFound404 = ({location}) => {
    return (<div>
        <h1>Page '{location.pathname}' not found</h1>
    </div>)
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [], projects: [], todos: [], token: ''
        }
    }

    componentDidMount() {
        this.getTokenFromStorage();
    }


    setToken(token) {
        // noinspection JSValidateTypes
        const cookies = new Cookies();
        cookies.set('token', token);
        this.setState({token: token}, () => this.loadData())
    }

    isAuthenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.setToken('')
    }

    getTokenFromStorage() {
        // noinspection JSValidateTypes
        const cookies = new Cookies();
        const token = cookies.get('token');
        this.setState({token: token}, () => this.loadData())
    }

    getToken(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username, password: password
        })
            .then(response => {
                this.setToken(response.data['token'])
            }).catch(() => alert('Неверный логин или пароль'))
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        };
        if (this.isAuthenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    loadData() {
        const headers = this.getHeaders();
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data;
                this.setState({users: users.results})
            }).catch(error => {
            console.log(error);
            this.setState({users: []})
        });
        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data;
                this.setState({projects: projects.results})
            }).catch(error => {
            console.log(error);
            this.setState({projects: []})
        });
        axios.get('http://127.0.0.1:8000/api/todos/', {headers})
            .then(response => {
                const todos = response.data;
                this.setState({todos: todos.results})
            }).catch(error => {
            console.log(error);
            this.setState({todos: []})
        });
    }

    deleteProject(id) {
        const headers = this.getHeaders();
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}/`, {headers})
            .then(() => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
            })
            .catch(error => console.log(error))
    }

    deleteToDo(id) {
        const headers = this.getHeaders();
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`, {headers})
            .then(() => {
                this.setState({todos: this.state.todos.filter((item) => item.id !== id)})
            })
            .catch(error => console.log(error))
    }

    createProject(name, authors, repo) {
        const headers = this.getHeaders();
        const data = {name: name, authors: authors, repo: repo};
        axios.post('http://127.0.0.1:8000/api/projects/', data, {headers})
            .then(response => {
                let new_project = response.data;
                this.setState({projects: [...this.state.projects, new_project]})
            })
            .catch(error => console.log(error))
    }

    createToDo(text, author, project, is_active) {
        const headers = this.getHeaders();
        const data = {text: text, author: author, project: project, is_active: is_active};
        axios.post('http://127.0.0.1:8000/api/todos/', data, {headers})
            .then(response => {
                let new_todo = response.data;
                this.setState({todos: [...this.state.todos, new_todo]})
            })
            .catch(error => console.log(error))
    }

    render() {
        return (<div className="App">
            <BrowserRouter>
                <TopMenu is_authenticated={() => this.isAuthenticated()} logout={() => this.logout()}/>
                <Switch>
                    <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                    <Route exact path='/projects/create' component={() => <ProjectForm
                        createProject={(name, authors, repo) => this.createProject(name, authors, repo)}
                        authors={this.state.users}/>}/>
                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}
                                                                                deleteProject={(id) => this.deleteProject(id)}
                                                                                loadFiltered={(filter) => this.loadFiltered(filter)}/>}/>
                    <Route exact path='/todos/create' component={() => <ToDoForm
                        createToDo={(text, author, project, is_active) => this.createToDo(text, author, project, is_active)}
                        authors={this.state.users} projects={this.state.projects}/>}/>
                    <Route exact path='/todos' component={() => <ToDoList todos={this.state.todos}
                                                                          deleteToDo={(id) => this.deleteToDo(id)}/>}/>
                    <Route exact path='/login' component={() => <LoginForm
                        get_token={(username, password) => this.getToken(username, password)}/>}/>
                    <Route component={NotFound404}/>
                </Switch>
            </BrowserRouter>
        </div>)
    }
}

export default App;