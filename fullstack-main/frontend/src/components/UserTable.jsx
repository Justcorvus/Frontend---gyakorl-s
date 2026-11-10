import React from 'react';
import UserTableRow from './UserTableRow';

function UserTable({ users, editingId, onEditStart, onEditCancel, onUpdate, onDelete }) {
    return (
        <>
            <h2>Felhasználók Listája</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th className="table-header">#ID</th>
                        <th className="table-header">Név</th>
                        <th className="table-header">Email</th>
                        <th className="table-header">Regisztráció</th>
                        <th className="table-header">Műveletek</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map(user => (
                            <UserTableRow
                                key={user.id}
                                user={user}
                                isEditing={editingId === user.id}
                                onEditStart={onEditStart}
                                onEditCancel={onEditCancel}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="no-users-cell">Nincsenek felhasználók az adatbázisban.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default UserTable;