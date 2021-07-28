// import * as React from 'react';
// import { Table, Button, ButtonToolbar, ButtonGroup} from 'reactstrap';
// import AddDeptModal from './PopUp modals/AddDeptModal';
// import EditDeptModal from './PopUp modals/EditDeptModal';

// export default class Department extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     state = {
//         depts: [],
//         modalAddOpened: false,
//         modalEditOpened: false,
//         targetToEdit: {}
//     }

//     toggleAddModal = () => this.setState(state => ({
//         modalAddOpened: !state.modalAddOpened
//     }));

//     toggleEditModal = () => this.setState(state => ({
//         modalEditOpened: !state.modalEditOpened
//     }));

//     enterEditMode = (model) => {
//         this.setState({targetToEdit: model});
//         this.toggleEditModal();
//     }

//     enterDeleteMode = (model) => {
//         if(window.confirm("Are you sure you want to delete this department? (This action can't be undone)")) {
//             this.deleteDepartment(model.DepartmentId);
//             this.refreshDepartmentsList();
//         }
//     }
    
//     deleteDepartment = (targetId) => {
//         fetch(process.env.REACT_APP_API + "department/" + `${targetId}`, {
//             method: 'DELETE',
//             headers: {'Content-type': 'application/json'}
//         })
//             .then(response => response.json())
//             .catch(error => alert(error));
//     }

//     refreshDepartmentsList = () => {
//         fetch(process.env.REACT_APP_API + "department")
//             .then(response => response.json())
//             .then(data => {
//                 this.setState({depts: data});
//             });
//     }

//     componentDidMount() {
//         this.refreshDepartmentsList();
//         // console.log(this.state.depts);
//         // console.log(process.env.REACT_APP_API);
//     }

//     componentDidUpdate() {
//         this.refreshDepartmentsList();
//     }

//     render() {
//         const departments = this.state.depts;

//         return(
        //     <div className="mt-5 d-flex flex-column justify-content-center">
        //         <h2 className="txt-secondary" role="caption">
        //             Table of Departments
        //         </h2>
                    
        //         <Table striped hover bordered responsive>
        //             <thead>
        //                 <tr>
        //                     <th>ID</th>
        //                     <th>Department name</th>
        //                     <th>Options</th>
        //                 </tr>
        //             </thead>

        //             <tbody>
        //                 {
        //                     departments.map((department, idx) => 
        //                         (
        //                             <tr key={idx}>
        //                                 <td>{department.DepartmentId}</td>
        //                                 <td>{department.DepartmentName}</td>

        //                                 {/* Department actions */}
        //                                 <td>

        //                                     <ButtonToolbar>
        //                                         <ButtonGroup size="sm">
        //                                             <Button color="info" outline onClick={this.enterEditMode.bind(this, department)}>Edit</Button>
        //                                             <Button color="danger" outline onClick={this.enterDeleteMode.bind(this, department)}>Delete</Button>
        //                                         </ButtonGroup>
        //                                     </ButtonToolbar>

        //                                 </td>
                                    
        //                             </tr>
        //                         ))
        //                 }
        //             </tbody>
        //         </Table>
                
        //         <Button className="mb-5" color="primary" onClick={this.toggleAddModal} size="lg">Add a new department</Button> 
                
        //         {/* Pop up Add modal */}
        //         <AddDeptModal isOpen={this.state.modalAddOpened} toggle={this.toggleAddModal} />
        //         <EditDeptModal isOpen={this.state.modalEditOpened} toggle={this.toggleEditModal} model={this.state.targetToEdit} />
        //     </div>
        // )
//     }
// }

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getDepartmentsThunk,
    deleteDepartmentThunk,
    getDeparments,
    selectStateStatus
} from './departmentsSlice'

import { 
    Table, 
    Button, 
    ButtonToolbar, 
    ButtonGroup
} from 'reactstrap';
import { AbsoluteCentralizedSpinner } from '../../app/Spinners'
import AddDeptModal from './PopUp modals/AddDeptModal';
import EditDeptModal from './PopUp modals/EditDeptModal';

const Department = () => {
    const dispatch = useDispatch()
    
    const departments = useSelector(getDeparments)
    const departmentStateStatus = useSelector(selectStateStatus)
    const error = useSelector(state => state.Department.error)

    const [canGetDepartments, setCanGetDepartments] = useState(false)
    const [modalAddOpened, setModalAddOpened] = useState(false)
    const [modalEditOpened, setModalEditOpened] = useState(false)
    const [departmentToEdit, setDepartmentToEdit] = useState(null)
    
    // Handling Popup modals events (Pop up and Pop out)
    const enterAddMode = () => { 
        setModalAddOpened(!modalAddOpened)
    }

    const exitAddMode = () => { 
        setModalAddOpened(!modalAddOpened)
        setCanGetDepartments(true) 
    }

    const enterEditMode = (DepartmentId) => {
        setDepartmentToEdit(DepartmentId)
        setModalEditOpened(!modalEditOpened)
    }

    const exitEditMode = () => { 
        setModalEditOpened(!modalEditOpened)
        setCanGetDepartments(true) 
    }

    const enterDeleteMode = (DepartmentId) => {
        if(window.confirm("Are you sure you want to delete this department? (This action can't be undone)")) {
            dispatch(deleteDepartmentThunk(DepartmentId))
        }

        setCanGetDepartments(true)
    }

    // Dispatching, getting, and redering data
    useEffect(() => {
        setCanGetDepartments(true)
    }, [])

    useEffect(() => {
        if (canGetDepartments) {
            dispatch(getDepartmentsThunk())
            setCanGetDepartments(false)
        } 
    }, [canGetDepartments, dispatch])

    let tableRows
    if (departments) {
        tableRows = departments.map(
            (department, idx) => (
                <tr key={idx}>
                    <td>{department.DepartmentId}</td>
                    <td>{department.DepartmentName}</td>

                    {/* Department actions */}
                    <td>
                        <ButtonToolbar>
                            <ButtonGroup size="sm">
                                <Button color="info" outline onClick={() => enterEditMode(department.DepartmentId)}>Edit</Button>
                                <Button color="danger" outline onClick={() => enterDeleteMode(department.DepartmentId)}>Delete</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </td>
                </tr>
            )
        )
    }
    
    if (departmentStateStatus === 'rejected') {
        alert("Something went worng!\n" + error.message)
    }

    return (
        <div className="mt-5 d-flex flex-column justify-content-center">
            <h2 className="txt-secondary">
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
                    {tableRows}
                </tbody>
            </Table>
            
            <Button className="mb-5" color="primary" size="lg" onClick={enterAddMode}>Add a new department</Button> 
            
            {/* Pop up Add modal */}
            <AddDeptModal isOpen={modalAddOpened} toggle={exitAddMode} />
            <EditDeptModal isOpen={modalEditOpened} toggle={exitEditMode} targetid={departmentToEdit} />

            {(departmentStateStatus === 'pending')? <AbsoluteCentralizedSpinner /> : null}
        </div>
    )
}

export default Department
