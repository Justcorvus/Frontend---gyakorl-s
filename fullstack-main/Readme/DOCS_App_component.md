# Komponens Dokumentáció: `App.jsx`

Az `App` komponens a felhasználókezelő alkalmazás központi vezérlőegysége. Felelős az alkalmazás-szintű állapotok kezeléséért, az API-val való kommunikációért, és a többi alkomponens összehangolásáért.

## Felelősségek

-   **Állapotkezelés**: Itt tárolódnak a felhasználók listája, a betöltési és hibaállapotok, valamint az, hogy melyik felhasználó van éppen szerkesztés alatt.
-   **Adatkezelés**: Ez a komponens végzi a backend API felé irányuló összes HTTP kérést (CRUD műveletek).
-   **Komponens-koordináció**: Adatokat és függvényeket ad át `prop`-ként a gyerek komponenseknek (`UserForm`, `UserTable`).

---

## Állapotok (State)

Az `App` komponens a `useState` hook segítségével a következő állapotokat kezeli:

-   `const [users, setUsers] = useState([]);`
    -   **Típus**: `Array`
    -   **Leírás**: Ebben a tömbben tároljuk a backendről lekért felhasználói objektumokat.

-   `const [loading, setLoading] = useState(true);`
    -   **Típus**: `Boolean`
    -   **Leírás**: Igaz (`true`), amíg az adatok betöltése zajlik a backendről. Ezalatt egy "Betöltés..." üzenetet jelenítünk meg.

-   `const [isSubmitting, setIsSubmitting] = useState(false);`
    -   **Típus**: `Boolean`
    -   **Leírás**: Igaz (`true`), amíg egy új felhasználó létrehozása vagy egy meglévő módosítása zajlik. Ezalatt letilthatjuk a gombokat, hogy a felhasználó ne tudjon dupla kérést küldeni.

-   `const [error, setError] = useState(null);`
    -   **Típus**: `String | null`
    -   **Leírás**: Ha hiba történik az API kommunikáció során, itt tároljuk a hibaüzenetet, amit megjelenítünk a felhasználónak. Alapértelmezetten `null`.

-   `const [editingId, setEditingId] = useState(null);`
    -   **Típus**: `Number | null`
    -   **Leírás**: Annak a felhasználónak az `id`-ját tárolja, aki éppen szerkesztési módban van. Ha senki, az értéke `null`.

---

## Függvények (Handlers)

Ezek a függvények végzik a tényleges munkát, és `prop`-ként kerülnek továbbadásra.

-   `fetchData()`: Aszinkron függvény, ami `axios.get` segítségével lekéri az összes felhasználót a `/api/users` végpontról, majd frissíti a `users` állapotot.

-   `handleAddUser(userData)`: Aszinkron függvény, ami `axios.post` segítségével új felhasználót hoz létre. Siker esetén újra meghívja a `fetchData()`-t a lista frissítéséhez.

-   `handleDelete(id)`: Aszinkron függvény, ami egy megerősítő ablak után `axios.delete` segítségével törli a megadott `id`-jű felhasználót. Siker esetén frissíti a listát.

-   `handleUpdate(id, updatedData)`: Aszinkron függvény, ami `axios.patch` segítségével módosítja a megadott `id`-jű felhasználó adatait. Siker esetén frissíti a listát és megszünteti a szerkesztési módot.

-   `handleEditStart(user)`: Beállítja az `editingId` állapotot a kiválasztott felhasználó `id`-jára, ezzel szerkesztési módba kapcsolva a megfelelő sort.

-   `handleEditCancel()`: Visszaállítja az `editingId` állapotot `null`-ra, ezzel megszakítva a szerkesztési módot.

---

## Renderelés

1.  **Feltételes renderelés**: Először ellenőrzi a `loading` és `error` állapotokat. Ha bármelyik igaz, csak egy állapotüzenetet jelenít meg.
2.  **Komponensek renderelése**: Ha nincs betöltés vagy hiba, megjeleníti a `UserForm` és `UserTable` komponenseket, és átadja nekik a szükséges állapotokat és kezelőfüggvényeket `prop`-ként.