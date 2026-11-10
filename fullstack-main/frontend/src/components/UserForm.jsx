import React, { useState } from 'react';

function UserForm({ onAddUser, isSubmitting }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !email) {
            alert("A név és az email megadása kötelező!");
            return;
        }
        onAddUser({ name, email });
        setName('');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <h2>Új felhasználó hozzáadása</h2>
            <input
                type="text"
                placeholder="Név"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
            />
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Hozzáadás...' : 'Hozzáadás'}
            </button>
        </form>
    );
}

export default UserForm;