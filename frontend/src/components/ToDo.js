import React from "react";
import {Link} from "react-router-dom";

const ToDoItem = ({todo, deleteToDo}) => {
    // noinspection JSUnresolvedVariable
    return (<tr>
        <td>
            {todo.text}
        </td>
        <td>
            {todo.cr_date}
        </td>
        <td>
            {todo.upd_date}
        </td>
        <td>
            <input type='checkbox' checked={todo.is_active} name='controlled' readOnly='True'/>
        </td>
        <td>
            {todo.project}
        </td>
        <td>
            {todo.author}
        </td>
        <td>
            <button onClick={() => deleteToDo(todo.id)} type='button'>Delete</button>
        </td>
    </tr>)
};

const ToDoList = ({todos, deleteToDo}) => {
    return (<div>
        <table>
            <thead>
            <tr>
                <th>
                    text
                </th>
                <th>
                    creation date
                </th>
                <th>
                    last update
                </th>
                <th>
                    active
                </th>
                <th>
                    project
                </th>
                <th>
                    author
                </th>
            </tr>
            </thead>
            <tbody>
            {todos.map((todo, i) => <ToDoItem todo={todo} deleteToDo={deleteToDo} key={i}/>)}
            </tbody>
        </table>
        <Link to={'/todos/create'}>Create</Link>
    </div>)
};

export default ToDoList