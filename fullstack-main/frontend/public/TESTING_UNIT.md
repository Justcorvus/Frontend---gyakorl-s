# 🧪 Unit Tesztek (Egység Tesztek) Részletes Útmutatója

## Mi az a Unit Teszt?

A **unit teszt** egy olyan teszt, amely **egy izolált függvényt vagy komponenst** tesztel, **külső függőségek nélkül** (például adatbázis nélkül).

### Jellemzői:
- ⚡ **Gyors** - Egy teszt milliszekundumok alatt fut
- 🎯 **Specifikus** - Egy dologra fókuszál
- 🏠 **Izolált** - Nem függ más részektől
- 🔄 **Megismételhető** - Mindig ugyanaz az eredmény
- 💡 **Tiszta** - Könnyű megérteni és módosítani

---

## 🏗️ Unit Tesztek Struktúrája

### AAA Pattern (Arrange, Act, Assert)

```javascript
test('összeadja az 1 + 2-t, hogy 3-at kapjunk', () => {
    // 1. ARRANGE (Felkészülés) - Adatok beállítása
    const a = 1;
    const b = 2;
    
    // 2. ACT (Cselekvés) - Függvény meghívása
    const result = sum(a, b);
    
    // 3. ASSERT (Ellenőrzés) - Eredmény ellenőrzése
    expect(result).toBe(3);
});
```

---

## 📁 A Projekt Unit Tesztjei

### 1. Egyszerű Unit Teszt: `sum.test.js`

#### 📝 Fájl tartalom:
```javascript
const sum = require('./sum');

test('összeadja az 1 + 2-t, hogy 3-at kapjunk', () => {
    expect(sum(1, 2)).toBe(3);
});
```

#### 🔍 Mit teszt?

| Rész | Leírás |
|------|--------|
| `require('./sum')` | Importálja az `sum.js` fájlt |
| `test(...)` | Definiál egy új tesztet |
| `sum(1, 2)` | Meghívja a `sum` függvényt |
| `expect().toBe()` | Ellenőrzi, hogy az eredmény = 3 |

#### 🚀 Futtatás:
```bash
npm run test:sum
```

#### 🎯 Mi történik?
1. A `sum(1, 2)` függvény meghívódik
2. Az eredmény: `3`
3. Jest ellenőrzi: `3 === 3`?
4. ✅ PASS - Teszt sikeres!

---

### 2. HTTP Endpoint Unit Tesztek: `server.test.js`

Ez a fájl az **Express API végpontokat** teszteli **mockolt adatbázissal**.

#### 📝 Mit csinál?

```javascript
// 1. MOCK SETUP (Hamis adatbázis)
const mockQuery = jest.fn();
jest.mock('mysql2/promise', () => ({
    createPool: jest.fn(() => ({
        query: mockQuery,
        end: mockEnd,
    })),
}));

// 2. IMPORT
const request = require('supertest');
const app = require('../../server');

// 3. TESZTEK
describe('Unit Tesztek (Mockolt)', () => {
    test('GET / - Szerver válaszol', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Hello, a backend szerver fut!');
    });
});
```

#### 🧩 Komponensek Magyarázata

##### Mock Objektum
```javascript
const mockQuery = jest.fn();
```
- Ez egy **testedény függvény** - nem csinál semmi valódit
- Értéke azt adja vissza, amit mi mondunk neki

##### Mock Beállítása
```javascript
jest.mock('mysql2/promise', () => ({
    createPool: jest.fn(() => ({
        query: mockQuery,
        // ... mock objektum
    })),
}));
```
- Ez azt mondja: when `mysql2/promise` importálódik, **használd ezt a fake verziót**
- A `query` legyen a `mockQuery` függvény

##### Supertest - HTTP Kérések Szimulálása
```javascript
const res = await request(app).get('/');
```
- `request(app)` - Készít egy HTTP klienset
- `.get('/')` - GET kérés az `/` útvonalra
- `res` - A válasz az API-tól

---

## 🔧 Az Unit Tesztek Megértése

