import * as React from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav, NavbarToggler, Collapse} from 'reactstrap';

export default class Navigation extends React.Component {


    state = {
        isNavColapsed: false
    }

    toggle = () => this.setState((state) => 
        ({isNavColapsed: !state.isNavColapsed}))

    render() {
        return(
            <Navbar className="bg-primary justify-content-center" dark expand="md">
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isNavColapsed} navbar>
                    <Nav className="justify-content-center" navbar>
                        <NavLink className="d-inline p-2 text-white" to="/">
                            Home
                        </NavLink>
                        
                        <NavLink className="d-inline p-2 text-white" to="/department">
                            Department
                        </NavLink>

                        <NavLink className="d-inline p-2 text-white" to="/employee">
                            Employee
                        </NavLink>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}
