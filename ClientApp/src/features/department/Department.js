import * as React from 'react';
import { Table, Button, ButtonToolbar, ButtonGroup} from 'reactstrap';
import AddDeptModal from './PopUp modals/AddDeptModal';
import EditDeptModal from './PopUp modals/EditDeptModal';

export default class Department extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        depts: [],
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
        this.setState({targetToEdit: model});
        this.toggleEditModal();
    }

    enterDeleteMode = (model) => {
        if(window.confirm("Are you sure you want to delete this department? (This action can't be undone)")) {
            this.deleteDepartment(model.DepartmentId);
            this.refreshDepartmentsList();
        }
    }
    
    deleteDepartment = (targetId) => {
        fetch(process.env.REACT_APP_API + "department/" + `${targetId}`, {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'}
        })
            .then(response => response.json())
            .catch(error => alert(error));
    }

    refreshDepartmentsList = () => {
        fetch(process.env.REACT_APP_API + "department")
            .then(response => response.json())
            .then(data => {
                this.setState({depts: data});
            });
    }

    componentDidMount() {
        this.refreshDepartmentsList();
        // console.log(this.state.depts);
        // console.log(process.env.REACT_APP_API);
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
                                       
                                        {/* Department actions */}
                                        <td>

                                            <ButtonToolbar>
                                                <ButtonGroup size="sm">
                                                    <Button color="info" outline onClick={this.enterEditMode.bind(this, department)}>Edit</Button>
                                                    <Button color="danger" outline onClick={this.enterDeleteMode.bind(this, department)}>Delete</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>

                                        </td>
                                   
                                    </tr>
                                ))
                        }
                    </tbody>
                </Table>
                
                <Button className="mb-5" color="primary" onClick={this.toggleAddModal} size="lg">Add a new department</Button> 
                
                {/* Pop up Add modal */}
                <AddDeptModal isOpen={this.state.modalAddOpened} toggle={this.toggleAddModal} />
                <EditDeptModal isOpen={this.state.modalEditOpened} toggle={this.toggleEditModal} model={this.state.targetToEdit} />
            </div>
        )
    }
}
