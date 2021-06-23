import * as React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavbarToggler, Collapse} from 'reactstrap';

export default class Navigation extends React.Component {
    
    state = {
        isNavColapsed: false
    }

    toggle = () => this.setState((state) => 
        ({isNavColapsed: !state.isNavColapsed}))

    render() {
        return(
            <Navbar className="bg-primary justify-content-center" light expand="md">
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isNavColapsed} navbar>
                    <Nav className="d-flex justify-content-center" navbar>
                        <Link className="d-inline p-2 text-white" to="/">
                            Home
                        </Link>
                        
                        <Link className="d-inline p-2 text-white" to="/department">
                            Department
                        </Link>

                        <Link className="d-inline p-2 text-white" to="/employee">
                            Employee
                        </Link>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}
