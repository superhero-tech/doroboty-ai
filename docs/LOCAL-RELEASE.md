# Lokalne testy prototypu — 15 listopada 2026

## Uzgodniony zakres

Mała grupa, wspólny ekran na komputerze Agaty, wyłącznie fikcyjne dane.
Adres lokalny nie daje dostępu osobom na innych komputerach. Nie jest to
uruchomienie prawdziwej rekrutacji. Wybór persony zastępuje logowanie.

## Uruchomienie konkretnej wersji

Wymagany Node 24 i zależności zgodne z `package-lock.json`. Na tym komputerze
Node i npm są w `../.local-tools/node-v24.22.3-win-x64/`.

```powershell
$env:Path = (Resolve-Path '../.local-tools/node-v24.22.3-win-x64').Path + ';' + $env:Path
$env:PLAYWRIGHT_CHANNEL = 'chrome'
npm run check
npm run preview -- --port 3002
```

Przeglądarka: `http://127.0.0.1:3002/`. Zamknięcie procesu podglądu kończy
dostęp. Serwer nasłuchuje tylko na tym komputerze. Nie zmieniaj adresu nasłuchu
na wszystkie interfejsy sieciowe w ramach tego zakresu testów.

Zależności są już zainstalowane. Na nowej kopii najpierw wykonuje się `npm ci`.
Kontrole niczego nie publikują. Wynik `dist/` jest samodzielnym statycznym
wydaniem; nie udostępniaj całego katalogu repozytorium ani historii Git.
Raport HTML identyfikuje sprawdzone pliki przez odcisk treści, ponieważ bieżące
poprawki pozostają lokalne, bez nowego commita i bez wysyłania do GitHub.

## Kontrola przed każdą sesją

1. Użyj oddzielnego profilu przeglądarki albo okna prywatnego. W trybie prywatnym
   zapisy znikają po zamknięciu okna; przed zamknięciem wykonaj eksport.
2. Otwórz adres, wybierz Annę, przejdź do Profilu i wczytaj fikcyjny przykład
   projektu. Zapisz go, odśwież i otwórz podgląd oczami rekrutera.
3. Sprawdź skrót własnego wkładu, szczegóły „Opis kandydata” i lokalny PDF CV.
4. Sprawdź eksport scenariusza w Ustawieniach. W odrębnym profilu przeglądarki
   zaimportuj go i sprawdź projekt. Nie testuj przywracania na jedynej kopii.
5. Nie rozpoczynaj sesji, jeśli ekran jest pusty, zapis znika po odświeżeniu,
   nie działa rozwinięcie opisu albo import odrzuca świeżo wykonany eksport.

Projekt z profilu nie jest dołączany do wysłanej aplikacji. Podgląd rekrutera
działa w lokalnym scenariuszu; link nie przekazuje lokalnych danych innym osobom.
Warsztat `/opis-projektu` ma osobny szkic, nieuwzględniony w eksporcie scenariusza.
Jego treść należy osobno skopiować. Prowadź go w jednej karcie.

## Zapis, wycofanie i odzyskiwanie

Przed zmianą wersji zachowaj eksport scenariusza i kopię całego działającego
`dist/`, wraz z identyfikatorem źródeł z raportu. Kopia musi obejmować HTML,
wszystkie pliki assets, CV i dane case; sam stary HTML nie wystarczy.

Jeżeli nowa wersja nie przechodzi kontroli: zatrzymaj podgląd, uruchom zachowaną
kopię katalogu zamiast nowego wydania, używając tego samego lokalnego adresu.
Na tym komputerze próbę powrotu sprawdzono z kopią
`artifacts/rollback-baseline/`. Katalog jest lokalny i pomijany przez Git.
Nie usuwaj danych witryny. Zmiana portu daje inne miejsce przechowywania danych:
wtedy przenieś scenariusz przez eksport/import. Bieżące poprawki nie zmieniają
wersji schematu 1; zgodność starszych danych obejmują testy.

Przy błędzie odczytu zachowaj „Poprzedni zapis” w Ustawieniach. Nie resetuj
jedynej kopii. Przy braku miejsca skopiuj lub wyeksportuj treść przed zamknięciem.
Przy komunikacie o drugiej karcie skopiuj niezapisany tekst i odśwież stronę;
odrzucona zmiana nie nadpisuje nowszego scenariusza.

## Zauważenie problemu i odpowiedzialność

Podczas wspólnego testu prowadząca widzi wynik razem z uczestnikiem. Zgłoszenie
powinno podawać ekran, krok, oczekiwany wynik i widoczny komunikat — bez
prawdziwych danych i CV. Bezpieczne błędy importu i zapisu są widoczne w aplikacji.
Nie ma centralnego zbierania błędów ani automatycznych alarmów. W razie pustego
ekranu prowadząca przerywa test, zachowuje lokalny zapis i sprawdza konsolę
przeglądarki oraz okno serwera. Nie publikuje treści scenariusza z konsoli.

Agata potwierdziła 15 listopada 2026, że prowadzi test, przyjmuje zgłoszenia,
przerywa sesję przy błędzie i przywraca zapis według tej instrukcji. Ma dostęp
do lokalnego komputera. Ta instrukcja nie potwierdza dostępu do nieistniejącego
hostingu internetowego.

Nie ma opłat za API ani serwera danych. Aplikacja pobiera lokalne pliki i wykonuje
operacje w przeglądarce. Nie przeprowadzono testu obciążenia dla grupy pracującej
na osobnych komputerach; nie jest to uzgodniony sposób testowania.

## Jeśli zakres zmieni się na publiczny link

Ponownie sprawdź raport po wyborze hostingu. Osobnego sprawdzenia wymagają HTTPS,
konfiguracja i wersja wdrożenia, główny scenariusz pod docelowym adresem, logi,
test dostarczenia alarmu i rzeczywiste koszty. Nie traktuj lokalnych testów jako
potwierdzenia tych punktów. Prawdziwe dane kandydatów wymagają odrębnej architektury
kont, uprawnień i przechowywania danych.

Skuteczność formatki bada się osobno według
[planu mierników](tasks/accepted-profile-2026-11-11/metrics.md).
Testy techniczne nie dowodzą, że rekruterzy rzadziej dopytują o samodzielny wkład.
