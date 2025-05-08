
// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import api from '../services/axios-instance';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const [stats, setStats] = useState({ users: 0, events: 0 });

    useEffect(() => {
        async function fetchStats() {
            try {
                const [uRes, eRes] = await Promise.all([
                    api.get('/users'),
                    api.get('/events'),
                ]);
                setStats({ users: uRes.data.length, events: eRes.data.length });
            } catch (err) {
                console.error('Error fetching dashboard stats:', err);
            }
        }
        fetchStats();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };
    const cardVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <Container fluid className="mt-4 px-5">
            <h2 className="text-center mb-4" style={{ fontFamily: 'Pacifico, cursive', color: '#ff6b6b' }}>Dashboard Buena Vibra</h2>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <Row className="g-4">
                    {[
                        { label: 'Total Users', value: stats.users, color: '#4ecdc4' },
                        { label: 'Total Events', value: stats.events, color: '#ff6b6b' }
                    ].map((stat, idx) => (
                        <Col sm={6} md={4} key={idx}>
                            <motion.div variants={cardVariants} whileHover={{ scale: 1.05 }}>
                                <Card style={{ borderColor: stat.color }} className="h-100 shadow">
                                    <Card.Body>
                                        <Card.Title style={{ color: stat.color }}>{stat.label}</Card.Title>
                                        <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                            {stat.value}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </motion.div>
            <p className="mt-4 text-center" style={{ color: '#556', fontStyle: 'italic' }}>
                ¡Bienvenido a Buena Vibra! Gestiona tus quedadas y eventos sociales con estilo.
            </p>
        </Container>
    );
}