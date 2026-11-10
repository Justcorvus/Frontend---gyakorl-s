# 📚 Fullstack CRUD Projekt - Dokumentációs Központ

Üdvözlöm a **Fullstack CRUD Projekt** dokumentációs központjában! 🚀

Ez az oldal az összes szükséges dokumentáció és útmutató központi helyét biztosítja. Válassz egy kategóriát, és kezdd el a tanulást!

---

## 🎯 Gyors Navigáció

### 🔥 KEZDJ ITT - Első Lépések
1. **[README.md](README.md)** - Projekt áttekintés és telepítés
2. **[TANULOI_UTMUTATO.md](TANULOI_UTMUTATO.md)** - Diákok számára készült útmutató
3. **[MVC_MAGYARAZAT.md](MVC_MAGYARAZAT.md)** - Projekt felépítésének megértése

### 📖 Dokumentáció Típusok

<table>
<tr>
<td width="50%">

#### 🎓 **Tanulmányozási Anyagok**
[▶ Tovább](#-tanulmányozási-anyagok)

- MVC Mintázat
- CRUD Fogalmak
- Általános Útmutató

</td>
<td width="50%">

#### 🧪 **Tesztelési Útmutatók**
[▶ Tovább](#-tesztelési-útmutatók)

- Általános Tesztelés
- Unit Tesztek
- Integrációs Tesztek

</td>
</tr>
<tr>
<td width="50%">

#### 🔧 **Komponens Dokumentáció**
[▶ Tovább](#-komponens-dokumentáció)

- App Komponens
- UserForm Komponens
- UserTable Komponens
- UserTableRow Komponens

</td>
<td width="50%">

#### 🚀 **Projekt Információ**
[▶ Tovább](#-projekt-információ)

- Projekt Struktúra
- API Végpontok
- Telepítési Útmutató

</td>
</tr>
</table>

---

## 🎓 Tanulmányozási Anyagok

| Icon | Fájl | Leírás | Szint | Értékelés |
|------|------|--------|--------|-------|
| 📖 | [MVC_MAGYARAZAT.md](MVC_MAGYARAZAT.md) | Az MVC mintázat részletes magyarázata és hogyan használt fel a projektben | Kezdőknek | ⭐ |
| 📚 | [FOGALMAK_CRUD_FULLSTACK.md](FOGALMAK_CRUD_FULLSTACK.md) | CRUD műveletek fogalmainak mélyreható magyarázata | Kezdőknek | ⭐ |
| 📝 | [TANULOI_UTMUTATO.md](TANULOI_UTMUTATO.md) | Teljes tanulási útmutató diákok számára - hol kezdj? | Kezdőknek | ⭐ |

---

## 🧪 Tesztelési Útmutatók

> **Új!** 🎉 Három részletes tesztelési útmutató, amely mind a 3 tesztelési szintet részletesen bemutatja.

| Icon | Fájl | Leírás | Szint | Tartalom |
|------|------|--------|-------|----------|
| 📚 | [TESTING_GENERAL.md](TESTING_GENERAL.md) | **Kezdj itt!** Tesztelési alapfogalmak és 3 szint bemutatása | Beginner | ⭐ **Kötelező** |
| 🧪 | [TESTING_UNIT.md](TESTING_UNIT.md) | Unit tesztek részletesen - mockolt DB, AAA pattern, best practices | Intermediate | ⭐⭐ |
| 🔗 | [TESTING_INTEGRATION.md](TESTING_INTEGRATION.md) | Integrációs tesztek részletesen - valódi DB, CRUD tesztelés | Intermediate | ⭐⭐ |

### 🚀 Tesztelés Gyors Start

```bash
cd backend

# Összes teszt
npm test

# Szintspecifikusan
npm run test:sum               # Egyszerű unit
npm run test:unit             # HTTP unit (mockolt)
npm run test:integration      # Integrációs (valódi DB)

# Watch mód - automatikus újrafuttatás
npm run test:watch

# Debug mód
npm run test:debug
```

---

## 🔧 Komponens Dokumentáció

Részletes dokumentáció az egyes React komponensekhez:

| Komponens | Fájl | Mit csinál? | Újrahasználható? |
|-----------|------|-----------|-----------------|
| 🏠 App | [DOCS_App_component.md](DOCS_App_component.md) | Fő alkalmazás komponens, állapot kezelés | Nem |
| 📝 UserForm | [DOCS_UserForm_component.md](DOCS_UserForm_component.md) | Új felhasználó hozzáadása formján keresztül | Igen |
| 📋 UserTable | [DOCS_UserTable_component.md](DOCS_UserTable_component.md) | Felhasználók listázása táblázatban | Igen |
| 📊 UserTableRow | [DOCS_UserTableRow_component.md](DOCS_UserTableRow_component.md) | Egy felhasználó egy sorban, szerkesztés/törlés | Igen |

---

## 🚀 Projekt Információ

### 📁 Projektstruktúra

```
fullstack/
├── INDEX.md (👈 Te vagy itt!)
├── README.md (Projekt áttekintés)
├── db.sql (Adatbázis séma)
│
├── 📖 Dokumentáció
├── TANULOI_UTMUTATO.md
├── MVC_MAGYARAZAT.md
├── FOGALMAK_CRUD_FULLSTACK.md
├── DOCS_*.md (Komponens dokumentáció)
│
├── 🧪 Tesztelési Útmutatók
├── TESTING_GENERAL.md
├── TESTING_UNIT.md
├── TESTING_INTEGRATION.md
│
├── backend/
│   ├── server.js
│   ├── sum.js
│   ├── package.json
│   ├── tests/
│   │   ├── unit/server.test.js
│   │   └── integration/server.integration.test.js
│   └── sum.test.js
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   └── css/
    └── index.html
```

### 🔌 API Végpontok

```
GET    /api/users           → Összes felhasználó
POST   /api/users           → Új felhasználó
PATCH  /api/users/:id       → Felhasználó módosítása
DELETE /api/users/:id       → Felhasználó törlése

GET    /                    → Szerver teszt
GET    /ping                → Ping teszt (DB-vel)
```

**Részletek:** Lásd [README.md](README.md#api-végpontok)

---

## 📊 Tanulási Útiterv - Ajánlott Sorrend

### 🎯 1. Szakasz - Alapok (2-3 óra)
**Cél:** Projekt megismerése és futtatása

1. ✅ Olvasd: [README.md](README.md)
2. ✅ Olvasd: [TANULOI_UTMUTATO.md](TANULOI_UTMUTATO.md)
3. ✅ **Végezd:** Telepítés és futtatás
4. ✅ **Teszteld:** Frontend böngészőben
5. ✅ **Teszteld:** Backend API (curl)

**Output:** Az alkalmazás működik! ✅

---

### 📖 2. Szakasz - Koncepció (2-3 óra)
**Cél:** Tervezési mintázatok és fogalmak megértése

1. ✅ Olvasd: [MVC_MAGYARAZAT.md](MVC_MAGYARAZAT.md)
2. ✅ Olvasd: [FOGALMAK_CRUD_FULLSTACK.md](FOGALMAK_CRUD_FULLSTACK.md)
3. ✅ **Rajzolj:** MVC szeparációs diagram
4. ✅ **Gondolatmenet:** CRUD műveletek működése

**Output:** Érted a projekt felépítését! 🧠

---

### 🎨 3. Szakasz - Frontend (3-4 óra)
**Cél:** React komponensek megértése

1. ✅ Olvasd: [DOCS_App_component.md](DOCS_App_component.md)
2. ✅ Olvasd: [DOCS_UserForm_component.md](DOCS_UserForm_component.md)
3. ✅ Olvasd: [DOCS_UserTable_component.md](DOCS_UserTable_component.md)
4. ✅ Olvasd: [DOCS_UserTableRow_component.md](DOCS_UserTableRow_component.md)
5. ✅ **Módosíts:** Egy komponenst (pl. szín, szöveg)
6. ✅ **Hozzáadj:** Egy új komponenst

**Output:** Tudod szerkeszteni a frontend-et! 🎨

---

### ⚙️ 4. Szakasz - Backend (3-4 óra)
**Cél:** Express API megértése

1. ✅ Olvasd: [README.md](README.md#api-végpontok)
2. ✅ **Teszteld:** API végpontokat curl-vel
3. ✅ **Tanulmányozd:** `backend/server.js` kódot
4. ✅ **Módosíts:** Egy végpontot
5. ✅ **Hozzáadj:** Egy új végpontot

**Output:** Tudod szerkeszteni a backend-et! ⚙️

---

### 🧪 5. Szakasz - Tesztelés (4-5 óra)
**Cél:** A tesztelés gyakorlatának elsajátítása

1. ✅ Olvasd: [TESTING_GENERAL.md](TESTING_GENERAL.md) - **Kötelező!**
2. ✅ Futtatsd: `npm run test:sum`
3. ✅ Olvasd: [TESTING_UNIT.md](TESTING_UNIT.md)
4. ✅ Futtatsd: `npm run test:unit`
5. ✅ Olvasd: [TESTING_INTEGRATION.md](TESTING_INTEGRATION.md)
6. ✅ Futtatsd: `npm run test:integration`
7. ✅ **Írj:** Saját teszteket

**Output:** Tudod tesztelni a kódot! 🧪

---

### 🚀 6. Szakasz - Projekt (5+ óra)
**Cél:** Saját fejlesztések

1. ✅ Új komponens (frontend)
2. ✅ Új végpont (backend)
3. ✅ Új tesztek
4. ✅ Teljes tesztelés
5. ✅ Dokumentáció

**Output:** Saját fejlesztéseid vannak! 🚀

---

## 🎓 Tanulási Célok

Ez a projekt után meg fogod érteni:

- ✅ **Frontend-Backend kommunikáció** - Hogyan beszél a frontend a backenddel
- ✅ **REST API alapfogalmai** - GET, POST, PUT, DELETE
- ✅ **CRUD műveletek** - Create, Read, Update, Delete
- ✅ **Adatbázis kezelés** - SQL, MySQL alapok
- ✅ **React komponensek** - Újrahasználható UI elemek
- ✅ **Tesztelés szintjei** - Unit, Integrációs, E2E
- ✅ **MVC mintázat** - Projekt szeparáció
- ✅ **Hibakezelés** - Valós problémák megoldása

---

## 🔍 Fájl Keresés

### 🎓 Tanulmányozási Anyagok

```
MVC_MAGYARAZAT.md                    - MVC mintázat
FOGALMAK_CRUD_FULLSTACK.md           - CRUD fogalmak
TANULOI_UTMUTATO.md                  - Diákok útmutatója
```

### 🧪 Tesztelési Útmutatók

```
TESTING_GENERAL.md                   - Általános tesztelés
TESTING_UNIT.md                      - Unit tesztek
TESTING_INTEGRATION.md               - Integrációs tesztek
```

### 🔧 Komponens Dokumentáció

```
DOCS_App_component.md                - App komponens
DOCS_UserForm_component.md           - UserForm komponens
DOCS_UserTable_component.md          - UserTable komponens
DOCS_UserTableRow_component.md       - UserTableRow komponens
```

### 📖 Projekt Dokumentáció

```
README.md                            - Projekt áttekintés
db.sql                               - Adatbázis séma
INDEX.md                             - Ez az oldal
```

---

## 🐛 Hibaelhárítás

### ❌ Mit kell tenni, ha valami nem működik?

1. **Először olvasd el:** [README.md - Hibaelhárítás](README.md#-hibaelhárítás)
2. **Frontend probléma?** [DOCS_App_component.md](DOCS_App_component.md)
3. **Backend probléma?** [README.md - API Végpontok](README.md#api-végpontok)
4. **Tesztelés probléma?** [TESTING_GENERAL.md - Gyakori Hibák](TESTING_GENERAL.md)

---

## 📱 Gyors Linkek

### 👤 Profil és Tanulás
- [Diákok Útmutatója](TANULOI_UTMUTATO.md)
- [Projekt README](README.md)

### 📚 Tanulmányozás
- [MVC Mintázat](MVC_MAGYARAZAT.md)
- [CRUD Fogalmak](FOGALMAK_CRUD_FULLSTACK.md)

### 🎨 Frontend
- [App Komponens](DOCS_App_component.md)
- [UserForm Komponens](DOCS_UserForm_component.md)
- [UserTable Komponens](DOCS_UserTable_component.md)
- [UserTableRow Komponens](DOCS_UserTableRow_component.md)

### ⚙️ Backend
- [API Végpontok](README.md#api-végpontok)
- [Telepítés](README.md#telepítés-és-futtatás)

### 🧪 Tesztelés
- [Tesztelés Általános](TESTING_GENERAL.md)
- [Unit Tesztek](TESTING_UNIT.md)
- [Integrációs Tesztek](TESTING_INTEGRATION.md)

---

## 💡 Tippek

### 📖 Jó Tanulási Szokások

| Tipp | Mit csinálj |
|------|-----------|
| 🎯 **Fókusz** | Egyszerre egy témára koncentrálj |
| 📝 **Jegyzet** | Írj le fontos pontokat papírra |
| 🔧 **Gyakorlat** | Ne csak olvasd, hanem próbáld ki! |
| ❓ **Kérdezz** | Ha nem érted, kérd az útmutatót |
| 🧪 **Teszteld** | Írj teszteket, hogy biztos légy |
| 🚀 **Fejlesztés** | Saját projektek írása a legjobb |

---

## 🎯 Checkpoint - Tudáspróba

### Alap Szint
- [ ] Ismered az MVC mintázatot?
- [ ] Tudod, mi az a CRUD?
- [ ] Tudod elindítani az alkalmazást?

### Közepes Szint
- [ ] Érted az API végpontokat?
- [ ] Tudod módosítani egy komponenst?
- [ ] Tudod futtatni a teszteket?

### Magas Szint
- [ ] Tudsz új komponenst írni?
- [ ] Tudsz új API végpontot írni?
- [ ] Tudsz saját teszteket írni?

---

## 📞 Támogatás

### Mit csinálj, ha elakadsz?

1. **Olvasd el az INDEX.md** (ezt!)
2. **Keresd meg a megfelelő útmutatót** (fenti táblázatok)
3. **Olvasd végig az útmutatót**
4. **Nézd meg a kódot** szövegszerkesztőben
5. **Próbáld ki gyakorlatban** (módosítás, futtatás)

---

## 🎉 Gratulálunk!

Most rendelkezel az összes eszközzel a **Fullstack CRUD Projekt** elsajátításához! 🚀

### Következő Lépések:

1. **Válassz egy témát** a fenti listából
2. **Olvasd el az útmutatót** gondosan
3. **Praktizáld** a megtanult ismereteket
4. **Kérdezz** ha elakadsz
5. **Lépj tovább** az újabb témákra

---

**Sikeres Tanulást és Fejlesztést! 🎓✨**

---

## 📋 Fájl Verzió

- **Készítés:** 2024
- **Utolsó Módosítás:** 2024. április 3.
- **Státusz:** ✅ Naprakész

---

## 📚 Háttér Információ

### Projekt Célok
- ✅ Diákok képzése
- ✅ Fullstack fejlesztés tanítása
- ✅ Praktikus tudás szerzése
- ✅ Valós projektek gyakorlása

### Ki készítette?
Ez az oktatási projekt diákok gyakorlati képzésére lett létrehozva.

### Milyen technológiákat tanul meg?
- React (Frontend)
- Express.js (Backend)
- MySQL (Adatbázis)
- Jest (Tesztelés)
- REST API (Kommunikáció)

---

**Kezdj el most! 🚀 [README.md] → [TANULOI_UTMUTATO.md] → [MVC_MAGYARAZAT.md]**
