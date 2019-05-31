import React, { Component } from 'react'
import { Alert, Container, Row, Col, Table, FormGroup, Input, Label, Button, Form } from 'reactstrap'

class MapsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maps: [],
            editing: false,
            editingRecord: null,
            deleteRecordMessage: false,
            newRecordMessage: false
        }
        $('li').removeClass('active');
        $('.maps').addClass('active');
    }

    createNew() {
        this.setState({
            editing: false,
            latitude: "",
            longitude: "",
            pop_up_text: ""
        })
    }

    createNewRecord() {
        let latitude = this.state.latitude;
        let longitude = this.state.longitude;
        let pop_up_text = this.state.pop_up_text;

        let csrfToken = $("meta[name='csrf-token']").attr("content");

        let params = {
            latitude,
            longitude,
            pop_up_text
        }

        fetch('/api/v1/maps', {
            method: 'POST',
            headers: {
                'X-CSRF-Token': csrfToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    maps: data,
                    newRecordMessage: true
                });
                setTimeout(() => this.setState({
                    newRecordMessage: false
                }), 2000);

            })
            .catch(error => {

            })
    }

    editMapRecord(map) {
        this.setState({
            editing: true,
            editingRecord: map.id,
            latitude: map.latitude,
            longitude: map.longitude,
            pop_up_text: map.pop_up_text
        });
    }

    editRecord() {
        let latitude = this.state.latitude;
        let longitude = this.state.longitude;
        let pop_up_text = this.state.pop_up_text;

        let csrfToken = $("meta[name='csrf-token']").attr("content");

        let params = {
            latitude,
            longitude,
            pop_up_text
        }

        fetch('/api/v1/maps/' + this.state.editingRecord, {
            method: 'PUT',
            headers: {
                'X-CSRF-Token': csrfToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    maps: data,
                    newRecordMessage: true
                });
                setTimeout(() => this.setState({
                    newRecordMessage: false
                }), 2000);

            })
            .catch(error => {

            })
    }

    handleInputChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    fetchMapRecords() {
        fetch(`/api/v1/maps`, {
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let errorMessage = `${response.status} (${response.statusText})`,
                        error = new Error(errorMessage);
                    throw (error);
                }
            })
            .then(response => response.json())
            .then(body => {
                this.setState({ maps: body })
            })
            .catch(error => console.error(`Error in fetch: ${error.message}`));
    }


    componentDidMount() {
        this.fetchMapRecords()
    }

    deleteMapRecord(id) {
        fetch(`/api/v1/maps/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    maps: data,
                    deleteRecordMessage: true
                });
                setTimeout(() => this.setState({
                    deleteRecordMessage: false
                }), 2000);
            })

    }

    render() {
        let maps = this.state.maps;

        return (
            <Container className="container-body pt-2">
                <h4>Maps</h4>
                <Row>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Text</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {maps.map((m) =>
                                <tr key={m.id}>
                                    <th scope="row">{m.id}</th>
                                    <td>{m.latitude}</td>
                                    <td>{m.longitude}</td>
                                    <td>{m.pop_up_text}</td>
                                    <td>
                                        <Button size="sm" onClick={() => this.editMapRecord(m)}>Edit</Button>
                                        <Button className="deleteButton" size="sm" onClick={() => this.deleteMapRecord(m.id)}>Delete</Button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </Table>
                    <Alert color="success" className={this.state.deleteRecordMessage ? "" : "d-none"}>Record successfully deleted</Alert>
                    <Button color="success" size="sm" onClick={() => this.createNew()}>Create new</Button>
                </Row>

                <hr></hr>
                <Row>
                    <Col sm={12}>
                        <h4>{this.state.editing ? "Edit Record" : "Add Record"} </h4>
                    </Col>
                    <Form>
                        <FormGroup>
                            <Label for="latitude">Latitude</Label>
                            <Input type="text" name="latitude" id="latitude" placeholder="Latitude" onChange={(event) => this.handleInputChange(event)} value={this.state.latitude} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="longitude">Longitude</Label>
                            <Input type="text" name="longitude" id="longitude" placeholder="Longitude" onChange={(event) => this.handleInputChange(event)} value={this.state.longitude} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="pop_up_text">Pop-up Text</Label>
                            <Input type="text" name="pop_up_text" id="pop_up_text" placeholder="Pop-up Text" onChange={(event) => this.handleInputChange(event)} value={this.state.pop_up_text} />
                        </FormGroup>
                        <Alert color="success" className={this.state.newRecordMessage ? "" : "d-none"}>Record successfully {this.state.editing ? "edited" : "updated"}</Alert>
                        {this.state.editing ? <Button color="success" size="sm" onClick={() => this.editRecord()}>Update</Button> :
                            <Button color="success" size="sm" onClick={() => this.createNewRecord()}>Add</Button>}
                    </Form>
                </Row>
            </Container>
        )
    }
}

export default MapsContainer;