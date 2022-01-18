import React from "react";

const UserItem = ({user}) => {
    return (<tr>
        <td>
            {user.uname}
        </td>
        <td>
            {user.firstname}
        </td>
        <td>
            {user.lastname}
        </td>
        <td>
            {user.e_mail}
        </td>
    </tr>)
}

const UserList = ({users}) => {
    return (<table>
        <th>
            username
        </th>
        <th>
            first name
        </th>
        <th>
            last name
        </th>
        <th>
            email
        </th>
        {users.map((user) => <UserItem user={user}/>)}
    </table>)
}

export default UserList