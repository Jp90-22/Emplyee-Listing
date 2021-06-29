import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Form, Label, Input, Button} from 'reactstrap';

export default class EditEmpModal extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.onInputChange = this.onInputChange.bind(this);
    }

    state = {
        inputValue: this.props.model.EmployeeName
    }

    onInputChange (evt) {
        this.setState({inputValue: evt.target.value})
    }

    editDepartment = (evt) => {
        evt.preventDefault();

        if(this.state.inputValue === '') {
            alert("You can't send an employee without a name")
        }

        else {
            //AJAX Post method:
            fetch(process.env.REACT_APP_API + "employee", {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"DepartmentId": this.props.model.DepartmentId, "DepartmentName": this.state.inputValue})
            })
                .then(response => response.json())
                .then(result => { 
                    alert("Employee Edited!");
                    this.props.toggle();
                })
                .catch(error => { alert("Ups! something went worng...\n" + error) })    
        }
    }

    render() {
        
        return (
            <div className="container">

                <Modal {...this.props} centered size="lg">
                
                    <ModalHeader>
                        Edit employee
                    </ModalHeader>
                    
                    <ModalBody>
                        <Form onSubmit={this.editDepartment}>
                            <Row>
                                <Col sm={6}>
                                    <Label for="inputDepartmentId">ID: </Label>
                                    <Input type="text" disabled id="inputDepartmentId" value={this.props.model.DepartmentId} />
                                    <br />
                                    <Label for="inputDepartmentName">Employee name:</Label>
                                    <Input type="text" id="inputDepartmentName" onChange={this.onInputChange} value={this.state.inputValue} placeholder="New department name" /> {/* I'll use JQuery for validatio now i'm using this form */}
                                    <br />
                                    <Button color="info">Edit department</Button>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button color="danger" onClick={this.props.toggle}>Close</Button>
                    </ModalFooter>

                </Modal>

            </div>
        );
    }
}
