import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function NewEvent(props) {
    const {
        title: defTitle = '',
        description: defDescription = '',
        date: defDate = (new Date()).getTime().toString(),
        location: defLocation = '',
        orgOnly: defOrgOnly = false,
        id
    } = props.event;
    const [title, setTitle] = useState(defTitle);
    const [description, setDescription] = useState(defDescription);
    const [date, setDate] = useState(new Date(parseInt(defDate, 10)));
    const [location, setLocation] = useState(defLocation);
    const [orgOnly, setOrgOnly] = useState(defOrgOnly);
    return (
        <Modal show={true} onHide={() => props.close()}>
            <Modal.Header closeButton>
                <Modal.Title>Add new ship</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        placeholder="Dance party"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        style={{marginBottom: '1rem'}}
                        label="Title"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        placeholder="Port Olisar"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        style={{marginBottom: '1rem'}}
                        label="Title"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        placeholder="Disco dance off"
                        as="textarea"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        style={{marginBottom: '1rem'}}
                    />
                    <Form.Text className="text-muted">
                        <a
                            href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Markdown supported
                        </a>
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <DatePicker
                        className="form-control"
                        wrapperClassName="block"
                        selected={date}
                        onChange={date => setDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </Form.Group>
                <Form.Check
                    // custom
                    type="checkbox"
                    label="Org only event"
                    checked={orgOnly}
                    onChange={(event) => setOrgOnly(event.target.checked)}
                />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.close()}>Close</Button>
                <Button
                    variant="primary"
                    disabled={false}
                    onClick={() => props.save({
                        id,
                        title,
                        description,
                        date: date.getTime().toString(),
                        location,
                        orgOnly
                    })}
                >
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
