# Komponens Dokumentáció: `UserForm.jsx`

A `UserForm` egy "prezentációs" (vagy "buta") komponens. Az egyetlen feladata, hogy megjelenítsen egy űrlapot új felhasználók hozzáadásához, és értesítse a szülő komponenst (`App.jsx`), amikor a felhasználó elküldi az űrlapot.

## Felelősségek

-   Egy űrlap megjelenítése `name` és `email` input mezőkkel.
-   A beírt adatok ideiglenes tárolása a saját belső állapotában.
-   Az űrlap elküldésekor a szülő komponens által biztosított függvény meghívása.

---

## Propok (Props)

A komponens a következő `prop`-okat kapja a szülőjétől (`App.jsx`):

-   `onAddUser`:
    -   **Típus**: `Function`
    -   **Leírás**: Ezt a függvényt hívja meg a komponens, amikor a felhasználó a "Hozzáadás" gombra kattint. Paraméterként egy `{ name, email }` objektumot ad át.

-   `isSubmitting`:
    -   **Típus**: `Boolean`
    -   **Leírás**: Megadja, hogy az alkalmazás éppen feldolgoz-e egy adatküldést. Ha értéke `true`, az input mezők és a gomb le vannak tiltva a többszöri küldés megakadályozása érdekében.

---

## Belső Állapot (State)

-   `const [name, setName] = useState('');`
-   `const [email, setEmail] = useState('');`
    -   **Leírás**: Két külön állapotváltozó az űrlap `name` és `email` input mezőinek értékének tárolására. Ezeket nevezzük "kontrollált komponenseknek", mert az értéküket a React állapot kezeli.

---

## Működés

1.  A felhasználó gépel az input mezőkbe. Az `onChange` eseménykezelők frissítik a `name` és `email` állapotokat minden leütéskor.
2.  A felhasználó a "Hozzáadás" gombra kattint, ami kiváltja az űrlap `onSubmit` eseményét.
3.  A `handleSubmit` függvény lefut:
    -   Megakadályozza az oldal újratöltődését (`event.preventDefault()`).
    -   Ellenőrzi, hogy a mezők ki vannak-e töltve.
    -   Meghívja a `prop`-ként kapott `onAddUser` függvényt a `name` és `email` állapotok aktuális értékével.
    -   Végül kiüríti a belső `name` és `email` állapotokat, ezzel törölve az input mezők tartalmát.