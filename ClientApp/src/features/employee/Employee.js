import * as React from 'react';
import { Table, Button, ButtonToolbar, ButtonGroup} from 'reactstrap';
import AddEmpModal from './PopUp modals/AddEmpModal';
import EditEmpModal from './PopUp modals/EditEmpModal';

export default class Employee extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        emps: [],
        modalAddOpened: false,
        modalEditOpened: false,
        targetToEdit: {}
    }

    toggleAddModal = () => this.setState(state => ({
        modalAddOpened: !state.modalAddOpened
    }));

    toggleEditModal = () => this.setState(state => ({
        modalEditOpened: !state.modalEditOpened
    }));

    enterEditMode = (model) => {
        console.log(model)
        this.setState({targetToEdit: model});
        this.toggleEditModal();
    }

    enterDeleteMode = (model) => {
        if(window.confirm("Are you sure you want to delete this employee? (This action can't be undone)")) {
            this.deleteEmployee(model.EmployeeId);
            this.refreshDepartmentsList();
        }
    }
    
    deleteEmployee = (targetId) => {
        fetch(process.env.REACT_APP_API + "employee/" + `${targetId}`, {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'}
        })
            .then(response => response.json())
            .catch(error => alert(error));
    }

    refreshEmployeesList = () => {
        fetch(process.env.REACT_APP_API + "employee")
            .then(response => response.json())
            .then(data => {
                this.setState({emps: data});
            });
    }

    componentDidMount() {
        this.refreshEmployeesList();
    }

    componentDidUpdate() {
        this.refreshEmployeesList();
    }

    render() {
        const employees = this.state.emps;

        return(
            <div className="mt-5 d-flex flex-column justify-content-center">
                <h2 className="txt-secondary" role="caption">
                    Table of Employees
                </h2>
                    
                <Table striped hover bordered responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Employee name</th>
                            <th>Department</th>
                            <th>Date of Join</th>
                            <th>Options</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            employees.map((employee, idx) => 
                                (
                                    <tr key={idx}>
                                        <td>{employee.EmployeeId}</td>
                                        <td>{employee.EmployeeName}</td>
                                        <td>{employee.Department}</td>
                                        <td>{employee.DateOfJoining}</td>
                                       
                                        {/* Employee actions */}
                                        <td>

                                            <ButtonToolbar>
                                                <ButtonGroup size="sm">
                                                    <Button color="info" outline onClick={this.enterEditMode.bind(this, employee)}>Edit</Button>
                                                    <Button color="danger" outline onClick={this.enterDeleteMode.bind(this, employee)}>Delete</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>

                                        </td>
                                   
                                    </tr>
                                ))
                        }
                    </tbody>
                </Table>
                
                <Button className="mb-5" color="primary" onClick={this.toggleAddModal} size="lg">Add a new employee</Button> 
                
                {/* Pop up Add modal */}
                <AddEmpModal isOpen={this.state.modalAddOpened} toggle={this.toggleAddModal} />
                <EditEmpModal isOpen={this.state.modalEditOpened} toggle={this.toggleEditModal} model={this.state.targetToEdit} />
            </div>
        )
    }
}
