# 🔗 Integrációs Tesztek Részletes Útmutatója

## Mi az az Integrációs Teszt?

Az **integrációs teszt** több komponens **valós együttműködését vizsgáló teszt**, **valódi adatbázissal**, nem mockolt objektumokkal.

### Jellemzői:
- 🗄️ **Valódi Adatbázis** - Nem mock, hanem ténylegesen a DB-t használja
- 🔗 **Komponensek Közötti Kommunikáció** - Több része működik együtt
 - 📊 **Teljes Munkafolyamat** - A teljes láncot működteti
- ⏱️ **Lassabb** - Sokkal tovább tart, mint unit tesztek
 - 🎯 **Nagyobb Bizonyosság** - Tudjuk, hogy valóban működik-e

---

## 🔍 Miért Más az Integrációs Teszt?

### Unit Teszt vs Integrációs Teszt

| Szempont | Unit Teszt | Integrációs Teszt |
|----------|-----------|------------------|
| **Adatbázis** | Mock (hamis) | Valódi |
| **Sebesség** | ⚡ ~50ms | 🐢 ~500ms+ |
| **Izolálás** | Teljes | Részleges |
| **Valódiság** | Szimulált | Valós |
| **Debug** | Könnyű | Nehéz |
| **Sikere** | 99%+ | 95%+ |
| **Célja** | Egy funkció | Teljes munkafolyamat |

---

## 📁 A Projekt Integrációs Tesztjei

### Fájl: `backend/tests/integration/server.integration.test.js`

```javascript
const request = require('supertest');
const app = require('../../server');
require('dotenv').config();

describe('Integrációs Tesztek (Élő Adatbázis)', () => {
    let testUserId;

    afterAll(async () => {
        if (app.pool) {
            await app.pool.end();
        }
    });

    test('POST /api/users - Új rekord mentése', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({ name: 'Teszt Elek', email: `test_${Date.now()}@example.com` });

        expect(res.statusCode).toBe(201);
        testUserId = res.body.id;
    });

    test('GET /api/users - Ellenőrzés', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(res.body.some(u => u.id === testUserId)).toBe(true);
    });

    test('DELETE /api/users/:id - Takarítás', async () => {
        const res = await request(app).delete(`/api/users/${testUserId}`);
        expect(res.statusCode).toBe(200);
    });
});
```

---

## 🏗️ Integrációs Teszt Szerkezete

### AAA Pattern - Integrációs Verzió

```javascript
describe('Felhasználó Felhasználó Kezelés', () => {
    let userId;

    // ARRANGE: Adatbázis kapcsolat, előkészítés
    beforeAll(async () => {
        // Adatbázis inicializálása
    });

    test('Felhasználó hozzáadása és lekérdezése', async () => {
        // ACT: Adatbázis művelet
        const addRes = await request(app)
            .post('/api/users')
            .send({ name: 'János', email: 'janos@example.com' });
        
        userId = addRes.body.id;

        // ASSERT: Ellenőrzés
        expect(addRes.statusCode).toBe(201);
        expect(userId).toBeDefined();

        // KÖZVETETT ASSERT: Lekérdezés
        const getRes = await request(app).get('/api/users');
        expect(getRes.body.some(u => u.id === userId)).toBe(true);
    });

    // CLEANUP: Takarítás az adatbázis után
    afterAll(async () => {
        await app.pool.end();
    });
});
```

---

## 📝 Az Integrációs Tesztek Lépésről Lépésre

### Teszt 1: Felhasználó Hozzáadása

```javascript
test('POST /api/users - Új rekord mentése', async () => {
    const res = await request(app)
        .post('/api/users')
        .send({ 
            name: 'Teszt Elek', 
            email: `test_${Date.now()}@example.com` 
        });

    expect(res.statusCode).toBe(201);
    testUserId = res.body.id;
});
```

#### 🔄 Mi történik?

1. **Kérés**: POST `/api/users` új felhasználóval
   ```
   {
     name: "Teszt Elek",
     email: "test_1733568000000@example.com"
   }
   ```

2. **Backend**: 
   - Validáció ✓
   - Adatbázisba mentés ✓
   - ID-t generál ✓

