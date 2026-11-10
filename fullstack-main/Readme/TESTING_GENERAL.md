# 🧪 Tesztelés Teljes Útmutatója - Fullstack Projekt

## Bevezetés

A tesztelés a szoftverfejlesztés egyik legfontosabb része. Ez az útmutató segít megérteni, hogyan működik a tesztelés ebben a fullstack projektben.

## 📚 Tesztelés Szintjei

A projektben **3 fő tesztelési szintet** használunk:

### 1️⃣ **Unit Tesztek** (Egység Tesztek)
- **Mit tesztelnek?** Egyedi függvények és komponensek működését
- **Hogyan?** Mockolt adatbázissal, izolált környezetben
- **Miért?** Gyors, megbízható, könnyen debuggolható
- **Fájl:** `backend/tests/unit/server.test.js`
- **Futtatás:** `npm run test:unit`

### 2️⃣ **Integrációs Tesztek** (Integration Tests)
- **Mit tesztelnek?** Több komponens közötti kommunikációt, valódi adatbázissal
- **Hogyan?** Valós adatbázis kapcsolattal
- **Miért?** Ellenőrzi, hogy az összes rész együtt működik
- **Fájl:** `backend/tests/integration/server.integration.test.js`
- **Futtatás:** `npm run test:integration`

### 3️⃣ **Egyszerű Unit Tesztek** (Simple Unit Tests)
- **Mit tesztelnek?** Alapvető logikát
- **Hogyan?** Jest keretrendszerrel
- **Miért?** Tanulási célra, egyszerű teszteléshez
- **Fájl:** `backend/sum.test.js`
- **Futtatás:** `npm run test:sum`

---

## 🚀 Gyors Startolás

### Összes teszt futtatása
```bash
cd backend
npm run test
```

### Specifikus teszt futtatása
```bash
# Csak az egyszerű tesztek
npm run test:sum

# Csak a unit tesztek
npm run test:unit

# Csak az integrációs tesztek
npm run test:integration
```

### Tesztek figyelése (Watch mód)
Automatikusan újrafuttatja a teszteket, amikor módosítasz egy fájlt:
```bash
npm run test:watch
```

### Debug módban
Ha bűnös hibákat szeretnél debuggolni:
```bash
npm run test:debug
```

---

## 📦 Szükséges Eszközök

| Eszköz | Szerepe |
|--------|---------|
| **Jest** | Tesztelési keretrendszer |
| **Supertest** | HTTP kérések szimulálása |
| **mysql2/promise** | Adatbázis driver |
| **Nodemon** | Automatikus szerver újraindítás |

---

## 🎯 Mikor Melyik Tesztet Használd?

### ✅ Unit Tesztet (Mockolt)
- Amikor egy **specifikus végpontot** szeretnél tesztelni
- Amikor **nincs szükséged valós adatbázisra**
- Amikor **gyors visszajelzésre** vár (másodpercek)
- **Előnye:** Gyors, izolált, megbízható

### ✅ Integrációs Tesztet
- Amikor **az egész folyamatot** szeretnél tesztelni
- Amikor **valódi adatbázis-műveletet** szeretnél ellenőrizni
- Amikor **a komponensek közötti kommunikációt** kell vizsgálni
- **Előnye:** Valódi körülmények, konkretos hibakeresés

### ✅ Egyszerű Unit Tesztet
- **Tanulási célra** a tesztelés kezdetén
- **Tiszta logika tesztelésére** (pl. matematikai függvények)
- **Kezdőknek** az első lépésekhez

---

## 🔍 Teszt Struktúra Megértése

### Egy Unit Teszt Szerkezete

```javascript
test('Mit tesztelünk - Amit vártunk', () => {
    // 1. ARRANGE (Felkészülés) - Adatok előkészítése
    const input = 5;
    
    // 2. ACT (Cselekvés) - A függvény meghívása
    const result = myFunction(input);
    
    // 3. ASSERT (Ellenőrzés) - Az eredmény vizsgálata
    expect(result).toBe(10);
});
```

### Egy HTTP Teszt Szerkezete

```javascript
test('GET /api/users - Felhasználókat listázza', async () => {
    const res = await request(app)
        .get('/api/users')
        .expect(200);
    
    expect(res.body).toBeInstanceOf(Array);
});
```

---

## 📊 Teszt Konvenciók

### Teszt Fájl Elnevezése
```
komponens.test.js      - Unit tesztek
komponens.spec.js      - Viselkedés alapú tesztek
komponens.integration.test.js - Integrációs tesztek
```

### Teszt Leírás (Describe)
```javascript
describe('UserController', () => {
    // Összes teszt ebben a csoportban
    test('...', () => {});
});
```

### Teszt Segédek (Hooks)
```javascript
beforeAll(() => {
    // Teszt előtt egyszer fut
});

beforeEach(() => {
    // Minden teszt előtt fut
});

afterEach(() => {
    // Minden teszt után fut
});

afterAll(() => {
    // Teszt után egyszer fut
});
```

---

## 🛠️ Mock Objektumok

A **mock** egy "hamis" objektum, amely a valódi objektum helyét veszi át tesztelés közben.

### Miért Használunk Mockot?

| Ok | Leírás |
|-----|--------|
| **Gyorsaság** | Nem kell valós adatbázisra várni |
| **Izolálás** | Az egyes komponensek függetlenek |
| **Kontrolálhatóság** | Pontosan azt adjuk vissza, amire szükség van |
| **Biztonság** | Nem módosítjuk a valós adatbázist |

