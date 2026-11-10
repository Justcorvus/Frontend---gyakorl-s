# Tanulói Útmutató: Full-Stack CRUD Alkalmazás Készítése

Üdvözlünk ebben a tananyagban! A célunk, hogy közösen felépítsünk egy teljes (full-stack) webalkalmazást az alapoktól. Megtanuljuk, hogyan működik együtt egy böngészőben futó frontend (amit a felhasználó lát) és egy szerveren futó backend (ami az adatokat kezeli).

A projekt egy egyszerű felhasználókezelő rendszer lesz, ahol létrehozhatunk, lekérdezhetünk, módosíthatunk és törölhetünk felhasználókat (ezt nevezik CRUD műveleteknek).

## Mit fogunk tanulni?

-   **Backend fejlesztés**: Hogyan készítsünk egy API-t Node.js és Express segítségével, ami adatokat szolgáltat.
-   **Adatbázis-kezelés**: Hogyan kapcsolódjunk egy MySQL adatbázishoz és hajtsunk végre SQL parancsokat.
-   **Frontend fejlesztés**: Hogyan építsünk egy interaktív felhasználói felületet React segítségével.
-   **Kommunikáció**: Hogyan kommunikál a frontend a backenddel HTTP kéréseken keresztül.
-   **Jó gyakorlatok**: Hogyan írjunk tiszta, moduláris és biztonságos kódot.

## Előfeltételek

-   JavaScript alapok (változók, függvények, ciklusok, aszinkron műveletek).
-   HTML és CSS alapismeretek.
-   Telepített **Node.js**.
-   Telepített **MySQL** adatbázis-szerver (pl. XAMPP, WAMP, vagy külön telepítve).
-   Egy kódszerkesztő (pl. Visual Studio Code).

---

## 1. Rész: A Backend – Az Alkalmazás Agya

A backend felel az adatok tárolásáért, kezeléséért és a "logikáért". Olyan, mint egy étterem konyhája: a vendég (frontend) leadja a rendelést, a konyha (backend) pedig elkészíti és kiadja az ételt.

### 1.1. A projekt és a függőségek beállítása

1.  Hozz létre egy `backend` mappát.
2.  Nyiss egy terminált a mappában, és indítsd el a projektet:
    ```bash
    npm init -y
    ```
    Ez létrehoz egy `package.json` fájlt, ami leírja a projektünket.

3.  Telepítsük a szükséges csomagokat:
    ```bash
    npm install express mysql2 dotenv cors
    ```
    -   `express`: A legnépszerűbb keretrendszer Node.js-hez, ami megkönnyíti a szerver és az API végpontok létrehozását.
    -   `mysql2`: Egy modern driver, amivel a Node.js alkalmazásunk "beszélgetni" tud a MySQL adatbázissal.
    -   `dotenv`: Segítségével érzékeny adatokat (pl. jelszavakat) egy `.env` fájlban tárolhatunk, nem pedig a kódban. Ez biztonsági szempontból kulcsfontosságú!
    -   `cors`: Lehetővé teszi, hogy a böngészőből (más "eredetről", pl. `localhost:3000`-ről) biztonságosan tudjunk kéréseket küldeni a szerverünknek (`localhost:3001`).

### 1.2. Az adatbázis előkészítése

Mielőtt kódot írnánk, kell egy hely, ahol tároljuk a felhasználókat.

1.  Hozz létre egy `users` nevű adatbázist a MySQL szervereden.
2.  Futtasd le benne az alábbi SQL parancsot a `users` tábla létrehozásához:
    ```sql
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```
    Ez egy egyszerű tábla `id`, `name`, `email` és `created_at` oszlopokkal.

### 1.3. Az Express szerver felépítése (`server.js`)

Hozz létre egy `server.js` fájlt a `backend` mappában.

**1. Lépés: Alapok és adatbázis-kapcsolat**

