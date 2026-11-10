# Komponens Dokumentáció: `UserTable.jsx`

A `UserTable` egy prezentációs komponens, amelynek feladata a felhasználókat tartalmazó táblázat megjelenítése. Ez a komponens felel a táblázat fejlécéért és a felhasználói adatok soronkénti renderelésének koordinálásáért.

## Felelősségek

-   A HTML `<table>` struktúra és a táblázat fejlécének (`<thead>`) megjelenítése.
-   A kapott `users` tömbön való végigiterálás.
-   Minden egyes felhasználóhoz egy `UserTableRow` komponens renderelése, átadva neki a szükséges adatokat és eseménykezelőket.
-   Egy üzenet megjelenítése, ha a `users` tömb üres.

---

## Propok (Props)

A komponens a következő `prop`-okat kapja a szülőjétől (`App.jsx`):

-   `users`:
    -   **Típus**: `Array`
    -   **Leírás**: A megjelenítendő felhasználói objektumok tömbje.

-   `editingId`:
    -   **Típus**: `Number | null`
    -   **Leírás**: Annak a felhasználónak az ID-ja, aki éppen szerkesztés alatt áll. Ezt a `prop`-ot közvetlenül továbbadja a `UserTableRow`-nak.

-   `onEditStart`, `onEditCancel`, `onUpdate`, `onDelete`:
    -   **Típus**: `Function`
    -   **Leírás**: Az `App` komponensben definiált eseménykezelő függvények. A `UserTable` ezeket változatlanul továbbadja minden egyes `UserTableRow` komponensnek, hogy azok meg tudják hívni őket a megfelelő felhasználói interakció (pl. gombnyomás) esetén.

---

## Működés

1.  A komponens megkapja a `users` listát.
2.  Ellenőrzi, hogy a `users.length` nagyobb-e nullánál.
3.  **Ha igen**: A `.map()` metódussal végigmegy a `users` tömbön. Minden `user` elemhez létrehoz egy `<UserTableRow>` komponenst. A `key` `prop` beállítása (`key={user.id}`) elengedhetetlen a React számára a lista hatékony kezeléséhez. Minden releváns `prop`-ot (`user`, `isEditing`, `on...` függvények) átad a sorkomponensnek.
4.  **Ha nem**: Egyetlen sort jelenít meg egy cellával (`<td colSpan="5">`), ami tájékoztatja a felhasználót, hogy nincsenek adatok.