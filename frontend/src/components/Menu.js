import {Link} from "react-router-dom";
import React from "react";

class TopMenu extends React.Component {
    render() {
        return (<menu>
            <li>
                <Link to='/'>Users</Link>
            </li>
            <li>
                <Link to='/projects'>Projects</Link>
            </li>
            <li>
                <Link to='/todos'>Todos</Link>
            </li>
            <li>
                {this.props.is_authenticated() ? <button onClick={() => this.props.logout()}>Logout</button> :
                    <Link to='/login'>Login</Link>}
            </li>
        </menu>);
    }
}

export default TopMenu