### Teszt 1: GET / (Root)

```javascript
test('GET / - Szerver válaszol', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hello, a backend szerver fut!');
});
```

**Mit tesztel?**
- Que az szerver `GET /` kérésre válaszol
- Hogy a státusz `200` (OK)
- Hogy az üzenet pontos

**Lépések:**
1. HTTP GET kérést küldünk az `/` útvonalra
2. Ellenőrizzük, hogy a szerver válaszol
3. Statusz 200-nak kell lennie
4. Üzenet legyen: `Hello, a backend szerver fut!`

---

### Teszt 2: GET /ping (Mockolt Adatbázis)

```javascript
test('GET /ping - Mockolt adatbázis válasz', async () => {
    // ARRANGE: Mock visszaértéket beállítása
    mockQuery.mockResolvedValueOnce([[{ solution: 2 }], {}]);

    // ACT: API kérés
    const res = await request(app).get('/ping');

    // ASSERT: Ellenőrzések
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(2);
});
```

**Fázisok Lépésről Lépésre:**

1. **ARRANGE (Felkészülés)**
   ```javascript
   mockQuery.mockResolvedValueOnce([[{ solution: 2 }], {}]);
   ```
   - A mock azt mondja: "ha lekérdezik, ezt add vissza"
   - Az adatbázis helyett a mock választ

2. **ACT (Cselekvés)**
   ```javascript
   const res = await request(app).get('/ping');
   ```
   - HTTP GET kérés az `/ping`-re
   - A szerver meghívja a mockolt adatbázist
   - A mock visszaadja az értéket

3. **ASSERT (Ellenőrzés)**
   ```javascript
   expect(res.statusCode).toBe(200);
   expect(res.body.result).toBe(2);
   ```
   - Statusz 200?
   - Eredmény 2?

---

### Teszt 3: Hibaág - Validáció

```javascript
test('POST /api/users - Hibaág: hiányzó név validáció', async () => {
    // Szándékosan hiányzó név mező
    const res = await request(app)
        .post('/api/users')
        .send({ email: 'nincs_nev@test.com' });

    // Ellenőrizzük a hibát
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('A név és az email mező kitöltése kötelező.');
});
```

**Mit tesztel?**
- Hogy a szerver **elutasítja** a hibaos kéréseket
- Helyes HTTP státusz: `400` (Bad Request)
- Helyes hibaüzenet

**Miért fontos?**
- Az "happy path" mellett a **szomorú útvonalat** is kell tesztelni
- Hibadobás tesztelése olyan fontos, mint a siker

---

## 🛠️ Mock Objektumok Részletesen

### Mit tesz a Mock?

```javascript
//❌ VALÓDI (nincs mock)
const result = database.query('SELECT * FROM users');
// Ez valóban hozzáfér az adatbázishoz - LASSÚ!

//✅ MOCK VERZIÓ
const mockQuery = jest.fn();
mockQuery.mockResolvedValueOnce([/* adat */]);
// Ez csak "tettet" - GYORS!
```

### Mock Típusai

#### 1. Egyszerű Mock (Return Value)
```javascript
mockQuery.mockReturnValueOnce({ id: 1, name: 'János' });
```
- Azonnal visszaad egy értéket

#### 2. Async Mock (Promise)
```javascript
mockQuery.mockResolvedValueOnce({ id: 1, name: 'János' });
```
- Egy Promise-t ad vissza (async/await-hez)

#### 3. Mock Hiba
```javascript
mockQuery.mockRejectedValueOnce(new Error('DB Error!'));
```
- Egy errort dob

#### 4. Mock Többször
```javascript
mockQuery
    .mockResolvedValueOnce({ id: 1 })
    .mockResolvedValueOnce({ id: 2 })
    .mockResolvedValueOnce({ id: 3 });
// Minden hívás más értéket kap
```

---

## 🔄 Teszt Lifecycle Hooks

### beforeEach - Minden Teszt Előtt

