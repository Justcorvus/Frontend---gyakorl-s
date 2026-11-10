// Függőségek importálása
const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
const cors = require('cors'); // CORS csomag importálása
const { exec } = require('child_process'); // A parancssori tesztek futtatásához

// Express alkalmazás inicializálása
const app = express();

// CORS middleware engedélyezése minden kérésre
app.use(cors());

// JSON body parser beállítása
app.use(express.json());

// Port beállítása a környezeti változóból vagy alapértelmezett értékkel
const PORT = process.env.PORT || 3001;

// MySQL kapcsolat létrehozása (Connection Pool)
const dbPool = mysql.createPool({
    host: process.env.DB_HOST,      // Adatbázis szerver címe
    user: process.env.DB_USER,         // Adatbázis felhasználónév
    password: process.env.DB_PASSWORD, // Adatbázis jelszó
    database: process.env.DB_NAME, // Adatbázis név
    port: process.env.DB_PORT,            // Adatbázis port
});

// Alap útvonal (route)
app.get('/', (req, res) => {
  res.send('Hello, a backend szerver fut!');
});

// Adatbázis kapcsolat tesztelése
app.get('/ping', async (req, res) => {
  try {
    const [rows] = await dbPool.query('SELECT 1 + 1 AS solution');
    res.json({ message: 'Sikeres adatbázis kapcsolat!', result: rows[0].solution });
  } catch (error) {
    console.error('Hiba az adatbázis-kapcsolat során:', error);
    res.status(500).json({ message: 'Hiba az adatbázis-kapcsolat során.' });
  }
});


// --- API VÉGPONTOK (CRUD) ---

// READ (GET): Minden felhasználó lekérdezése
app.get('/api/users', async (req, res) => {
    try {
        const query = "SELECT id, name, email, created_at FROM users";
        const [rows] = await dbPool.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Hiba a lekérdezés során: ", error);
        res.status(500).json({ error: 'Adatbázis hiba történt a lekérdezéskor.' });
    }
});

// CREATE (POST): Új felhasználó hozzáadása
app.post('/api/users', async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'A név és az email mező kitöltése kötelező.' });
        }

        const query = "INSERT INTO users (name, email) VALUES (?, ?)";
        const [result] = await dbPool.query(query, [name, email]);
        res.status(201).json({ message: "Felhasználó sikeresen hozzáadva", id: result.insertId });
    } catch (error) {
        console.error("Hiba a beszúrás során: ", error);
        res.status(500).json({ error: 'Adatbázis hiba történt a beszúráskor.' });
    }
});

// UPDATE (PATCH): Felhasználó adatainak módosítása ID alapján
app.patch('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'A név és az email mező kitöltése kötelező a módosításhoz.' });
        }

        const query = "UPDATE users SET name = ?, email = ? WHERE id = ?";
        const [result] = await dbPool.query(query, [name, email, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'A felhasználó nem található.' });
        }
        res.json({ message: "Felhasználó sikeresen módosítva", id });
    } catch (error) {
        console.error("Hiba a módosítás során: ", error);
        res.status(500).json({ error: 'Adatbázis hiba történt a módosításkor.' });
    }
});

// DELETE (DELETE): Felhasználó törlése ID alapján
app.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM users WHERE id = ?";
        const [result] = await dbPool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'A felhasználó nem található.' });
        }
        res.json({ message: "Felhasználó sikeresen törölve", id });
    } catch (error) {
        console.error("Hiba a törlés során: ", error);
        res.status(500).json({ error: 'Adatbázis hiba történt a törléskor.' });
    }
});

// --- TESZT FUTTATÓ VÉGPONT ---
app.post('/api/run-tests', (req, res) => {
    const { type } = req.body;

    const commands = {
        sum: 'npm run test:sum',
        unit: 'npm run test:unit',
        integration: 'npm run test:integration'
    };
    
    const command = commands[type] || 'npm test'; // Alapértelmezett: összes teszt

    // Parancs futtatása (a cwd mondja meg, hogy a backend mappában fusson le)
    exec(command, { cwd: __dirname, maxBuffer: 1024 * 1024 * 5 }, (error, stdout, stderr) => {
        // A Jest sokszor a stderr-be írja a sikeres tesztek eredményét is
        const combinedOutput = stdout + '\n' + stderr;
        
        res.json({
            success: !error,
            output: combinedOutput
        });
    });
});

// App exportálása teszteléshez és pool referencia
app.pool = dbPool;

module.exports = app;

// Szerver indítása csak ha közvetlenül futtatjuk (nem import-ként)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`A szerver fut a http://localhost:${PORT} címen`);
  });
}
