import React, { useState, useEffect } from 'react';
import api from '../services/axios-instance';
import dayjs from 'dayjs';
import {
    Table, Modal, Button, Form, InputGroup, FormControl, Pagination
} from 'react-bootstrap';

const ITEMS_PER_PAGE = 5;

export default function EventsList() {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [mode, setMode] = useState('create');
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState({
        title: '', description: '', date: '', location: '', organizerId: ''
    });
    const [showDel, setShowDel] = useState(false);

    // Función de carga de eventos
    async function fetchEvents() {
        const res = await api.get('/events');
        setEvents(res.data);
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const filtered = events.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.location.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const current = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    function handleSearch(e) {
        setSearch(e.target.value);
        setPage(1);
    }
    function selectPage(n) {
        setPage(n);
    }

    function openCreate() {
        setMode('create');
        setForm({ title: '', description: '', date: '', location: '', organizerId: '' });
        setShowForm(true);
    }
    function openEdit(ev) {
        setMode('edit');
        setSelected(ev);
        setForm({
            title: ev.title,
            description: ev.description,
            date: dayjs(ev.date).format('YYYY-MM-DDTHH:mm'),
            location: ev.location,
            organizerId: ev.organizerId.toString()
        });
        setShowForm(true);
    }
    function closeForm() {
        setShowForm(false);
    }
    function onField(e) {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    }
    async function onSubmit() {
        try {
            const payload = {
                ...form,
                date: new Date(form.date),
                organizerId: Number(form.organizerId)
            };
            if (mode === 'create') {
                await api.post('/events', payload);
            } else {
                await api.put(`/events/${selected.id}`, payload);
            }
            fetchEvents();
            closeForm();
        } catch (err) {
            alert(err.response?.data?.error || err.message);
        }
    }

    function confirmDelete(ev) {
        setSelected(ev);
        setShowDel(true);
    }
    async function onDelete() {
        await api.delete(`/events/${selected.id}`);
        setShowDel(false);
        fetchEvents();
    }

    return (
        <div className="container mt-4">
            <h2>Events</h2>
            <div className="d-flex justify-content-between mb-3">
                <InputGroup style={{ maxWidth: 300 }}>
                    <FormControl
                        placeholder="Search by title or location"
                        value={search}
                        onChange={handleSearch}
                    />
                </InputGroup>
                <Button onClick={openCreate}>+ Create Event</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th><th>Title</th><th>Date</th><th>Location</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {current.map(ev => (
                        <tr key={ev.id}>
                            <td>{ev.id}</td>
                            <td>{ev.title}</td>
                            <td>{dayjs(ev.date).format('YYYY-MM-DD HH:mm')}</td>
                            <td>{ev.location}</td>
                            <td>
                                <Button size="sm" onClick={() => openEdit(ev)}>Edit</Button>{' '}
                                <Button size="sm" variant="danger" onClick={() => confirmDelete(ev)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item
                        key={i + 1}
                        active={i + 1 === page}
                        onClick={() => selectPage(i + 1)}
                    >
                        {i + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            {/* Modal Create/Edit */}
            <Modal show={showForm} onHide={closeForm}>
                <Modal.Header closeButton>
                    <Modal.Title>{mode === 'create' ? 'Create Event' : 'Edit Event'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {['title', 'description', 'location', 'organizerId'].map(field => (
                            <Form.Group className="mb-2" key={field}>
                                <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                                <Form.Control
                                    name={field}
                                    value={form[field]}
                                    onChange={onField}
                                />
                            </Form.Group>
                        ))}
                        <Form.Group className="mb-2">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                name="date"
                                type="datetime-local"
                                value={form.date}
                                onChange={onField}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeForm}>Cancel</Button>
                    <Button variant="primary" onClick={onSubmit}>{mode === 'create' ? 'Create' : 'Save'}</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Confirm Delete */}
            <Modal show={showDel} onHide={() => setShowDel(false)}>
                <Modal.Header closeButton><Modal.Title>Confirm Delete</Modal.Title></Modal.Header>
                <Modal.Body>Are you sure you want to delete “{selected?.title}”?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDel(false)}>Cancel</Button>
                    <Button variant="danger" onClick={onDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