```javascript
describe('Unit Tesztek', () => {
    beforeEach(() => {
        mockQuery.mockClear();  // Mock nullázása
    });

    test('Teszt 1', () => {
        // mockQuery üres lesz
    });

    test('Teszt 2', () => {
        // mockQuery újra üres lesz
    });
});
```

**Miért fontos?**
- Az egyik teszt eredménye ne befolyásolja a másikét
- "Tiszta állapot" minden teszthez

### afterAll - Teszt Vége

```javascript
afterAll(async () => {
    if (app.pool && app.pool.end) {
        await app.pool.end();  // Kapcsolat lezárása
    }
});
```

**Miért fontos?**
- Erőforrások felszabadítása
- Nincs "nyitott kapcsolat" hibák
- Jest cleanly exit-el

---

## 📊 Assertion Metódusok

### Egyenlőség Ellenőrzése

```javascript
// Pontos egyenlő (===)
expect(5).toBe(5);
expect(true).toBe(true);

// Tartalom szerint (objektumok)
expect({ a: 1 }).toEqual({ a: 1 });

// Nem egyenlő
expect(5).not.toBe(4);
```

### Típus Ellenőrzése

```javascript
// Array
expect([1, 2]).toBeInstanceOf(Array);
expect([1, 2]).toHaveLength(2);

// Null/Undefined
expect(null).toBeFalsy();
expect(undefined).toBeFalsy();
expect(true).toBeTruthy();
```

### String / Szöveg Ellenőrzése

```javascript
// Tartalmaz
expect('hello world').toContain('world');

// Regex
expect('hello@example.com').toMatch(/.*@example\.com/);

// Hossz
expect('abc').toHaveLength(3);
```

### HTTP Státusz és Válasz

```javascript
// Státusz
expect(res.statusCode).toBe(200);
expect(res.status).toBe(201);  // Alternative

// Egy válasz megvizsgálása
expect(res.body.id).toBeDefined();
expect(res.body.users).toEqual([{id: 1, name: 'János'}]);

// Headers
expect(res.headers['content-type']).toContain('application/json');
```

---

## 🎯 Unit Teszt Gyakorló Feladatok

### 1. **Egyszerű Összeadás**

```javascript
// sum.test.js
test('2 + 3 = 5', () => {
    expect(sum(2, 3)).toBe(5);
});

test('0 + 0 = 0', () => {
    expect(sum(0, 0)).toBe(0);
});
```

### 2. **Array Hossz**

```javascript
test('Array length ellenőrzése', () => {
    expect([1, 2, 3]).toHaveLength(3);
    expect([]).toHaveLength(0);
});
```

### 3. **Objektum Tartalom**

```javascript
test('User objektum', () => {
    const user = { id: 1, name: 'Péter', email: 'peter@example.com' };
    expect(user.name).toBe('Péter');
    expect(user).toHaveProperty('email');
});
```

### 4. **API Endpoint**

```javascript
test('POST /api/data - Adat mentése', async () => {
    const res = await request(app)
        .post('/api/data')
        .send({ title: 'Teszt' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
});
```

---

## 🐛 Gyakori Problémák és Megoldások

### ❌ Hiba: Mock Nem Működik

```javascript
// ROSSZ ❌
const mockQuery = jest.fn();
// Nem mockoltuk az importot!

// JÓ ✅
jest.mock('mysql2/promise', () => ({
    createPool: jest.fn(() => ({
        query: mockQuery,
        end: mockEnd,
    })),
}));
```

### ❌ Hiba: Timeout

```javascript
// ROSSZ ❌
test('GET /users', () => {  // Nem async!
    const res = await request(app).get('/users');  // await szükséges
});

// JÓ ✅
test('GET /users', async () => {  // async!
    const res = await request(app).get('/users');
});
```

### ❌ Hiba: Lezáratlan Kapcsolat

```javascript
// ROSSZ ❌
afterAll(() => {
    // Nincs pool.end()
});

// JÓ ✅
afterAll(async () => {
    if (app.pool) {
        await app.pool.end();
    }
});
```

---

## 📈 Teszt Futtatás és Debug

### Teszt Futtatása

