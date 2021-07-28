// import * as React from 'react';
// import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Form, Label, Input, Button} from 'reactstrap';

// export default class EditDeptModal extends React.Component {
//     constructor(props) {
//         super(props);
//         this.props = props;

//         this.onInputChange = this.onInputChange.bind(this);
//     }

//     state = {
//         inputValue: this.props.model.DepartmentName
//     }

//     onInputChange (evt) {
//         this.setState({inputValue: evt.target.value})
//     }

//     editDepartment = (evt) => {
//         evt.preventDefault();

//         if(this.state.inputValue === '') {
//             alert("You can't send a department without a name")
//         }

//         else {
//             //AJAX Post method:
//             fetch(process.env.REACT_APP_API + "department", {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({"DepartmentId": this.props.model.DepartmentId, "DepartmentName": this.state.inputValue})
//             })
//                 .then(response => response.json())
//                 .then(result => { 
//                     alert("Department Edited!");
//                     this.props.toggle();
//                 })
//                 .catch(error => { alert("Ups! something went worng...\n" + error) })    
//         }
//     }

//     render() {
        
//         return (
//             <div className="container">

//                 <Modal {...this.props} centered size="lg">
                
//                     <ModalHeader>
//                         Edit department
//                     </ModalHeader>
                    
//                     <ModalBody>
//                         <Form onSubmit={this.editDepartment}>
//                             <Row>
//                                 <Col sm={6}>
//                                     <Label for="inputDepartmentId">ID: </Label>
//                                     <Input type="text" disabled id="inputDepartmentId" value={this.props.model.DepartmentId} />
//                                     <br />
//                                     <Label for="inputDepartmentName">Department name:</Label>
//                                     <Input type="text" id="inputDepartmentName" onChange={this.onInputChange} value={this.state.inputValue} placeholder="New department name" /> {/* I'll use JQuery for validatio now i'm using this form */}
//                                     <br />
//                                     <Button color="info">Edit department</Button>
//                                 </Col>
//                             </Row>
//                         </Form>
//                     </ModalBody>
                    
//                     <ModalFooter>
//                         <Button color="danger" onClick={this.props.toggle}>Close</Button>
//                     </ModalFooter>

//                 </Modal>

//             </div>
//         );
//     }
// }

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateDepartmentThunk, lookDepartmentById } from '../departmentsSlice'
import {
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Row, 
    Col, 
    Form, 
    Label, 
    Input, 
    Button
} from 'reactstrap';

const EditDeptModal = (props) => {
    const dispatch = useDispatch()

    const departmentToEdit = useSelector(state => 
        lookDepartmentById(state, props.targetid)
    )
    const { DepartmentId, DepartmentName } = departmentToEdit || ''
    const [inputDptName, setInputDptName] = useState(DepartmentName)
    
    useEffect(() => {
        setInputDptName(DepartmentName)
    }, [DepartmentName])

    const onInputChange = (e) => {
        setInputDptName(e.target.value)
    }

    const updateDepartment = (e) => {
        e.preventDefault()
        dispatch(updateDepartmentThunk({
            DepartmentId: DepartmentId,
            DepartmentName: inputDptName
        }))
        props.toggle()
    }

    return (
        <div className="container">

            <Modal {...props} centered size="lg">
            
                <ModalHeader>
                    Edit department
                </ModalHeader>
                
                <ModalBody>
                    <Form onSubmit={updateDepartment}>
                        <Row>
                            <Col sm={6}>
                                <Label for="inputDepartmentId">ID:</Label>
                                <Input 
                                    type="text" 
                                    id="inputDepartmentId"
                                    name="inputDepartmentId"
                                    required
                                    disabled
                                    value={DepartmentId} 
                                />

                                <Label for="inputDepartmentName">Department name:</Label>
                                <Input 
                                    type="text" 
                                    id="inputDepartmentName"
                                    name="inputDepartmentName"
                                    required
                                    maxLength={500}
                                    onChange={onInputChange} 
                                    value={inputDptName} 
                                    placeholder="ITexample" 
                                />
                                <br />
                                <Button color="info">Add department</Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                
                <ModalFooter>
                    <Button color="danger" onClick={props.toggle}>Close</Button>
                </ModalFooter>

            </Modal>

        </div>
    )
}

export default EditDeptModal