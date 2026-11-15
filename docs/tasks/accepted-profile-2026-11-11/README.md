# Zaakceptowany prototyp profilu — 11 listopada 2026

**Status wyglądu i obecnych funkcji:** zaakceptowany przez użytkowniczkę: „teraz mi się podoba, zapisz ten prototyp na kopii projektu”.
**Status skuteczności dla rekruterów:** do zbadania; nie przeprowadzono sesji i nie zebrano wyników.

## Zapisana wersja

Kod jest w tej lokalnej kopii repozytorium, na gałęzi `prototype/project-contribution`. Ta notatka, plan pomiaru i zrzuty pozostają razem z kodem. Zapis jest lokalny; nie oznacza publikacji na GitHubie lub wdrożenia publicznego.

- [Edycja profilu i projektu](http://127.0.0.1:3001/#/app/profil).
- [Podgląd profilu](http://127.0.0.1:3001/#/app/profil/podglad).
- [Warsztat formatki](http://127.0.0.1:3001/#/opis-projektu).

Profil zawiera formatkę projektu, osobne szkice kandydatów i skrót przed CV. W skrócie odróżniono pracę samodzielną, rezultat i pracę innych, zachowując podstawę wyniku i ograniczenia. „Opis kandydata” rozwija pełną treść. Niepełny szkic nie zastępuje pełnego zapisanego projektu.

Zatwierdzony wygląd: kobalt #2449ED w imieniu/nazwisku i stanowisku, Courier New Bold oraz Arial, ciemne przyciski z białymi etykietami i strzałką ↗, narożniki ścięte pod kątem 45°, oryginalny robot. Właściwe reguły i ich pierwszeństwo: [opis systemu](../../design-system/DOROBOTY-PROFILE.md).

## Mierniki i przygotowanie badania

[Mierniki, sposób obliczenia i interpretacja wyników](metrics.md). [Arkusz rekruterów](observations-recruiters.csv) i [arkusz kandydatów](observations-candidates.csv) mają tylko nagłówki — nie zawierają wyników. Mierniki i sposób badania są propozycją. Akceptacja wyglądu nie zatwierdza liczbowych progów skuteczności.

## Podglądy zaakceptowanej wersji

[Profil desktop](profile-desktop.png), [profil telefon](profile-mobile.png), [formatka](editor-desktop.png), [przyciski](actions-desktop.png).

## Granice i sprawdzenia

Ostatnie wykonane sprawdzenia implementacji: build/TypeScript, lint i 14 testów profilu/warsztatu; po końcowych zmianach nagłówka i przycisku ponownie siedem testów profilu w istniejącym Chrome. 34 testy jednostkowe przeszły we wcześniejszej kontroli tej implementacji. Domyślny pełny test przeglądarki nadal ogranicza brak wymaganego Chromium. Nie deklarujemy nowego przebiegu tych testów podczas samego zapisywania dokumentacji.

Projekt nie jest jeszcze dołączany do wysyłanej aplikacji ani automatycznie udostępniany firmom. Przykładowy zapis w przeglądarce nie jest częścią plików źródłowych; do przeniesienia scenariusza między przeglądarkami służy istniejący eksport/import w ustawieniach. Nie ma automatycznego zbierania mierników. Dane, profile i materiały badania muszą pozostać przykładowe.