3. **Válasz**:
   ```javascript
   {
     statusCode: 201,  // Created
     body: {
       id: 42,
       name: 'Teszt Elek',
       email: 'test_1733568000000@example.com'
     }
   }
   ```

4. **Teszt Ellenőrzése**:
   - ✓ Státusz = 201 (Created)
   - ✓ ID-t mentettük az `testUserId` változóba

#### 🕒 Miért `Date.now()`?

```javascript
email: `test_${Date.now()}@example.com`
```

- Egyedi email minden tesztnél
- 1733568000000 (unix timestamp)
- Nincs "email already exists" hiba
- Tesztek párhuzamosan futhatnak

---

### Teszt 2: Felhasználó Lekérdezése

```javascript
test('GET /api/users - Ellenőrzés', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.some(u => u.id === testUserId)).toBe(true);
});
```

#### 🔄 Mi történik?

1. **Előfeltételek**:
   - Korábban mentettük a `testUserId`-t az 1. teszt során
   - Ez hivatkozik arra az ID-ra

2. **Kérés**: GET `/api/users` (összes felhasználó)

3. **Backend**:
   - Adatbázisból lekérdez minden user-t
   - Egy array-ben visszaadja

4. **Válasz**:
   ```javascript
   {
     statusCode: 200,  // OK
     body: [
       { id: 1, name: 'János', email: 'janos@example.com' },
       { id: 42, name: 'Teszt Elek', email: 'test_1733568000000@example.com' },
       // ... további felhasználók
     ]
   }
   ```

5. **Teszt Ellenőrzése**:
   ```javascript
   // Megnézzük: van-e olyan user, akinek az ID = testUserId?
   res.body.some(u => u.id === testUserId)  // true
   ```

#### 📌 Array `some()` Metódus

```javascript
const users = [
    { id: 1, name: 'János' },
    { id: 42, name: 'Teszt Elek' },
    { id: 5, name: 'Péter' }
];

// Van olyan user, akinek az ID = 42?
users.some(u => u.id === 42)  // true ✓

// Van olyan user, akinek az ID = 999?
users.some(u => u.id === 999)  // false ✗
```

---

### Teszt 3: Felhasználó Törlése (Takarítás)

```javascript
test('DELETE /api/users/:id - Takarítás', async () => {
    const res = await request(app).delete(`/api/users/${testUserId}`);
    expect(res.statusCode).toBe(200);
});
```

#### 🔄 Mi történik?

1. **Kérés**: DELETE `/api/users/42` (az ID-t beillesztjük az URL-be)
   ```
   DELETE /api/users/42
   ```

2. **Backend**:
   - Keres az ID alapján
   - Adatbázisból törli
   ```sql
   DELETE FROM users WHERE id = 42
   ```

3. **Válasz**:
   ```javascript
   {
     statusCode: 200,  // OK (sikeresen törölve)
     body: { message: 'Felhasználó törölve' }
   }
   ```

4. **Teszt Ellenőrzése**:
   - ✓ Státusz = 200 (OK)

#### 🧹 Miért Törlünk?

- **Takarítás**: Nem maradnak felesleges tesztadatok az adatbázisban
- **Izolálás**: Következő futáskor tiszta állapot
- **Adatbázis Méret**: Nem növekszik végtelenül
- **Jó Gyakorlat**: Lemezterület kímélése

---

## 🔄 Tesztek Sorrendje és Függőségei

### Teszt Futásfa

```
Integrációs Tesztek (Élő Adatbázis)
├─ beforeAll()        ← Inicializálás
├─ Test 1: POST (Hozzáadás)
│  └─ testUserId = 42
├─ Test 2: GET (Lekérdezés)
│  └─ Használja: testUserId
├─ Test 3: DELETE (Törlés)
│  └─ Használja: testUserId
└─ afterAll()         ← Takarítás
```

### ⚠️ Fontos: Teszt Sorrend

