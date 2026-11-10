# Komponens Dokumentáció: `UserTableRow.jsx`

A `UserTableRow` komponens felelős egyetlen felhasználó adatainak megjelenítéséért egy táblázat sorában (`<tr>`). Ez egy "okos" prezentációs komponens, mert nemcsak megjeleníti az adatokat, hanem kezeli a saját szerkesztési állapotát is.

## Felelősségek

-   Egy felhasználó adatainak (ID, név, email, dátum) megjelenítése táblázatcellákban (`<td>`).
-   Annak eldöntése, hogy a felhasználó adatait egyszerű szövegként vagy szerkeszthető `input` mezőként jelenítse meg.
-   A "Szerkesztés" és "Törlés" gombok, illetve a "Mentés" és "Mégse" gombok megjelenítése a szerkesztési állapottól függően.
-   A szerkesztett adatok ideiglenes tárolása a saját belső állapotában.

---

## Propok (Props)

-   `user`:
    -   **Típus**: `Object`
    -   **Leírás**: A megjelenítendő felhasználó objektuma (pl. `{ id: 1, name: 'Teszt Elek', ... }`).

-   `isEditing`:
    -   **Típus**: `Boolean`
    -   **Leírás**: Igaz (`true`), ha ez a sor éppen szerkesztési módban van. Ezt a `prop`-ot használja a komponens a feltételes rendereléshez.

-   `onEditStart`, `onEditCancel`, `onUpdate`, `onDelete`:
    -   **Típus**: `Function`
    -   **Leírás**: A szülő (`App.jsx`) által biztosított eseménykezelő függvények, amelyeket a megfelelő gombokra kattintva hív meg a komponens.

---

## Belső Állapot (State)

-   `const [editedName, setEditedName] = useState(user.name);`
-   `const [editedEmail, setEditedEmail] = useState(user.email);`
    -   **Leírás**: Amikor a sor szerkesztési módba kerül, ezek az állapotváltozók tárolják az `input` mezők aktuális értékeit. Kezdeti értéküket a `prop`-ként kapott `user` objektumból veszik.

---

## Működés

1.  **Feltételes Renderelés**: A JSX kód egy ternáris operátort (`isEditing ? ... : ...`) használ.
    -   Ha `isEditing` igaz, akkor `input` mezőket és a "Mentés"/"Mégse" gombokat renderel.
    -   Ha `isEditing` hamis, akkor sima szöveges `<td>` elemeket és a "Szerkesztés"/"Törlés" gombokat renderel.

2.  **Szerkesztés**: Amikor a felhasználó gépel az `input` mezőkbe, az `onChange` esemény frissíti az `editedName` és `editedEmail` belső állapotokat.

3.  **Mentés**: A "Mentés" gombra kattintva lefut a `handleUpdate` függvény, ami meghívja a `prop`-ként kapott `onUpdate` függvényt, átadva neki a felhasználó `id`-ját és a belső állapotokban tárolt új adatokat.

4.  **Állapot Szinkronizálása (`useEffect`)**: A `useEffect` hook biztosítja, hogy ha a külső `user` `prop` megváltozik (pl. egy sikeres mentés után az `App` komponens frissíti a listát), a `UserTableRow` belső `editedName` és `editedEmail` állapota is frissüljön. Ez megakadályozza, hogy elavult adat maradjon a komponensben.

---