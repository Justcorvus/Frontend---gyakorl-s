# Magyarázat: Az MVC Minta a Full-stack és CRUD Projektünkben

Ez a dokumentum bemutatja az **MVC (Model-View-Controller)** szoftverarchitektúra-mintát, és megmutatja, hogyan kapcsolódik a már megismert **Full-stack** és **CRUD** fogalmakhoz a mi konkrét projektünkben.

---

## 1. Mi az az MVC (Model-View-Controller)?

Az MVC egy tervezési minta, amely segít szétválasztani egy alkalmazás logikáját három, egymással összekapcsolt részre. A cél a kód szervezettségének javítása, a könnyebb karbantarthatóság és az újrafelhasználhatóság növelése.

1.  **Model (Modell)**: Az adatokért és az üzleti logikáért felel. Ez a réteg kezeli az adatok tárolását, lekérdezését és módosítását. Nem tudja, és nem is érdekli, hogyan lesznek ezek az adatok megjelenítve.
    -   **Fő feladata**: Kommunikáció az adatbázissal.

2.  **View (Nézet)**: A felhasználói felület. Ez az, amit a felhasználó lát és amivel interakcióba lép. A View feladata az adatok megjelenítése. Nem tartalmaz üzleti logikát.
    -   **Fő feladata**: Adatok megjelenítése a felhasználó számára.

3.  **Controller (Vezérlő)**: Az összekötő kapocs a Modell és a Nézet között. Fogadja a felhasználói kéréseket a Nézettől, feldolgozza azokat, és utasítja a Modellt az adatok frissítésére, majd frissíti a Nézetet az új adatokkal.
    -   **Fő feladata**: Kérések fogadása, feldolgozása és a Modell-Nézet kommunikáció koordinálása.



---

## 2. Hogyan jelenik meg az MVC a mi Full-stack projektünkben?

A Full-stack architektúra (Frontend, Backend, Adatbázis) nagyon szépen leképezhető az MVC mintára.

### **View (Nézet) = Frontend**

A teljes `frontend` mappa a mi **Nézetünk**. A React komponensek (`App.jsx`, `UserForm.jsx`, `UserTable.jsx`) felelősek azért, hogy a felhasználó lássa az adatokat és interakcióba tudjon lépni velük (gombok, űrlapok).

> **Példa a kódban**: A `UserTable.jsx` megkapja a felhasználók listáját és egy táblázat formájában megjeleníti azt. Ez egy tiszta Nézet-feladat.

### **Controller (Vezérlő) = Backend API Végpontok**

A `backend/server.js` fájlban lévő Express API végpontok (`app.get`, `app.post`, stb.) töltik be a **Vezérlő** szerepét. Ezek a végpontok fogadják a HTTP kéréseket a Nézettől (frontendtől).

> **Példa a kódban**: Amikor a frontend `axios.post('/api/users', ...)` kérést küld, a `server.js`-ben lévő `app.post('/api/users', ...)` végpont fogadja azt. Ez a Vezérlő.

### **Model (Modell) = Backend Adatbázis Logika**

A **Modell** a mi projektünkben az a kódrészlet, amely közvetlenül az adatbázissal kommunikál. A Vezérlő (az API végpont) hívja meg a Modell logikáját, hogy adatokat kérjen le vagy módosítson.

> **Példa a kódban**: A `server.js`-ben, az `app.post` végponton belül futtatott `dbPool.query("INSERT INTO users ...")` SQL parancs a Modell. Ez a kódrészlet felelős az adatbázis-műveletért.

**Összefoglalva a leképezést:**

| MVC Komponens | Full-stack Réteg | Projektünkben |
| :--- | :--- | :--- |
| **View** | Frontend | A `frontend` mappa React komponensei |
| **Controller** | Backend (API réteg) | Az Express végpontok a `server.js`-ben |
| **Model** | Backend (Adatlogika) + Adatbázis | Az SQL parancsokat futtató részek a `server.js`-ben és maga a MySQL adatbázis |

---

## 3. Az MVC és a CRUD Műveletek Összekapcsolása

Nézzük meg egy **CREATE** (létrehozás) művelet teljes életciklusát az MVC mintán keresztül:

1.  **Felhasználói interakció (View)**
    -   A felhasználó a böngészőben kitölti az űrlapot a `UserForm.jsx` komponensben (Nézet), majd a "Hozzáadás" gombra kattint.
    -   A `UserForm` meghívja a `handleAddUser` függvényt, ami egy `axios.post` kérést indít a `/api/users` végpont felé.

2.  **Kérés feldolgozása (Controller)**
    -   A `backend/server.js`-ben lévő `app.post('/api/users', ...)` végpont (Vezérlő) fogadja a kérést.
    -   A Vezérlő kiolvassa a kérés törzséből a nevet és az e-mail címet (`const { name, email } = req.body;`).

3.  **Adatkezelés (Model)**
    -   A Vezérlő meghívja a Modell logikáját, hogy hajtsa végre az adatbázis-műveletet.
    -   A `dbPool.query("INSERT INTO users ...")` parancs (Modell) lefut, és beilleszti az új felhasználót az adatbázisba.

4.  **Válasz a Vezérlőtől a Nézetnek**
    -   A Modell jelzi a sikeres beszúrást a Vezérlőnek.
    -   A Vezérlő egy `201`-es (Created) HTTP státuszkóddal és egy sikerüzenettel válaszol a Nézetnek (frontendnek).

5.  **Felület frissítése (View)**
    -   A frontend `axios` hívása sikeresen lezárul.
    -   Az `App.jsx` komponensben a `handleAddUser` függvény `catch` blokkja nem fut le, és a `fetchData()` újra lefut, hogy frissítse a felhasználói listát a legújabb adatokkal.
    -   A React újrarendereli a `UserTable` komponenst, és a felhasználó látja az új sort a táblázatban.

Minden más CRUD művelet (Read, Update, Delete) pontosan ugyanezen a **View -> Controller -> Model -> Controller -> View** cikluson megy keresztül, csak más HTTP metódusokkal (`GET`, `PATCH`, `DELETE`) és más SQL parancsokkal.

## Konklúzió

Az **MVC** egy erőteljes koncepció, ami segít logikailag szétválasztani az alkalmazásunk részeit. A **Full-stack** fejlesztés során természetes módon alkalmazzuk ezt a mintát: a **frontend** a **View**, a **backend API** a **Controller**, az **adatbázis-kezelő logika** pedig a **Model**. A **CRUD** műveletek pedig azok az akciók, amelyek végigmennek ezen a teljes MVC cikluson.