```javascript
let testUserId;

test('POST ...', async () => {  // Ez fut ELŐSZÖR
    testUserId = 42;            // Ezt létrehozza
});

test('GET ...', async () => {   // Ez fut MÁSODIKKÉNT
    // testUserId = 42 (elérhető)
});

test('DELETE ...', async () => {  // Ez fut HARMADIKKÉNT
    // testUserId = 42 (még elérhető)
});
```

**Probléma**: Ha tesztek függnek egymástól!

```javascript
// ROSSZ ❌ - Egymástól függ
test('Post', () => { userId = 42; });
test('Get', () => expect(userId).toBe(42); })

// JÓ ✅ - Önálló tesztek
test('Post', async () => { 
    const res = await create();
    expect(res.body.id).toBe(42);
});
test('Get another', async () => {
    const res = await get(otherUserId);
});
```

---

## 💾 Valódi Adatbázis Kezelése

### Adatbázis Szükséges

```javascript
require('dotenv').config();
```

- `.env` fájlban vannak az adatbázis kapcsolati adatok
- MySQL/MariaDB szüksége van futnia
- Adatbázis léteznie kell

### Kapcsolat Lezárása

```javascript
afterAll(async () => {
    if (app.pool) {
        await app.pool.end();  // Fontos: Lezárjuk a kapcsolatot
    }
});
```

**Mi történik, ha nem zárjuk le?**

```
Error: Jest did not exit one second after the test run has completed.
```

- Jest nem tud kilépni
- Nyitott adatbázis kapcsolat
- `afterAll` kötelező!

---

## 🧪 Valódi Adatbázis Műveletek

### Adatbázisban Tárolt Adatok

```sql
-- Teszt futása után az adatbázis:
SELECT * FROM users;
```

| id  | name         | email                        | created_at |
|-----|--------------|------------------------------|-----------|
| 1   | János        | janos@example.com            | 2024-... |
| 42  | Teszt Elek   | test_1733568000000@example.com | 2024-... |
| 5   | Péter        | peter@example.com            | 2024-... |

#### ✔️ Valóban az adatbázisban van!

Tesztet követően a DELETE művelet **valóban törli**:

```sql
-- DELETE /api/users/42 után:
SELECT * FROM users;
```

| id  | name    | email                 | created_at |
|-----|---------|----------------------|-----------|
| 1   | János   | janos@example.com    | 2024-...  |
| 5   | Péter   | peter@example.com    | 2024-...  |
<!-- 42 már nincs ott! -->

---

## 🐛 Adatbázis Elérésből Adódó Problémák

### Probléma 1: Adatbázis Nem Fut

