import * as React from 'react';
import { Table, Button, ButtonGroup} from 'reactstrap';
import AddDeptModal from './PopUp Modals/AddDeptModal'

export default class Department extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        depts: [],
        modelOpened: false
    }

    toggleModel = () => this.setState(state => ({
        depts: [...state.depts],
        modelOpened: !state.modelOpened
    }));

    refreshDepartmentsList = () => {
        fetch(process.env.REACT_APP_API + "department")
            .then(response => response.json())
            .then(data => {
                this.setState({depts: data});
            });
    }

    componentDidMount() {
        this.refreshDepartmentsList();
        console.log(this.state.depts);
        console.log(process.env.REACT_APP_API);
    }

    componentDidUpdate() {
        this.refreshDepartmentsList();
    }

    render() {
        const departments = this.state.depts;

        return(
            <div className="mt-5 d-flex flex-column justify-content-center">
                <h2 className="txt-secondary" role="caption">
                    Table of Departments
                </h2>
                    
                <Table striped hover bordered responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Department name</th>
                            <th>Options</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            departments.map((department, idx) => 
                                (
                                    <tr key={idx}>
                                        <td>{department.DepartmentId}</td>
                                        <td>{department.DepartmentName}</td>
                                        <td>Edit | Delete</td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </Table>
                
                <Button color="primary" onClick={this.toggleModel} size="lg">Add a new department</Button> 
                <AddDeptModal isOpen={this.state.modelOpened} toggle={this.toggleModel} />
            </div>
        )
    }
}
