import React from "react";

const ToDoItem = ({todo}) => {
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
            {todo.is_active.toString()}
        </td>
        <td>
            {todo.project}
        </td>
        <td>
            {todo.author}
        </td>
    </tr>)
};

const ToDoList = ({todos}) => {
    return (<table>
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
        {todos.map((todo, i) => <ToDoItem todo={todo} key={i}/>)}
        </tbody>
    </table>)
};

export default ToDoList