```javascript
// Függőségek importálása
const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config(); // .env fájl betöltése
const cors = require('cors');

// Express alkalmazás és port beállítása
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware-ek használata
app.use(cors()); // CORS engedélyezése
app.use(express.json()); // Bejövő JSON kérések feldolgozása

// Adatbázis kapcsolat létrehozása (Connection Pool)
const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Szerver indítása
app.listen(PORT, () => {
  console.log(`A szerver fut a http://localhost:${PORT} címen`);
});
```

**Fontos:** Hozz létre egy `.env` fájlt, és töltsd ki az adatbázisod adataival! (Lásd a `README.md`-t.) A `dbPool` egy "kapcsolatgyűjtemény", ami hatékonyabban kezeli a kéréseket, mintha minden kérésnél új kapcsolatot építenénk fel.

### 1.4. Az API Végpontok (CRUD)

Ezek azok a "címek", amiket a frontend meg tud hívni, hogy adatokat kérjen vagy küldjön.

**READ (GET): Minden felhasználó lekérdezése**

```javascript
app.get('/api/users', async (req, res) => {
    try {
        const sqlQuery = "SELECT id, name, email, created_at FROM users";
        const [rows] = await dbPool.query(sqlQuery);
        res.json(rows); // Visszaküldjük a sorokat JSON formátumban
    } catch (error) {
        console.error("Hiba a lekérdezés során: ", error);
        res.status(500).json({ error: 'Adatbázis hiba történt.' });
    }
});
```

**CREATE (POST): Új felhasználó hozzáadása**

```javascript
app.post('/api/users', async (req, res) => {
    try {
        const { name, email } = req.body; // Adatok kiolvasása a kérés "törzséből"
        const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
        const [result] = await dbPool.query(sql, [name, email]);
        res.status(201).json({ message: "Felhasználó sikeresen hozzáadva", id: result.insertId });
    } catch (error) {
        console.error("Hiba a beszúrás során: ", error);
        res.status(500).json({ error: 'Adatbázis hiba történt.' });
    }
});
```
**Biztonság:** A `?` használata az SQL parancsban (prepared statement) megvéd minket az SQL-injektciós támadásoktól. A driver biztonságosan helyettesíti be az értékeket.

**UPDATE (PATCH): Felhasználó módosítása**

```javascript
app.patch('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params; // ID kiolvasása az URL-ből
        const { name, email } = req.body;
        const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
        await dbPool.query(sql, [name, email, id]);
        res.json({ message: "Felhasználó sikeresen módosítva" });
    } catch (error) {
        // ... hibakezelés
    }
});
```

**DELETE (DELETE): Felhasználó törlése**

```javascript
app.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "DELETE FROM users WHERE id = ?";
        await dbPool.query(sql, [id]);
        res.json({ message: "Felhasználó sikeresen törölve" });
    } catch (error) {
        // ... hibakezelés
    }
});
```

---

## 2. Rész: A Frontend – Az Alkalmazás Arca

A frontend az, amit a felhasználó a böngészőjében lát és használ. Mi a React könyvtárat fogjuk használni, ami komponensekből építi fel a felületet.

### 2.1. A projekt beállítása

1.  Hozd létre a `frontend` mappát.
2.  A terminálban futtasd a következő parancsot:
    ```bash
    npx create-react-app .
    ```
    Ez létrehoz egy komplett React alkalmazás-vázat.

3.  Telepítsük az `axios` csomagot, amivel HTTP kéréseket fogunk küldeni a backendnek:
    ```bash
    npm install axios
    ```

### 2.2. Komponens-alapú gondolkodás

Ahelyett, hogy egyetlen hatalmas fájlba írnánk mindent, a felületet kisebb, újrafelhasználható részekre, ún. **komponensekre** bontjuk.

-   `App.jsx`: A fő komponens, ami összefogja az egészet és kezeli az alkalmazás állapotát.
-   `UserForm.jsx`: Az űrlap, ahol új felhasználót lehet hozzáadni.
-   `UserTable.jsx`: A táblázat, ami listázza a felhasználókat.
-   `UserTableRow.jsx`: A táblázat egyetlen sora, ami egy felhasználó adatait és a szerkesztő/törlő gombokat tartalmazza.

### 2.3. Az `App.jsx` – A Vezérlőpult

Ez a komponens felel az adatok tárolásáért (state) és az API hívások logikájáért.

-   **State-ek (`useState`)**:
    -   `users`: Egy tömb, amiben a backendről kapott felhasználókat tároljuk.
    -   `loading`, `error`: A felhasználói élmény javításáért. Jelezzük, ha töltünk, vagy ha hiba történt.
    -   `editingId`: Annak a felhasználónak az ID-ja, akit éppen szerkesztünk.
-   **Adatlekérés (`useEffect`)**: A `useEffect` hook segítségével a komponens első betöltődésekor lekérjük a felhasználókat a backendről az `axios.get` segítségével.
-   **Kezelőfüggvények (`handle...`)**: Itt definiáljuk azokat a függvényeket, amik az API hívásokat végzik (pl. `handleAddUser`, `handleDelete`). Ezeket a függvényeket **propként** (tulajdonságként) adjuk át a gyerek komponenseknek.

### 2.4. A Gyerek Komponensek

**`UserForm.jsx` (Prezentációs komponens)**
-   Saját belső állapota van a név és email inputoknak.
-   Amikor a felhasználó a "Hozzáadás" gombra kattint, meghívja az `App.jsx`-től kapott `onAddUser` függvényt, és átadja neki az inputok értékét.

**`UserTable.jsx` (Prezentációs komponens)**
-   Megkapja a `users` tömböt propként.
-   A `.map()` függvénnyel végigmegy a tömbön, és minden egyes `user` objektumhoz létrehoz egy `UserTableRow` komponenst, átadva neki a szükséges adatokat és kezelőfüggvényeket.

**`UserTableRow.jsx` (Okosabb prezentációs komponens)**
-   Ez a legérdekesebb. Megkapja az `isEditing` logikai értéket, ami alapján eldönti, hogy a felhasználó adatait vagy szerkeszthető input mezőket jelenítsen meg.
-   Saját belső állapota van a szerkesztett névnek és emailnek.
-   A gombokra kattintva meghívja a propként kapott függvényeket (`onEditStart`, `onDelete`, `onUpdate`).

## Összefoglalás

Gratulálok! Végigmentél egy teljes veremű alkalmazás felépítésén. Megtanultad, hogyan:

1.  Hozhatsz létre egy adat-vezérelt backend API-t.
2.  Építhetsz fel egy dinamikus, komponens-alapú frontendet.
3.  Kötheted össze a kettőt, hogy egy működő, interaktív alkalmazást kapj.

Ez egy kiváló alap a további tanuláshoz. Innen tovább lehet lépni például a felhasználói authentikáció, a fejlettebb állapotkezelés vagy a felhőbe való telepítés irányába.