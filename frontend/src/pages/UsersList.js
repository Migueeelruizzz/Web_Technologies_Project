import React, { useState, useEffect } from 'react';
import api from '../services/axios-instance';
import {
    Table, Modal, Button, Form, InputGroup, FormControl, Pagination
} from 'react-bootstrap';

const ITEMS_PER_PAGE = 5;

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [mode, setMode] = useState('create');
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState({
        name: '', email: '', password: '', role: 'USER'
    });
    const [showDel, setShowDel] = useState(false);

    // 1) Declaras aquí la función de carga
    async function fetchUsers() {
        const res = await api.get('/users');
        setUsers(res.data);
    }

    // 2) Y la llamas dentro de useEffect correctamente
    useEffect(() => {
        fetchUsers();
    }, []);

    // Filtrado y paginación
    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
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

    // Create / Edit modals
    function openCreate() {
        setMode('create');
        setForm({ name: '', email: '', password: '', role: 'USER' });
        setShowForm(true);
    }
    function openEdit(u) {
        setMode('edit');
        setSelected(u);
        setForm({ name: u.name, email: u.email, password: '', role: u.role });
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
            if (mode === 'create') {
                await api.post('/users', form);
            } else {
                await api.put(`/users/${selected.id}`, form);
            }
            await fetchUsers();
            closeForm();
        } catch (err) {
            alert(err.response?.data?.error || err.message);
        }
    }

    // Delete workflow
    function confirmDelete(u) {
        setSelected(u);
        setShowDel(true);
    }
    async function onDelete() {
        await api.delete(`/users/${selected.id}`);
        setShowDel(false);
        fetchUsers();
    }

    return (
        <div className="container mt-4">
            <h2>Users</h2>
            <div className="d-flex justify-content-between mb-3">
                <InputGroup style={{ maxWidth: 300 }}>
                    <FormControl
                        placeholder="Search by name or email"
                        value={search}
                        onChange={handleSearch}
                    />
                </InputGroup>
                <Button onClick={openCreate}>+ Create User</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {current.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>
                                <Button size="sm" onClick={() => openEdit(u)}>Edit</Button>{' '}
                                <Button size="sm" variant="danger" onClick={() => confirmDelete(u)}>
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
                    <Modal.Title>{mode === 'create' ? 'Create User' : 'Edit User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" value={form.name} onChange={onField} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" value={form.email} onChange={onField} />
                        </Form.Group>
                        {mode === 'create' && (
                            <Form.Group className="mb-2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" value={form.password} onChange={onField} />
                            </Form.Group>
                        )}
                        <Form.Group className="mb-2">
                            <Form.Label>Role</Form.Label>
                            <Form.Select name="role" value={form.role} onChange={onField}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </Form.Select>
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
                <Modal.Body>Are you sure you want to delete “{selected?.name}”?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDel(false)}>Cancel</Button>
                    <Button variant="danger" onClick={onDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