```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Megoldás**:
```bash
# MySQL/MariaDB indítása
sudo service mysql start    # Linux
brew services start mysql   # macOS
```

### Probléma 2: Adatbázis Nem Létezik

```
Error: ER_BAD_DB_ERROR: Unknown database 'testdb'
```

**Megoldás**:
```sql
CREATE DATABASE testdb;
```

### Probléma 3: Táblák Nincsenek Létrehozva

```
Error: ER_NO_SUCH_TABLE: Table 'testdb.users' doesn't exist
```

**Megoldás**:
```sql
-- Lásd: db.sql fájl
-- Futtasd: mysql -u user -p database < db.sql
```

### Probléma 4: Email Már Létezik

```
Error: ER_DUP_ENTRY: Duplicate entry 'test@example.com'
```

**Megoldás**:
```javascript
// Egyedi email minden tesztnél:
email: `test_${Date.now()}@example.com`
```

---

## 📊 Integrációs vs Unit Tesztek

### Összehasonlítás Tábla

| Aspektus | Unit | Integrációs |
|----------|------|-----------|
| **Mock** | 100% mock | 0% mock |
| **Sebesség** | ⚡⚡⚡ Gyors | 🐢 Lassú |
| **DB Hozzáférés** | Nem | Igen |
| **Hálózat Use** | Nem | Igen |
| **Valódiság** | Szimulált | Valódi |
| **Debug** | Könnyű | Nehéz |
| **Futási Idő** | 50ms | 500ms+ |
| **Megbízhatóság** | 99% | 95% |
| **Írási Idő** | Gyors | Lassú |

---

## 🎓 Integrációs Teszt Gyakorló Feladatok

### 1. **Új Végpont Tesztelése**

```javascript
test('POST /api/users - Teljes Munkafolyamat', async () => {
    // 1. ARRANGE: Adat elökészítése
    const newUser = {
        name: 'Práter Péter',
        email: `peter_${Date.now()}@example.com`
    };

    // 2. ACT: Felhasználó hozzáadása
    const addRes = await request(app)
        .post('/api/users')
        .send(newUser);

    const userId = addRes.body.id;

    // 3. ASSERT: Validálás
    expect(addRes.statusCode).toBe(201);
    
    // 4. KÖZVETETT ASSERT: Lekérdezés
    const getRes = await request(app).get(`/api/users/${userId}`);
    expect(getRes.body.name).toBe('Práter Péter');

    // 5. CLEANUP: Takarítás
    const deleteRes = await request(app).delete(`/api/users/${userId}`);
    expect(deleteRes.statusCode).toBe(200);
});
```

### 2. **Pontosság Teszt**

```javascript
test('PUT /api/users/:id - Felhasználó Módosítása', async () => {
    // 1. Új user
    const addRes = await request(app)
        .post('/api/users')
        .send({ name: 'Janós', email: `janos_${Date.now()}@example.com` });
    
    const userId = addRes.body.id;

    // 2. Módosítás
    const updateRes = await request(app)
        .put(`/api/users/${userId}`)
        .send({ name: 'János Módosított' });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.name).toBe('János Módosított');

    // 3. Takarítás
    await request(app).delete(`/api/users/${userId}`);
});
```

### 3. **Hiba Kezelés Teszt**

```javascript
test('DELETE /api/users/:id - Nem Létező User', async () => {
    const res = await request(app).delete('/api/users/999999');
    
    // 404 = Nem Található
    expect(res.statusCode).toBe(404);
});
```

---

## 🔧 Integrációs Tesztek Futtatása

### Parancsok

```bash
# Egy fájl tesztelése
npm run test:integration

# Watch módban
npm test -- --watch tests/integration

# Debug módban
npm run test:debug -- tests/integration

# Egyetlen teszt
npm test -- --testNamePattern="POST /api/users"
```

---

## 📈 Adatbázis állapot Vizsgálata

### Teszt Után Manuális Ellenőrzés

```bash
# MySQL konzolra lépés
mysql -u root -p

# Adatbázis választása
USE fullstack;

- # Összes user megtekintése
SELECT * FROM users;

# Egy user törléséhez, hogy tiszta legyen:
DELETE FROM users WHERE email LIKE 'test_%';
```

---

## ✅ Best Practices Integrációs Tesztekhez

### ✨ Jó Integrációs Tesztek

1. **Cleanup Szükséges**
   ```javascript
   afterEach(async () => {
       // Takarítás minden teszt után
   });
   ```

2. **Egyedi Adatok**
   ```javascript
   email: `test_${Date.now()}@example.com`
   ```

3. **Pool Lezárása**
   ```javascript
   afterAll(async () => {
       if (app.pool) await app.pool.end();
   });
   ```

4. **Hibás Esetek is Tesztelése**
   ```javascript
   test('404 - Nem Létezik', async () => {
       const res = await request(app).get('/api/users/999');
       expect(res.statusCode).toBe(404);
   });
   ```

5. **Teljes Munkafolyamat**
   ```javascript
   // CREATE -> READ -> UPDATE -> DELETE (CRUD)
   ```

---

## 📚 Összefoglaló

| Lépés | Mit Csinálsz |
|------|-------------|
| 1. | Valódi adatbázishoz csatlakozol |
| 2. | Adatot hozzáadsz (POST) |
| 3. | Adatot lekérdezed (GET) |
| 4. | Adatot módosítasz (PUT) |
| 5. | Adatot törlöd (DELETE) |
| 6. | Adatbázis kapcsolatot lezárod |

---

## 🚀 Következő Lépések

1. Futtasd le: `npm run test:integration`
2. Nézz meg az adatbázist (MySQL)
3. Szerkeszd meg a teszteket
4. Írj saját integrációs teszteket!

---

**Sikeres Integrációs Tesztelést! 🎉**
