import React from "react";
import "./App.css";
import axios from "axios";
import UserList from "./components/User.js";
import ProjectList from "./components/Project";
import ToDoList from "./components/ToDo";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import TopMenu from "./components/Menu";

const NotFound404 = ({ location }) => {
  return(
      <div>
          <h1>Page '{location.pathname}' not found</h1>
      </div>
  )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [], 'projects': [], 'todos': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                this.setState({'users': users.results})
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data
                this.setState({'projects': projects.results})
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todos')
            .then(response => {
                const todos = response.data
                this.setState({'todos': todos.results})
            }).catch(error => console.log(error))
    }

    render() {
        return (<div className="App">
            <BrowserRouter>
                <TopMenu/>
                <Switch>
                    <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                    <Route exact path='/todos' component={() => <ToDoList todos={this.state.todos}/>}/>
                    <Route component={NotFound404}/>
                </Switch>
            </BrowserRouter>
        </div>)
    }
}

export default App;