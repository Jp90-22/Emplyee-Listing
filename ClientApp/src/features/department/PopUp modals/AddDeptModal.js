// import * as React from 'react';
// import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Form, Label, Input, Button} from 'reactstrap';

// export default class AddDeptModal extends React.Component {
//     constructor(props) {
//         super(props);
//         this.props = props;

//         this.onInputChange = this.onInputChange.bind(this);
//     }

//     state = {
//         inputValue: ''
//     }

//     onInputChange (evt) {
//         this.setState({inputValue: evt.target.value})
//     }

//     addNewDepartment = (evt) => {
//         evt.preventDefault();

//         if(this.state.inputValue === '') {
//             alert("You can't send a department without a name")
//         }

//         else {
//             //AJAX Post method:
//             fetch(process.env.REACT_APP_API + "department", {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({"DepartmentName": this.state.inputValue})
//             })
//                 .then(response => response.ok)
//                 .then(result => { alert("Department in!") })
//                 .catch(error => { alert("Ups! something went worng...\n" + error) })
//         }
//     }

//     render() {
        
//         return (
            // <div className="container">

            //     <Modal {...this.props} centered size="lg">
                
            //         <ModalHeader>
            //             Add a new department
            //         </ModalHeader>
                    
            //         <ModalBody>
            //             <Form onSubmit={this.addNewDepartment}>
            //                 <Row>
            //                     <Col sm={6}>
            //                         <Label for="inputDepartmentName">Department name:</Label>
            //                         <Input type="text" id="inputDepartmentName" onChange={this.onInputChange} value={this.state.inputValue} placeholder="ITexample" /> {/* I'll use JQuery for validatio now i'm using this form */}
            //                         <br />
            //                         <Button color="info">Add department</Button>
            //                     </Col>
            //                 </Row>
            //             </Form>
            //         </ModalBody>
                    
            //         <ModalFooter>
            //             <Button color="danger" onClick={this.props.toggle}>Close</Button>
            //         </ModalFooter>

            //     </Modal>

            // </div>
//         );
//     }
// }

import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { postDepartmentThunk } from '../departmentsSlice'
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

const AddDeptModal = (props) => {
    const dispatch = useDispatch()

    const [inputDptName, setInputDptName] = useState('')

    const onInputChange = (e) => {
        setInputDptName(e.target.value)
    }

    const addNewDepartment = (e) => {
        e.preventDefault()
        dispatch(postDepartmentThunk({ DepartmentName: inputDptName}))
        props.toggle()
    }

    return (
        <div className="container">

            <Modal {...props} centered size="lg">
            
                <ModalHeader>
                    Add a new department
                </ModalHeader>
                
                <ModalBody>
                    <Form onSubmit={addNewDepartment}>
                        <Row>
                            <Col sm={6}>
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

export default AddDeptModal
