import React from "react";
import "./App.css";
import axios from "axios";
import UserList from "./components/User.js";
import ProjectList from "./components/Project";
import ToDoList from "./components/ToDo";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import TopMenu from "./components/Menu";
import LoginForm from "./components/Auth";
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
            'users': [],
            'projects': [],
            'todos': [],
            'token': ''
        }
    }

    componentDidMount() {
        this.get_token_from_storage();
    }


    set_token(token) {
        const cookies = new Cookies();
        cookies.set('token', token);
        this.setState({'token': token},
            () => this.load_data())
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        this.setState({'token': token},
            () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username, password: password
        })
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(() => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        };
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers();
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data;
                this.setState({'users': users.results})
            }).catch(error => {
            console.log(error);
            this.setState({'users': []})
        });
        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data;
                this.setState({'projects': projects.results})
            }).catch(error => {
            console.log(error);
            this.setState({'projects': []})
        });
        axios.get('http://127.0.0.1:8000/api/todos/', {
            headers
        })
            .then(response => {
                const todos = response.data;
                this.setState({'todos': todos.results})
            }).catch(error => {
            console.log(error);
            this.setState({'todos': []})
        });
    }


    render() {
        return (<div className="App">
            <BrowserRouter>
                <TopMenu is_authenticated={() => this.is_authenticated()} logout={() => this.logout()}/>
                <Switch>
                    <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                    <Route exact path='/todos' component={() => <ToDoList todos={this.state.todos}/>}/>
                    <Route exact path='/login' component={() => <LoginForm
                        get_token={(username, password) => this.get_token(username, password)}/>}/>
                    <Route component={NotFound404}/>
                </Switch>
            </BrowserRouter>
        </div>)
    }
}

export default App;