```bash
# Egy fájl
npm run test:sum

# Egy teszt eset
npm test -- sum.test.js --testNamePattern="összeadja"

# Watch módban (automatikus újrafuttatás)
npm run test:watch

# Debug info-val
npm run test:debug
```

### Output Megértése

```
PASS  sum.test.js (45ms)
  ✓ összeadja az 1 + 2-t, hogy 3-at kapjunk (5ms)

PASS  server.test.js (200ms)
  Unit Tesztek (Mockolt)
    ✓ GET / - Szerver válaszol (20ms)
    ✓ GET /ping - Mockolt adatbázis válasz (15ms)
    ✓ POST /api/users - Hibaág: hiányzó név validáció (25ms)
```

| Jelölés | Jelentés |
|---------|----------|
| ✓ | Siker (PASS) |
| ✕ | Kudarc (FAIL) |
| (45ms) | Teszt futási ideje |
| PASS/FAIL | Fájl végeredménye |

---

## 🎓 Tanulási Útiterv

### 1. Szakasz - Alapok (30 perc)
- [ ] Olvasd ezt az útmutatót
- [ ] Futtasd: `npm run test:sum`
- [ ] Érts meg az output-ot

### 2. Szakasz - AAA Pattern (30 perc)
- [ ] Nézz meg egy unit tesztet
- [ ] Azonosítsd: Arrange, Act, Assert
- [ ] Rajzolj egy diagramot

### 3. Szakasz - Supertest (30 perc)
- [ ] Nézz meg egy HTTP tesztet
- [ ] Próbálj új kérést hozzáadni
- [ ] Módosíts egy assert-et

### 4. Szakasz - Mock-ok (45 perc)
- [ ] Érts meg, mi az a mock
- [ ] Nézz meg egy mock-olt tesztet
- [ ] Írj egy új mock-olt tesztet

### 5. Szakasz - Saját Tesztek (60+ perc)
- [ ] Új unit tesztet a `sum` függvényre
- [ ] Új HTTP tesztet az API-ra
- [ ] Teszteld a hibaágakat is

---

## ✅ Best Practices

### ✨ Jó Unit Tesztek

1. **Egy teszt = Egy dolog**
   ```javascript
   // ROSSZ ❌
   test('User funkciók', () => {
       expect(createUser()).toBeDefined();
       expect(deleteUser()).toBeDefined();
   });

   // JÓ ✅
   test('User-t létrehoz', () => {
       expect(createUser()).toBeDefined();
   });
   test('User-t törli', () => {
       expect(deleteUser()).toBeDefined();
   });
   ```

2. **Teljes Teszt Neve**
   ```javascript
   // ROSSZ ❌
   test('it works', () => { });

   // JÓ ✅
   test('POST /api/users - hiányzó email-nél 400-as hibát ad', () => { });
   ```

3. **AAA Pattern**
   ```javascript
   // ROSSZ ❌
   test('sum', () => {
       expect(sum(1, 2)).toBe(3);
   });

   // JÓ ✅
   test('összeadja az 1 + 2-t', () => {
       const result = sum(1, 2);
       expect(result).toBe(3);
   });
   ```

---

## 📚 Összefoglaló

| Koncepció | Mit jelent | Miért fontos |
|-----------|-----------|-------------|
| **Mock** | Hamis objektum valódi helyett | Gyorsaság, izolálás |
| **AAA Pattern** | Arrange, Act, Assert | Tiszta tesztek |
| **Async** | Aszinkron kód (await-tel) | API-k HTTP kezelése |
| **beforeEach** | Tiszta állapot minden teszthez | Tesztek függetlensége |
| **Assertion** | Ellenőrzés (expect) | Teszt sikere/kudarca |

---

## 🚀 Következő Lépések

1. Futtasd le: `npm run test:unit`
2. Nézz meg egy tesztet a szövegszerkesztőben
3. Támogatás a **TESTING_INTEGRATION.md** fájlban az integrációs tesztekhez
4. Írj saját unit teszteket!

---

**Happy Testing! 🎉**
