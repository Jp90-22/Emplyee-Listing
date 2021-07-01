import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Form, Label, Input, Button, FormGroup } from 'reactstrap';

export default class EditEmpModal extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    state = {
        deptNames: []
    }

    photoThumbnail = "anonymous.jpg" 
    imageSrc = process.env.REACT_APP_PHOTOSPATH + this.photoThumbnail;

    componentDidMount() {
        // Get all deartment names for make a multiple options in form 
        fetch(process.env.REACT_APP_API + "employee/GetDepartmentNames")
            .then(response => response.json())
            .then(data => this.setState({deptNames: data}))
            .catch(error => alert(error))
    }

    editEmployee = (evt) => {
        evt.preventDefault();

        //AJAX Post method:
        fetch(process.env.REACT_APP_API + "employee", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                EmployeeId: evt.target.inputEmployeeId.value,
                EmployeeName: evt.target.inputEmployeeName.value,
                Department: evt.target.inputDepartmentName.value,
                DateOfJoining: evt.target.pickerDateOfJoining.value,
                PhotoFileName: this.photoThumbnail
            })
        })
            .then(response => response.json())
            .then(result => { alert("Employee edited!"); this.props.toggle(); })
            .catch(error => { alert("Ups! something went worng...\n" + error) })
    }

    handleFileSelected = (evt) => {
        evt.preventDefault();
        this.photoThumbnail = evt.target.files[0].name;

        const formData = new FormData();
        formData.append("myFile", evt.target.files[0], evt.target.files[0].name);

        fetch(process.env.REACT_APP_API + "employee/SaveFiles", {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                this.imageSrc = process.env.REACT_APP_PHOTOSPATH + result
            })
            .catch(error => alert(error));
    }

    render() {
        
        return (
            <div className="container">

                <Modal {...this.props} centered size="lg">
                
                    <ModalHeader>
                        Edit employee
                    </ModalHeader>
                    
                    <ModalBody>
                        <Form onSubmit={this.editEmployee}>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label for="inputEmployeeId">Employee ID:</Label>
                                        <Input type="text" id="inputEmployeeId" value={this.props.model.EmployeeId} disabled required /> {/* I'll use JQuery for validatio now i'm using this form */}
                                     </FormGroup>

                                    <FormGroup>
                                        <Label for="inputEmployeeName">Employee name:</Label>
                                        <Input type="text" id="inputEmployeeName" placeholder="ITexample" required /> {/* I'll use JQuery for validatio now i'm using this form */}
                                     </FormGroup>

                                    <FormGroup>
                                        <Label for="inputDepartmentName">Department:</Label>
                                        <Input type="select" id="inputDepartmentName">
                                            {this.state.deptNames.map((deptName, idx) => <option key={idx}>{deptName.["Employee's Department"]}</option>)} 
                                        </Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="pickerDateOfJoining">Date of Joining:</Label>
                                        <Input type="date" id="pickerDateOfJoining" required /> {/* I'll use JQuery for validatio now i'm using this form */}
                                     </FormGroup>


                                    <Button color="info">Edit employee</Button>
                                </Col>

                                <Col sm={6}> 
                                    <img src={this.imageSrc} width="200px" height="200px" />
                                    <Input type="file" onChange={this.handleFileSelected} required />
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
