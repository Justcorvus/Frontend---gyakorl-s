import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import UserTable from './UserTable';
import '../css/UserComponents.css';

// API alap URL központosítása
const API_URL = 'http://localhost:3001/api/users';

function HomePage() {
    // --- STATE VÁLTOZÓK ---

    // READ ÉS HIBAKEZELÉS
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Kezdeti betöltés
    const [isSubmitting, setIsSubmitting] = useState(false); // Adatküldés (Create/Update) közbeni állapot
    const [error, setError] = useState(null);

    // UPDATE (SZERKESZTÉS)
    const [editingId, setEditingId] = useState(null);

    // --- FUNKCIÓK ---

    // Adatok lekérdezésének funkciója
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setUsers(response.data);
            setError(null);
        } catch (err) {
            console.error("Hiba az adatok lekérésekor:", err);
            setError(err.response?.data?.error || "Nem sikerült betölteni az adatokat. Ellenőrizze, hogy a backend szerver fut-e.");
        } finally {
            setLoading(false);
        }
    };

    // Adatok lekérése a komponens betöltésekor
    useEffect(() => {
        fetchData();
    }, []);

    // CREATE: Új felhasználó hozzáadása
    const handleAddUser = async (userData) => {
        setIsSubmitting(true);
        try {
            await axios.post(API_URL, userData);
            fetchData(); // Frissítés
        } catch (err) {
            console.error('Hiba az adatok küldésekor:', err);
            setError(err.response?.data?.error || "Hiba történt a felhasználó hozzáadása közben.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // DELETE: Felhasználó törlése
    const handleDelete = async (id) => {
        if (!window.confirm(`Biztosan törölni szeretnéd a(z) ${id} ID-jű felhasználót?`)) {
            return;
        }
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchData();
        } catch (err) {
            console.error("Hiba a törléskor:", err);
            setError(err.response?.data?.error || "Nem sikerült törölni a felhasználót.");
        }
    };

    // UPDATE: Szerkesztési mód elindítása
    const handleEditStart = (user) => {
        setEditingId(user.id);
    };

    // UPDATE: Módosítás elküldése
    const handleUpdate = async (id, updatedData) => {
        try {
            await axios.patch(`${API_URL}/${id}`, updatedData);
            setEditingId(null);
            fetchData();
        } catch (err) {
            console.error("Hiba a módosításkor:", err);
            setError(err.response?.data?.error || "Nem sikerült módosítani a felhasználót.");
        }
    };

    // Szerkesztés megszakítása
    const handleEditCancel = () => {
        setEditingId(null);
    };

    // --- RENDERELÉS ---

    // Feltételes renderelés: Betöltés és Hiba
    if (loading) {
        return <div className="App"><p>Adatok betöltése...</p></div>;
    }
    if (error) {
        return <div className="App"><p style={{ color: 'red' }}>{error}</p></div>;
    }

    // JSX Visszatérés
    return (
        <div className="App">
            <h1>Felhasználókezelő (Full-Stack CRUD)</h1>

            <UserForm onAddUser={handleAddUser} isSubmitting={isSubmitting} />

            <hr />

            <UserTable
                users={users}
                editingId={editingId}
                onEditStart={handleEditStart}
                onEditCancel={handleEditCancel}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default HomePage;