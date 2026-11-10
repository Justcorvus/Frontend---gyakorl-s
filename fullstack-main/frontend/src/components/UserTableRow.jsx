import React, { useState, useEffect } from 'react';

function UserTableRow({ user, isEditing, onEditStart, onEditCancel, onUpdate, onDelete }) {
    const [editedName, setEditedName] = useState(user.name);
    const [editedEmail, setEditedEmail] = useState(user.email);

    // Frissíti a belső állapotot, ha a külső user prop megváltozik (pl. egy sikeres mentés után)
    useEffect(() => {
        setEditedName(user.name);
        setEditedEmail(user.email);
    }, [user.name, user.email]);

    const handleUpdate = () => {
        if (!editedName || !editedEmail) {
            alert("A név és az email mező kitöltése kötelező!");
            return;
        }
        onUpdate(user.id, { name: editedName, email: editedEmail });
    };

    return (
        <tr>
            <td className="table-cell">{user.id}</td>

            {isEditing ? (
                <>
                    <td className="table-cell">
                        <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                        />
                    </td>
                    <td className="table-cell">
                        <input
                            type="email"
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                        />
                    </td>
                </>
            ) : (
                <>
                    <td className="table-cell">{user.name}</td>
                    <td className="table-cell">{user.email}</td>
                </>
            )}

            <td className="table-cell">{new Date(user.created_at).toLocaleDateString()}</td>

            <td className="table-cell">
                {isEditing ? (
                    <>
                        <button onClick={handleUpdate} className="btn btn-save">Mentés</button>
                        <button onClick={onEditCancel} className="btn btn-cancel">Mégse</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => onEditStart(user)} className="btn btn-edit">Szerkesztés</button>
                        <button onClick={() => onDelete(user.id)} className="btn btn-delete">Törlés</button>
                    </>
                )}
            </td>
        </tr>
    );
}

export default UserTableRow;