### Teszt Adat Mockolása

```javascript
jest.mock('mysql2/promise', () => ({
    createPool: jest.fn(() => ({
        query: mockQuery,
        end: mockEnd,
    })),
}));
```

---

## ✨ Assert Metódusok (Ellenőrzések)

```javascript
// Egyenlőség
expect(5).toBe(5);                          // Pontos egyenlő
expect({a: 1}).toEqual({a: 1});            // Tartalom szerint

// Típus
expect([1, 2]).toBeInstanceOf(Array);

// HTTP Státusz
expect(res.statusCode).toBe(200);

// Stringek
expect('hello').toContain('ell');
expect('hello').toMatch(/llo/);

// Falsy/Truthy
expect(null).toBeFalsy();
expect(true).toBeTruthy();

// Async (ígéretek)
await expect(promise).resolves.toBe(value);
await expect(promise).rejects.toThrow();
```

---

## 🎓 Tanulási Felépítés

### 1. **Alapok** (1-2 óra)
- [ ] Olvasd el ezt az útmutatót
- [ ] Futtasd le a `npm run test:sum` parancsot
- [ ] Érts meg az eredményt

### 2. **Unit Tesztek Mélyrehatóan** (2-3 óra)
- [ ] Nézd meg a `TESTING_UNIT.md` fájlt
- [ ] Futtasd a `npm run test:unit` parancsot
- [ ] Módosíts egy tesztet, és futtasd újra
- [ ] Írj egy új unit tesztet

### 3. **Integrációs Tesztek** (2-3 óra)
- [ ] Olvasd el az `TESTING_INTEGRATION.md` fájlt
- [ ] Futtasd a `npm run test:integration` parancsot
- [ ] Érts meg az adatbázis kommunikációt
- [ ] Írj egy új integrációs tesztet

### 4. **Saját Tesztek Írása** (4-5 óra)
- [ ] Új végpontokhoz unit tesztek
- [ ] Mindenhez integrációs tesztek
- [ ] Teljes teszt suite futtatása

---

## 🐛 Gyakori Hibák és Megoldások

### ❌ Hiba: `Cannot find module`
**Megoldás:** Ellenőrizd a relatív útvonalakat. A teszteknek 2 szinttel fel kell mennie (`../../`) a `server.js`-hez.

### ❌ Hiba: `Jest did not exit one second after the test run has completed`
**Megoldás:** Lezáratni kell az adatbázis-kapcsolatot az `afterAll` hookban:
```javascript
afterAll(async () => {
    if (app.pool) {
        await app.pool.end();
    }
});
```

### ❌ Hiba: `Timeout - Async callback was not invoked`
**Megoldás:** Bizonyosodj meg, hogy a teszt `async` és `await`-et használsz.

### ❌ Hiba: `Port már használatban van`
**Megoldás:** Más port-ot lehet beállítani az `package.json`-ben vagy `.env` fájlban.

---

## 📈 Teszt Borítottság (Coverage)

```bash
npm test -- --coverage
```

Ez megmutatja, hogy a kódod hány százaléka van tesztelve:
- **Statements:** Összes sor
- **Branches:** Összes ágatzat (if/else)
- **Functions:** Összes függvény
- **Lines:** Összes kódsor

### Cél: 80%+ Coverage

---

## 🎯 Best Practices

### ✅ Jó tesztelési szokások

1. **AAA Pattern használata** (Arrange, Act, Assert)
2. **Nomináció:** Teszt neve mondja el, mit csinál
3. **Izolálás:** Egy teszt = egy dolog tesztelése
4. **Mockolás:** Külső függőségek mockolása
5. **Setup/Teardown:** `beforeAll`, `afterAll` használata
6. **Cleanup:** Adatok lezárása tesztek után
7. **Gyorsaság:** Unit < Integration (sebesség)
8. **Determinisztikus:** Ugyanaz az eredmény mindig
9. **Olvashatóság:** Tiszta, érthető teszt kód
10. **Dokumentáció:** Jól dokumentált tesztek

---

## 📚 További Források

- [Jest Dokumentáció](https://jestjs.io/)
- [Supertest GitHub](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://testingjavascript.com/)

---

## 🤔 Kérdések és Válaszok

**Q: Miért kell tesztelésre időt szánni?**
A: Hosszú távon sokkal több időt takarít meg, mint amit rá fordítunk.

**Q: Mikor írok teszteket?**
A: A kód megírása közben vagy után - a "TDD" módszer esetén megírás előtt.

**Q: Mi a különbség a unit és az integrációs tesztek között?**
A: Az unit gyors de izolált, az integrációs lassabb de reális.

---

## 📝 Összefoglaló

| Teszt Típ | Sebesség | Megbízhatóság | Komplexitás | Használat |
|-----------|----------|---------------|-------------|-----------|
| **Unit** | ⚡ Gyors | ⚖️ Közepes | 🎯 Alacsony | Gyakori |
| **Integrációs** | 🐢 Lassú | ✅ Magas | 🔧 Közepes | Néhányszor |
| **E2E** | 🐢 Nagyon lassú | ✅ Legmagasabb | 🌀 Magas | Ritkán |

---

## 🚀 Következő Lépések

1. Olvasd el a **TESTING_UNIT.md** fájlt a unit tesztek részleteihez
2. Olvasd el az **TESTING_INTEGRATION.md** fájlt az integrációs tesztek részleteihez
3. Futtasd le a teszteket és kísérletezz
4. Írj saját teszteket az új végpontokhoz

---

**Sikeres tesztelést! 🎉**
