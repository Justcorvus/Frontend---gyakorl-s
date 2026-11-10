# Magyarázat: Full-stack és CRUD a projektünkben

Ez a dokumentum segít megérteni a két legfontosabb alapfogalmat, amelyre a projektünk épül: a **Full-stack fejlesztést** és a **CRUD műveleteket**. A magyarázatok a saját kódunkból vett példákat használják.

---

## 1. Mit jelent a Full-stack fejlesztés?

A "Full-stack" (vagy teljes verem) fejlesztés azt jelenti, hogy az alkalmazás minden rétegével dolgozunk, az elejétől a végéig. Egy tipikus webalkalmazás három fő részből áll:

1.  **Frontend (Kliensoldal)**: Ez az, amit a felhasználó a böngészőjében lát és amivel interakcióba lép. A mi projektünkben ez a `frontend` mappa.
    -   **Technológia**: React (`.jsx` fájlok).
    -   **Feladata**: Megjeleníti a felhasználói felületet (űrlapok, táblázatok, gombok), és elküldi a felhasználó kéréseit a backendnek.
    -   **Példa a kódban**: Amikor kitöltöd az űrlapot a `UserForm.jsx` komponensben, a frontend kódot használod.

2.  **Backend (Szerveroldal)**: Ez az alkalmazás "agya", ami a háttérben fut egy szerveren. A felhasználó közvetlenül nem látja. A mi projektünkben ez a `backend` mappa.
    -   **Technológia**: Node.js és Express (`server.js`).
    -   **Feladata**: Fogadja a frontend kéréseit, feldolgozza azokat (pl. ellenőrzi az adatokat), kommunikál az adatbázissal, és választ küld vissza a frontendnek.
    -   **Példa a kódban**: A `backend/server.js` fájlban definiált API végpontok (pl. `app.get('/api/users', ...)`).

3.  **Adatbázis**: Itt tároljuk az adatokat tartósan.
    -   **Technológia**: MySQL.
    -   **Feladata**: A felhasználók adatainak (név, email stb.) biztonságos tárolása.
    -   **Példa a kódban**: A `server.js`-ben lévő SQL parancsok (pl. `SELECT * FROM users`) az adatbázissal kommunikálnak.

**A három réteg kommunikációja a mi projektünkben:**

A `frontend` és a `backend` egy **API**-n (Application Programming Interface) keresztül "beszélgetnek". A frontend HTTP kéréseket küld a backend által biztosított végpontokra.

> **Példa**: Amikor az `App.jsx` komponens betöltődik, a `fetchData` függvény egy `axios.get('http://localhost:3001/api/users')` kérést küld. A `server.js`-ben lévő `app.get('/api/users', ...)` végpont fogadja ezt, lekérdezi az adatokat a MySQL adatbázisból, majd visszaküldi azokat a frontendnek, ami megjeleníti őket a táblázatban.



---

## 2. Mik azok a CRUD műveletek?

A **CRUD** egy mozaikszó, amely az adatbázis-kezelés négy alapvető műveletét jelöli. A mi alkalmazásunk is ezekre a műveletekre épül a felhasználók kezelése során.

### **C** - Create (Létrehozás)

Új adat hozzáadása az adatbázishoz.

-   **Felhasználói művelet**: Kitöltöd az "Új felhasználó hozzáadása" űrlapot és a "Hozzáadás" gombra kattintasz.
-   **Frontend (`App.jsx`)**: A `handleAddUser` függvény lefut, ami egy `axios.post('/api/users', ...)` kérést küld a backendnek a névvel és az e-mail címmel.
-   **Backend (`server.js`)**: Az `app.post('/api/users', ...)` végpont fogadja a kérést.
-   **Adatbázis**: A backend egy `INSERT INTO users ...` SQL parancsot futtat, amivel beírja az új felhasználót a táblába.

### **R** - Read (Olvasás)

Meglévő adatok lekérdezése az adatbázisból.

-   **Felhasználói művelet**: Az oldal betöltésekor megjelenik a felhasználók listája.
-   **Frontend (`App.jsx`)**: A `fetchData` függvény lefut, ami egy `axios.get('/api/users')` kérést küld.
-   **Backend (`server.js`)**: Az `app.get('/api/users', ...)` végpont fogadja a kérést.
-   **Adatbázis**: A backend egy `SELECT id, name, ... FROM users` SQL parancsot futtat, hogy lekérje az összes felhasználót.
-   **Válasz**: A backend visszaküldi a felhasználók listáját a frontendnek, ami a `UserTable` komponens segítségével megjeleníti azt.

### **U** - Update (Módosítás)

Meglévő adat frissítése az adatbázisban.

-   **Felhasználói művelet**: Rákattintasz a "Szerkesztés" gombra, átírod a nevet vagy az e-mail címet, majd a "Mentés" gombra kattintasz.
-   **Frontend (`App.jsx`)**: A `handleUpdate` függvény lefut, ami egy `axios.patch('/api/users/:id', ...)` kérést küld a backendnek a felhasználó ID-jával és a módosított adatokkal.
-   **Backend (`server.js`)**: Az `app.patch('/api/users/:id', ...)` végpont fogadja a kérést.
-   **Adatbázis**: A backend egy `UPDATE users SET name = ?, email = ? WHERE id = ?` SQL parancsot futtat, amivel frissíti a felhasználó adatait.

### **D** - Delete (Törlés)

Meglévő adat eltávolítása az adatbázisból.

-   **Felhasználói művelet**: Rákattintasz a "Törlés" gombra egy felhasználó sorában.
-   **Frontend (`App.jsx`)**: A `handleDelete` függvény lefut, ami egy `axios.delete('/api/users/:id')` kérést küld a backendnek a törlendő felhasználó ID-jával.
-   **Backend (`server.js`)**: Az `app.delete('/api/users/:id', ...)` végpont fogadja a kérést.
-   **Adatbázis**: A backend egy `DELETE FROM users WHERE id = ?` SQL parancsot futtat, amivel eltávolítja a felhasználót az adatbázisból.


## Összefoglalás

A projektünk egy **Full-stack** alkalmazás, mert tartalmaz egy **frontend** (React) és egy **backend** (Node.js/Express) részt, amelyek egy **adatbázissal** (MySQL) dolgoznak együtt. Az alkalmazás a **CRUD** alapelveket valósítja meg, lehetővé téve a felhasználók létrehozását, olvasását, frissítését és törlését.