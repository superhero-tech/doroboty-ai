# Publikacja połączonego prototypu DoRoboty.ai

## Co zawiera ta wersja

Jedna publikacja ma trzy połączone części:

- `/` — zaakceptowany landing z oryginalnym robotem i aktualnymi fontami.
- `/portal/` — zaakceptowany portal; wyniki w `wyniki.html`, oferta w `oferta.html`.
- `/profil/#/app/profil` — profil z formatką, szkicem i zapisem projektu.
- `/profil/#/app/profil/podglad` — skrót dla rekrutera i „Opis kandydata”.
- `/profil/#/opis-projektu` — osobny warsztat formatki.

Strona główna i portal używają tych samych dziewięciu fikcyjnych ofert oraz
tej samej listy zapisanych ofert. Pierwotna scena specjalizacji na landingu
pozostaje ilustracyjnym przykładem. Świeży profil pokazuje fikcyjną Annę i jej
przykładowy projekt. Istniejące scenariusze w przeglądarce pozostają zachowane.

## Gotowy folder i podgląd

W katalogu aplikacji uruchom `npm run build:publication`.
Powstaje folder **publish**, z własnym `index.html`, katalogami `portal` i `profil`
oraz identyfikatorem plików w `release.json`. To jedyny folder przeznaczony do
Netlify. `dist` zawiera samą część aplikacyjną; nie ma pełnego landingu i portalu.

`npm run preview:publication` udostępnia dokładnie `publish` pod
http://127.0.0.1:3015/ . Źródła i materiały badawcze nie są serwowane.

## Wgranie do istniejącego projektu Netlify

Zaloguj się do konta, które zarządza właściwą stroną. Otwórz jej panel i pole
przesyłania w **Production deploys**. Przeciągnij **publish**; nie przesyłaj
całego repozytorium ani samych katalogów `portal` lub `profil`.
Przy nowym projekcie można użyć Netlify Drop. Przed przesłaniem sprawdź limity
i koszty swojego planu; lokalny audyt nie ma dostępu do rozliczeń konta.

Instrukcja dostawcy sprawdzona 15 listopada 2026:
[Netlify Drop](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/).
Nie opublikowano tej wersji automatycznie.

## Kontrola pod publicznym adresem

Agata jako właścicielka prototypu przeprowadza kontrolę przed zaproszeniem grupy.
Otwórz stronę także w oknie prywatnym i sprawdź, czy dostęp odpowiada zamierzeniu.

1. Strona główna pokazuje właściwy landing i robota, a nie kursową stronę startową.
2. Wyszukanie Python prowadzi do portalu, a kliknięcie roli otwiera jej szczegóły.
3. Zapisana oferta jest widoczna zarówno na landingu, jak i w portalu.
4. „Mój profil” otwiera formatkę; świeży podgląd pokazuje Annę i przykład projektu.
5. Zapisz zmianę, odśwież i sprawdź odczyt. Rozwiń „Opis kandydata” i otwórz CV.
6. Z profilu wróć do landingu i portalu. Sprawdź te kroki na telefonie.
7. Porównaj `release.json` z lokalnym plikiem; sprawdź HTTPS, konfigurację
   widoczności, dostęp do diagnostyki i test powiadomienia o awarii.

Nie zapraszaj uczestników przy pustym ekranie, znikającym zapisie, błędnym wyglądzie
lub niedziałającym CV. Lokalny wynik testów nie potwierdza tych punktów w Netlify.

## Zachowanie danych i wycofanie

Przed zmianą wydania zachowaj jego kompletną kopię i `release.json`. Scenariusz
profilu wyeksportuj w Ustawieniach. Eksport nie obejmuje listy zapisanych ofert
portalu ani osobnego szkicu warsztatu; treść warsztatu skopiuj oddzielnie.
Przy zmianie domeny/portu przeglądarka używa odrębnego magazynu danych.

W Netlify poprzednie poprawne wydanie można przywrócić przyciskiem **Publish
Deploy** na stronie udanego wdrożenia. Weryfikacja dostępu do tej operacji
w Twoim koncie pozostaje do wykonania. Nie cofaj automatycznie do wcześniejszej,
niewłaściwej wersji strony tylko dlatego, że jest na liście. Przy pierwszym
wydaniu całości przerwij dystrybucję linku do czasu poprawy, jeżeli nie ma dobrej
wersji do przywrócenia. Zmiana plików nie usuwa danych localStorage.
[Procedura Netlify](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/#rollbacks).

Zgłoszenie problemu powinno podawać adres, ekran, czynność i komunikat, bez
prawdziwych danych kandydatów. Nie ma rzeczywistego logowania, wysyłki aplikacji,
newslettera ani usług AI. Wszystkie dane do testów muszą być fikcyjne.

## Zakres raportów

`production-readiness.html` jest historyczną oceną części aplikacyjnej do testów
lokalnych. Nie potwierdzał połączenia z landingiem i portalem.
`publication-readiness.html` ocenia nowy wspólny folder; zachowuje osobno
sprawdzenia lokalne i oczekujące kontrole właściwego wdrożenia Netlify.
