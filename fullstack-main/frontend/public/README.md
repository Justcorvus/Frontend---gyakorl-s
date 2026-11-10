# 🚀 Felhasználókezelő (Full-Stack CRUD Alkalmazás)

Ez egy egyszerű, teljes veremű (full-stack) webalkalmazás, amely bemutatja a **CRUD (Create, Read, Update, Delete)** műveletek megvalósítását. A projekt egy **React alapú frontendből** és egy **Node.js/Express alapú backendből** áll, amely **MySQL adatbázissal** kommunikál.

> **Tanulási Projekt**: Ez a projekt diákok számára készült az webfejlesztés alapfogalmainak megismeréséhez, beleértve az adatbázis-kezelést, API-k készítését és tesztelést.

---

## 📚 Tartalom Navigáció

- **[Felhasznált Technológiák](#felhasznált-technológiák)** - Melyek az eszközök?
- **[Projektstruktúra](#projektstruktúra)** - Hogyan van felépítve?
- **[Telepítés és Futtatás](#telepítés-és-futtatás)** - Hogyan kell elindítani?
- **[🧪 Tesztelési Útmutatók](#-tesztelési-útmutatók-új)** - **Hogyan működik a tesztelés?**
- **[API Végpontok](#api-végpontok)** - Milyen API-k vannak?
- **[Komponensek](#komponensek)** - Frontend részletek
- **[Hibaelhárítás](#hibaelhárítás)** - Mit csinálj, ha valami nem működik?

---

## Felhasznál technológiák

### Backend
-   **Node.js**: JavaScript futtatókörnyezet
-   **Express.js**: Webalkalmazás keretrendszer Node.js-hez
-   **MySQL2**: MySQL adatbázis-illesztőprogram Node.js-hez
-   **dotenv**: Környezeti változók kezelésére `.env` fájlból
-   **CORS**: Cross-Origin Resource Sharing kezelésére
-   **Jest**: Unit tesztelési keretrendszer
-   **Supertest**: HTTP végpontok teszteléséhez

### Frontend
-   **React**: Felhasználói felületek készítésére szolgáló JavaScript könyvtár
-   **Axios**: HTTP kérések kezelésére
-   **CSS**: A komponensek stílusozására
-   **Vite**: Modern frontendépítő eszköz

---

## Projektstruktúra

```
fullstack/
├── db.sql                          # Adatbázis séma
├── README.md                       # Ez a fájl
│
├── 🧪 TESZTELÉSI ÚTMUTATÓK (ÚJAK!)
├── TESTING_GENERAL.md              # Tesztelés általános összefoglaló
├── TESTING_UNIT.md                 # Unit tesztek részletesen
├── TESTING_INTEGRATION.md          # Integrációs tesztek részletesen
│
├── 📖 DOKUMENTÁCIÓ
├── MVC_MAGYARAZAT.md               # MVC mintázat magyarázata
├── FOGALMAK_CRUD_FULLSTACK.md      # CRUD fogalmak
├── TANULOI_UTMUTATO.md             # Diákok számára
├── DOCS_App_component.md           # App komponens
├── DOCS_UserForm_component.md      # UserForm komponens
├── DOCS_UserTable_component.md     # UserTable komponens
├── DOCS_UserTableRow_component.md  # UserTableRow komponens
│
├── backend/
│   ├── package.json                # Backend függőségek
│   ├── server.js                   # Express szerver
│   ├── sum.js                      # Egyszerű függvény
│   ├── sum.test.js                 # Unit teszt (egyszerű)
│   ├── .env                        # Adatbázis konfiguráció (NEM verziókövetett)
│   ├── .env.example                # .env fájl sablon
│   ├── node_modules/
│   └── tests/
│       ├── unit/
│       │   └── server.test.js      # Unit tesztek (mockolt)
│       └── integration/
│           └── server.integration.test.js  # Integrációs tesztek
│
└── frontend/
    ├── package.json                # Frontend függőségek
    ├── vite.config.js              # Vite konfigurációs
    ├── index.html                  # HTML belépési pont
    ├── public/                     # Statikus fájlok
    └── src/
        ├── main.jsx                # Belépési pont
        ├── App.jsx                 # Fő alkalmazás komponens
        ├── App.css                 # Fő stílusok
        ├── index.css               # Globális stílusok
        ├── components/
        │   ├── UserForm.jsx        # Felhasználó form
        │   ├── UserTable.jsx       # Felhasználó lista
        │   └── UserTableRow.jsx    # Egy sor az táblázatban
        └── css/
            └── UserComponents.css  # Komponens stílusok
```

---

## 🧪 Tesztelési Útmutatók (ÚJ!)

A projekt **3 szintű tesztelést** tartalmaz:

### 📖 Útmutatók

1. **[📚 TESTING_GENERAL.md](TESTING_GENERAL.md)** - Hogy kezdj el
   - Tesztelés alapfogalmai
   - 3 teszt szint bemutatása
   - Gyors startolás parancsok
   - Best practices

2. **[🧪 TESTING_UNIT.md](TESTING_UNIT.md)** - Unit tesztek, mockolt adatbázis
   - Mit teszt az unit teszt?
   - AAA Pattern (Arrange, Act, Assert)
   - Supertest HTTP tesztek
   - Mock objektumok
   - Gyakorló feladatok

3. **[🔗 TESTING_INTEGRATION.md](TESTING_INTEGRATION.md)** - Integrációs tesztek, valódi DB
   - Valódi adatbázis-kommunikáció
   - Tesztek sorrendje és függőségei
   - CRUD műveletek teljes tesztelése
   - Adatbázis ellenőrzés
   - Hibaelhárítás

### 🚀 Rövid Teszt Parancsok

```bash
cd backend

# Összes teszt futtatása
npm test

# Egyszerű unit (sum) teszt
npm run test:sum

# Unit tesztek (mockolt DB)
npm run test:unit

# Integrációs tesztek (valódi DB)
npm run test:integration

# Watch módban (automatikus újrafuttatás)
npm run test:watch

# Debug módban
npm run test:debug
```

### 📊 Teszt Típusok Összehasonlítása

| Típ | Sebesség | Valódiság | Használat | Fájl |
|-----|----------|-----------|-----------|------|
| **Unit (Egy.)** | ⚡ ~50ms | Mock DB | Gyakori | `sum.test.js` |
| **Unit (HTTP)** | ⚡ ~100ms | Mock DB | Gyakori | `server.test.js` |
| **Integrációs** | 🐢 ~500ms | Valós DB | Néhányszor | `server.integration.test.js` |

---

## Telepítés és Futtatás

### Előfeltételek
-   **Node.js** (LTS verzió ajánlott, legalább 16.x)
-   **npm** (Node csomag menedzser, Node.js-sel jön)
-   **MySQL** adatbázis-szerver (szabad, ingyenes: MariaDB vagy MySQL Community)

### 1. Backend Beállítása

#### 1.1 Navigálj a backend mappába
```bash
cd backend
```

#### 1.2 Telepítsd a függőségeket
```bash
npm install
```

#### 1.3 MySQL Adatbázis Létrehozása

Nyisd meg a MySQL konzolt:
```bash
mysql -u root -p
```

Vagy grafikus eszközzel (MySQL Workbench, phpMyAdmin).

Majd futtasd:
```sql
-- Adatbázis létrehozása
CREATE DATABASE fullstack;

-- Használd az adatbázist
USE fullstack;

-- Importáld a sémát az db.sql-ből
-- Vagy manuálisan:
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Vagy egy parancsban az egészet:
```bash
mysql -u root -p fullstack < db.sql
```

#### 1.4 Környezeti Változók Beállítása

1. Másold le a `.env.example` fájlt:
   ```bash
   cp .env.example .env
   ```

2. Szerkeszd meg a `.env` fájlt a saját adataiddal:
   ```bash
   # .env fájl tartalma
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=jelszavad_ide  # Ha van jelszó
   DB_NAME=fullstack
   DB_PORT=3306
   ```

#### 1.5 Backend Szerver Indítása

**Fejlesztéshez** (automatikus újraindítás):
```bash
npm run dev
```

**Éles módban**:
```bash
npm start
```

✅ A szerver fut a `http://localhost:3001` címen

#### 1.6 Tesztek Futtatása (OPCIONÁLIS)

```bash
# Összes teszt
npm test

# Csak unit
npm run test:unit

# Csak integrációs
npm run test:integration
```

---

### 2. Frontend Beállítása

#### 2.1 Nyiss egy új terminált, és navigálj a frontend mappába
```bash
cd frontend
```

#### 2.2 Telepítsd a függőségeket
```bash
npm install
```

#### 2.3 Frontend Alkalmazás Indítása
```bash
npm run dev
```

✅ Az alkalmazás megnyílik vagy `http://localhost:5173` (Vite alapbeállítás)

---

## 🎮 A Teljes Alkalmazás Elindítása (2 Terminal)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Kimenet: Backend szerver fut a http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Kimenet: Frontend fut a http://localhost:5173
```

✅ Nyisd meg: `http://localhost:5173` a böngésződben

---

## API Végpontok

### Felhasználó Kezelés

#### 📋 GET `/api/users`
**Lekérdezi az összes felhasználót**

```bash
curl http://localhost:3001/api/users
```

**Visszatérés:**
```json
[
    { "id": 1, "name": "János Bácsi", "email": "janos@example.com", "created_at": "2024-01-15T10:30:00.000Z" },
    { "id": 2, "name": "Péter Professzor", "email": "peter@example.com", "created_at": "2024-01-15T11:00:00.000Z" }
]
```

---

#### ➕ POST `/api/users`
**Új felhasználó létrehozása**

```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{ "name": "Új Felhasználó", "email": "uj@example.com" }'
```

**Kérés törzse:**
```json
{
    "name": "Új Felhasználó",
    "email": "uj@example.com"
}
```

**Visszatérés (201 Created):**
```json
{
    "id": 3,
    "name": "Új Felhasználó",
    "email": "uj@example.com",
    "created_at": "2024-01-15T12:00:00.000Z"
}
```

**Hibalehetőségek:**
- `400` - Hiányzik `name` vagy `email`
- `400` - Email már létezik

---

#### ✏️ PATCH `/api/users/:id`
**Felhasználó módosítása**

```bash
curl -X PATCH http://localhost:3001/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{ "name": "Módosított Név", "email": "modositott@example.com" }'
```

**Kérés törzse:**
```json
{
    "name": "Módosított Név",
    "email": "modositott@example.com"
}
```

**Visszatérés:**
```json
{
    "message": "Felhasználó módosítva",
    "id": 1
}
```

**Hibalehetőségek:**
- `404` - Felhasználó nem található
- `400` - Hiányzó adatok

---

#### ❌ DELETE `/api/users/:id`
**Felhasználó törlése**

```bash
curl -X DELETE http://localhost:3001/api/users/1
```

**Visszatérés:**
```json
{
    "message": "Felhasználó törölve"
}
```

**Hibalehetőségek:**
- `404` - Felhasználó nem található

---

## Komponensek

### Frontend Felépítése (React)

#### 🏠 **App.jsx** - Fő Komponens
```
App
├── UserForm (Új felhasználó hozzáadása)
└── UserTable (Felhasználó lista)
    └── UserTableRow × N (Egy felhasználó egy sora)
```

#### 📝 **UserForm.jsx**
- Új felhasználó hozzáadása
- Validáció: Név és email
- POST kérés az API-hoz

#### 📋 **UserTable.jsx**
- Összes felhasználó listázása
- GET kérés az API-tól
- Törlés és módosítás gombokkal

#### 📊 **UserTableRow.jsx**
- Egyetlen felhasználó egy sorban
- Szerkesztés és törlés gombok
- PATCH és DELETE kérések

**További Dokumentáció:**
- [App.jsx Részletes Útmutatója](DOCS_App_component.md)
- [UserForm.jsx Részletes Útmutatója](DOCS_UserForm_component.md)
- [UserTable.jsx Részletes Útmutatója](DOCS_UserTable_component.md)
- [UserTableRow.jsx Részletes Útmutatója](DOCS_UserTableRow_component.md)

---

## 📚 Tanulási Anyagok

### Képzések
- [MVC Mintázat Magyarázata](MVC_MAGYARAZAT.md) - Hogyan épül fel az app?
- [CRUD Fogalmak](FOGALMAK_CRUD_FULLSTACK.md) - Mit jelentenek a műveletek?
- [Diákok Útmutatója](TANULOI_UTMUTATO.md) - Általános tanulási útiterv

### Tesztelés
- [Tesztelési Általános Útmutató](TESTING_GENERAL.md) - Kezdj itt!
- [Unit Tesztek](TESTING_UNIT.md) - Gyors, izolált tesztek
- [Integrációs Tesztek](TESTING_INTEGRATION.md) - Valódi adatbázis tesztek

---

## 🐛 Hibaelhárítás

### Backend Problémák

#### ❌ Hiba: `Error: connect ECONNREFUSED 127.0.0.1:3306`
**Mit jelent?** MySQL szerver nem fut

**Megoldás:**
- Linux: `sudo service mysql start`
- macOS: `brew services start mysql`
- Windows: MySQL Services kezelőben indítsd

---

#### ❌ Hiba: `ER_BAD_DB_ERROR: Unknown database 'fullstack'`
**Mit jelent?** Adatbázis nem létezik

**Megoldás:**
```bash
mysql -u root -p fullstack < db.sql
```

---

#### ❌ Hiba: `ER_NO_SUCH_TABLE: Table 'fullstack.users' doesn't exist`
**Mit jelent?** Tábla nincs megalkotva

**Megoldás:**
```sql
USE fullstack;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

#### ❌ Hiba: `.env` filex nem található
**Mit jelent?** Környezeti változók nincsenek beállítva

**Megoldás:**
```bash
cd backend
cp .env.example .env
# Szerkeszd meg a .env fájlt a saját adatokkal
```

---

### Frontend Problémák

#### ❌ Hiba: `Failed to fetch from http://localhost:3001`
**Mit jelent?** Backend szerver nem fut vagy másik porton

**Megoldás:**
```bash
# Ellenőrizd a backend fut-e
cd backend
npm run dev

# Ha másik porton fut, módosítsd az axios URL-jét
# frontend/src/App.jsx-ben
```

---

#### ❌ Hiba: Port már használatban van
**Mit jelent?** Egy másik alkalmazás már hallgat erre a portra

**Megoldás - Backend (3001):**
```bash
lsof -i :3001
# Vagy másik porton:
PORT=3002 npm run dev
```

**Megoldás - Frontend (5173):**
```bash
npm run dev -- --port 5174
```

---

### Tesztelés Problémák

#### ❌ Hiba: `Jest did not exit one second after the test run has completed`
**Mit jelent?** Adatbázis kapcsolat nem zárult le

**Megoldás:** Lásd [TESTING_INTEGRATION.md](TESTING_INTEGRATION.md) - Hibaelhárítás szekció

---

#### ❌ Hiba: `Cannot find module`
**Mit jelent?** Függőség nem telekültek

**Megoldás:**
```bash
npm install
```

---

## 📖 Megértési Útiterv

### 1. Szakasz - Alapok (2-3 óra)
- [ ] README.md olvasása (3 ezt olvasod!)
- [ ] Telepítés és Futtatás
- [ ] Frontend tesztelése böngészőben
- [ ] Backend API tesztelése (curl)

### 2. Szakasz - Frontend (3-4 óra)
- [ ] React komponensek tanulmányozása
- [ ] UserForm.jsx tanulmányozása
- [ ] UserTable.jsx tanulmányozása
- [ ] Frontend kódmódosítása

### 3. Szakasz - Backend (3-4 óra)
- [ ] server.js tanulmányozása
- [ ] API végpontok megértése
- [ ] MySQL lekérdezések megértése
- [ ] Backend kódmódosítása

### 4. Szakasz - Tesztelés (4-5 óra)
- [ ] TESTING_GENERAL.md olvasása
- [ ] TESTING_UNIT.md olvasása
- [ ] Unit tesztek futtatása
- [ ] TESTING_INTEGRATION.md olvasása
- [ ] Integrációs tesztek futtatása
- [ ] Saját tesztek írása

### 5. Szakasz - Fejlett (5+ óra)
- [ ] MVC mintázat megértése
- [ ] CRUD fogalmak elmélyítése
- [ ] Saját komponensek hozzáadása
- [ ] Saját API végpontok hozzáadása
- [ ] Teljes tesztelési lefedettség

---

## 🎯 Tanulási Célok

- ✅ Frontend-Backend kommunikáció megértése
- ✅ REST API alapfogalmainak elsajátítása
- ✅ CRUD műveletek implementálása
- ✅ Adatbázis-kezelés alapjai
- ✅ Komponensek és újrafelhasználhatóság
- ✅ Tesztelés és minőségbiztosítás
- ✅ Modern webfejlesztési workflow

---

## 📝 Licenc

Ez az oktatási projekt szabad használatra lett létrehozva.

---

## 🤝 Támogatás

### Kérdések?
- Olvasd el az [TANULOI_UTMUTATO.md](TANULOI_UTMUTATO.md) fájlt
- Nézd meg az [DOCS_*.md](.) fájlokat részletekért
- Tanulmányozd a [TESTING_*.md](.) fájlokat teszteléshez

### Hibákat találtál?
- Ellenőrizd a [Hibaelhárítás](#-hibaelhárítás) szekciót
- Nézz meg egy hasonló dokumentációs fájlt

---

**Sikeres Tanulást! 🚀**
