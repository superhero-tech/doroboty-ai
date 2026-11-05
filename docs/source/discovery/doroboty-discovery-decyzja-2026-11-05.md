# DoRoboty.ai — od sygnałów discovery do wybranego rozwiązania

Data odtworzenia: 5 listopada 2026 r.
Cykl: Supersprint week-02. Wątki źródłowe: Signal Hunter, Listen Between the Lines, Map the Territory i PRES doRoboty.AI.
Status: zapis wcześniejszych wyborów i zatwierdzonego kierunku eksploracji; bez nowej decyzji o wdrożeniu.

## Problem i wybrany kierunek

**Wybrany problem:** przed zaproszeniem na rozmowę rekruter w segmencie Apply potrzebuje podstaw do oceny praktycznych umiejętności i własnego wkładu kandydata w podobnej pracy z AI. Opis doświadczenia i dopasowanie tekstu do ogłoszenia nie wystarczają do ustalenia, co kandydat rzeczywiście zrobił samodzielnie i jak sprawdza efekty.

**Wybrane rozwiązanie do dalszej eksploracji:** kandydat wykonuje krótkie zadanie podobne do pracy. AI Agent-obserwator, uczony przez eksperta-człowieka na co zwracać uwagę, zapisuje konkretne działania, sposób sprawdzania rezultatów i luki. Rekruter otrzymuje raport powiązany z materiałem źródłowym i sam podejmuje decyzję.

**Decyzja końcowa z discovery:** eksplorować ten model dla jednej roli Apply i jednego zadania. Zatwierdzono kierunek oraz zakres dalszego sprawdzania. Nie potwierdzono jeszcze skuteczności agenta, oszczędności czasu ani wpływu na ponowny zakup.

## Cel biznesowy i definicja miary

Zwiększyć odsetek firm dokonujących ponownego płatnego zakupu w ciągu 90 dni z 30% do 60%. To okno obserwacji, a nie ustalony termin osiągnięcia celu.

Każdą firmę liczymy raz w kohorcie; ponowny zakup musi być nową płatnością. Publikacje wykorzystane z pakietu nie są nowymi zakupami. Uwzględniamy pełne 90 dni obserwacji.

Hipoteza łącząca rozwiązanie z celem: lepsza podstawa oceny kandydatów może zwiększyć wartość portalu dla pracodawcy, a następnie skłonność do ponownego zakupu przy kolejnej potrzebie. Tego łańcucha przyczynowego jeszcze nie wykazano.

## Sygnały i kolejne decyzje

| Etap                                                        | Sygnał                                                                                                                                                                                                       | Znaczenie i decyzja                                                                                                                                                         | Granica wniosku                                                                                                                                   |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Trzy CSV: purchases.csv, publications.csv, applications.csv | W kohorcie maja ponownie kupiło 81/180 firm = 45%; w czerwcu 54/180 = 30%. Pełne 90 dni, identyczna struktura produktów. No Limit zachował się przeciwnie: 6/20 = 30% do 7/20 = 35%.                         | Utrzymaliśmy cel ponownego zakupu i szukaliśmy wyjaśnienia wartości dostarczanej pracodawcy.                                                                                | Spadek nie dotyczy jednakowo każdego produktu. Porównywane kohorty to różne firmy; nie wskazuje przyczyny.                                        |
| Trzy CSV — dopasowanie a dalszy proces                      | Średni match_score wzrósł z 68,1 w maju do 75,9 w czerwcu, lecz w każdym miesiącu odnotowano 540/18 000 = 3% kontynuacji, przy równych 60 dniach obserwacji.                                                 | Szukaliśmy podstaw oceny wykraczających poza sam wynik dopasowania tekstów.                                                                                                 | Wyższy score nadal różnicował wyniki. Dane nie dowodzą, że score jest bezużyteczny, ani że AI powoduje zastój. Continue nie oznacza zatrudnienia. |
| Trzy CSV — szkice publikacji                                | W czerwcu szkic miało 94/126 = 74,60% firm niewracających oraz 50/54 = 92,59% wracających, w oknie 90 dni.                                                                                                   | Sam szkic nie uzasadniał uznania płatności za główną barierę. Potrzebny był kontekst nowej roli i decyzji zakupowej.                                                        | Szkic nie oznacza zatwierdzonego wakatu, budżetu ani zamiaru zakupu.                                                                              |
| Synteza F1–F4                                               | F1 wskazywał trudność sprawdzenia praktycznych umiejętności przed zaproszeniem. W F3 istotny był przykład podobnej pracy. F4 pokazywał ręczne wydobywanie informacji potrzebnych do wyboru osoby do rozmowy. | Wybraliśmy problem podstaw do oceny praktyki i własnego wkładu kandydata w Apply. Wybór zatwierdzono 30.10.                                                                 | To materiał fikcyjnego case’u; nie dowodzi częstości problemu na rynku. Brak potwierdzenia pełnej analizy C1–C4.                                  |
| Przypadki przeczące prostemu wyjaśnieniu braku zakupu       | W F2/F3 brakowało kolejnej zatwierdzonej roli; F1 pokazywał szukanie przez kontakty i potrzebę akceptacji wydatku.                                                                                           | Zachowaliśmy warunek nowej potrzeby rekrutacyjnej i budżetu przy interpretacji powrotu.                                                                                     | Brak zakupu nie oznacza niezadowolenia, zakupu u konkurenta ani problemu z oceną kandydata.                                                       |
| Wybór dwóch pomysłów                                        | Potrzeba odróżnienia opisu doświadczenia od dowodu działania.                                                                                                                                                | Zatwierdzono: (1) wcześniejszy projekt kandydata i przewodnik oceny, (2) zadanie podobne do pracy i opis obserwacji eksperta. Dla każdego zaplanowano osobny test: T1 i T2. | Akceptacja pomysłów i planów nie potwierdza ich skuteczności.                                                                                     |
| T1 — przykład projektu z przewodnikiem, 1.11                | Wkład rozpoznawano, ale pozostawały dopowiedzenia. Czasy dla zwykłego opisu i materiału z przewodnikiem: R01 8/12 min, R02 9/9 min, R03 8/6 min; razem 52 min ocen.                                          | Nie uzyskano jednoznacznej przewagi przewodnika. Pozostał powód, aby sprawdzić obserwację rzeczywistego wykonania zadania.                                                  | Trzech rekruterów i dwa fikcyjne przypadki; bez podstaw do uogólniania oszczędności czasu lub trafności.                                          |
| T2 — zadanie i obserwacje eksperta, 2.11                    | C01 ukończył zadanie w 12 min, C02 w 19 min, bez pomocy eksperta. Obserwacje konkretyzowały uzasadnienia dotyczące działań, weryfikacji i luk.                                                               | Utrzymaliśmy kierunek obserwacji sposobu pracy jako źródła materiału dla rekrutera.                                                                                         | W odnalezionym zapisie brak kompletnych ocen przed/po. Nie wykazano przyczynowego wpływu opisu eksperta. T2 nie testował AI Agenta.               |
| Zmiana modelu eksperta i decyzja końcowa, 2.11              | Użytkownik wskazał, aby rolę obserwatora eksplorować jako AI Agenta uczonego przez człowieka. T1 pozostawił nadinterpretacje, T2 dostarczył konkretnych obserwacji pracy.                                    | Zatwierdzono eksplorację AI Agenta-obserwatora dla jednej roli Apply i jednego zadania.                                                                                     | To świadomy wybór kierunku rozwoju. Nie jest wynikiem testu skuteczności agenta ani potwierdzeniem osiągnięcia celu 60%.                          |

## Zakres zatwierdzonego rozwiązania

1. Ekspert-człowiek określa kryteria, przykłady i korekty: które zachowania świadczą o wykonaniu zadania i czego nie wolno z nich wnioskować.
2. Kandydat wykonuje zadanie związane z praktycznym używaniem gotowych narzędzi AI w pracy — segment Apply.
3. Agent analizuje zapis działania, zadaje pytania i przygotowuje raport ze wskazaniem źródeł obserwacji.
4. Raport oddziela zaobserwowane działania od interpretacji i tego, czego nie sprawdzono.
5. Rekruter podejmuje decyzję. Na tym etapie agent nie ma samodzielnie punktować kandydatów ani decydować o zatrudnieniu.

## Co pozostaje niewiadome

- Czy agent obserwuje i interpretuje zachowania zgodnie z kryteriami człowieka.
- Czy raport poprawia podstawę decyzji rekrutera i ogranicza nadinterpretacje.
- Jaki jest koszt i nakład pracy oraz czy kandydaci kończą zadanie.
- Czy rozwiązanie zwiększa skłonność do ponownej płatności przy kolejnej roli.

## Zakres źródeł i rozbieżności

**Trzy CSV:** przytoczono zatwierdzone wcześniej wyniki Signal Hunter. W tej rekonstrukcji nie przeliczano ponownie plików surowych; nie odtworzono niezweryfikowanych nazw kolumn.

**Osiem wywiadów:** materiały wejściowe były opisywane jako F1–F4 i C1–C4. Odnaleziony zapis affinity mapping i podstawa wyboru dotyczą jednak wyłącznie F1–F4. Nie odnaleziono pełnej syntezy C1–C4, więc nie przypisano jej nowych wniosków ani cytatów. Trzy dodatkowe wywiady SIM były symulacjami treningowymi i nie zastępują głosu klientów. C01/C02 z T2 nie są automatycznie tym samym źródłem co wywiady C1/C2.

**Chronologia:** zachowana kopia „tree — kopia.html” zawiera wybór problemu, dwa pomysły i plany testów, lecz nadal oznacza T1/T2 jako niewykonane. Późniejsze zapisy rozmowy Map the Territory z 1–2 listopada zawierają obserwacje testów i zatwierdzenie kierunku AI Agenta. Do odtworzenia dalszych decyzji wykorzystano te późniejsze zapisy rozmowy, nie starsze statusy kopii drzewa.

**Charakter dowodów:** CSV i F1–F4 należą do fikcyjnego case’u. T1/T2 odtworzono z zapisów rozmowy; nie podnoszą one materiałów case’u do rangi reprezentatywnego badania rynku.

## Źródła umożliwiające powrót

- Signal Hunter, 30.10.2026 — zatwierdzone trzy wnioski z CSV i definicja ponownego zakupu.
- Listen Between the Lines, 30.10.2026 — synteza F1–F4 i ograniczenia interpretacji.
- Map the Territory, 30.10–2.11.2026 — wybór problemu, dwóch pomysłów, T1/T2 oraz końcowa akceptacja eksploracji agenta 2.11.
- PRES doRoboty.AI, 1.11.2026 — AF-O01: ocena praktyki i własnego wkładu; aktualizacja R: AF-O01=4, AF-O02=3, AF-O03=2.
- [Zachowana kopia drzewa — wcześniejszy stan](https://chatgpt.com/library?file_id=libfile_21d39b2d348481919b5f65286720c636&account_id=personal).

Ten dokument odtwarza wcześniejsze ustalenia; nie zmienia statusów testów ani nie nadaje nowej akceptacji wdrożeniu.

## Decyzja o dwóch ścieżkach prototypu — 5 listopada 2026

**DEC-2026-11-05-01 — decyzja użytkownika: realizujemy teraz wyłącznie ścieżkę kandydata. Ścieżka pracodawcy pozostaje odłożona; nie rozpoczynamy projektowania jej ekranów, implementacji ani testów z pracodawcami.**

Źródło decyzji: bieżąca instrukcja użytkownika: „zarejstrumy decyzję że realizujemy tylko ścieżkę pierwszą; drugiej na razie nie ruszamy”. Poniższe zadania i kryteria to propozycja operacyjna przygotowana na tę prośbę. Wyników nowego testu jeszcze nie ma. Decyzja dotyczy zakresu prototypowania, bez zgody na wdrożenie produkcyjne.

Problem pozostaje wspólny: dać rekruterowi podstawy do oceny praktyki i własnego wkładu kandydata przed zaproszeniem. Rozdzielamy dwa punkty widzenia tego samego rozwiązania.

### Ścieżka 1 — kandydat pokazuje, jak wykonuje zadanie z AI

**Status: wybrana do realizacji.**

**Co sprawdzamy:** czy kandydat rozumie zasady sesji i potrafi samodzielnie przejść przez zadanie, pokazując działania, kontrolę wyników AI i własne poprawki. Potrzeba kandydata, którą sprawdzamy, jest hipotezą: możliwość pokazania własnej praktyki przez wykonanie zadania, a nie wyłącznie opis doświadczenia.

**Zadanie użytkownika:** „Pokaż, jak wykonujesz zadanie z pomocą AI: zapoznaj się z instrukcją, przygotuj rozwiązanie, sprawdź odpowiedź AI, popraw zauważone błędy i wyjaśnij swoje decyzje. Na koniec oddaj pracę i sprawdź podsumowanie tego, co zostało zapisane”.

**Roboczy materiał do prototypu:** wykorzystać typ zadania z T2 — uporządkowanie fikcyjnych wiadomości z pomocą gotowego narzędzia AI, sprawdzenie klasyfikacji i wyjaśnienie poprawek. Jest to propozycja konkretnego materiału, nie nowa zatwierdzona rola zawodowa. Zachowujemy zakres jednej roli Apply i jednego zadania.

**Minimalny przebieg:** wejście do sesji → cel, zasady i informacja o zapisywanych działaniach → rozpoczęcie zadania → praca z AI i pytania obserwatora → sprawdzenie i poprawa rezultatu → oddanie pracy → podsumowanie z możliwością wskazania niezgodności.

**Po czym poznamy, że prototyp działa:**

- Kandydat potrafi własnymi słowami wyjaśnić, co ma zrobić, co jest obserwowane i co zostanie przekazane dalej.
- Przechodzi od instrukcji do oddania pracy bez prowadzenia przez moderatora. Zapisujemy miejsca zatrzymania, pytania, pomoc i rezygnacje.
- Potrafi pokazać własną poprawkę albo wyjaśnić, jak zweryfikował wynik AI; prototyp umożliwia te działania i zachowuje ich zapis. Brak poprawki nie blokuje oddania pracy i sam w sobie nie oznacza awarii interfejsu.
- Po oddaniu pracy pojawia się jednoznaczne potwierdzenie i podsumowanie zgodne z przebiegiem sesji. Można odróżnić pracę kandydata od odpowiedzi AI i wskazać źródło obserwacji. Nie dopisujemy niezaobserwowanych umiejętności.
- Kandydat rozumie podsumowanie i potrafi zgłosić błędne przypisanie działania lub inną niezgodność.

**Jak obserwujemy:** podczas przejścia całej sesji notujemy ukończenia względem wszystkich rozpoczętych prób, ukończenia bez pomocy względem rozpoczętych prób, miejsca pomocy, rezygnacje i czas. Sprawdzamy rozumienie instrukcji i zgodność podsumowania z zapisem działań. Nie ustalamy arbitralnego progu procentowego ani limitu czasu; obserwacje pokażemy do oceny przed kolejną inwestycją.

**Decyzja po próbach:** jeśli kandydaci rozumieją proces i samodzielnie go kończą, a zapis pozwala odtworzyć ich działania, mamy podstawę do rozwijania tej ścieżki. Jeśli proces wymaga prowadzenia, poprawiamy instrukcję i obsługę zadania. Jeśli podsumowanie przypisuje działania niewłaściwej osobie lub pomija źródła, poprawiamy zapis i podsumowanie przed dalszym rozwojem. Wyniki mieszane wymagają rozdzielenia trudności interfejsu od trudności samego zadania.

**Dlaczego teraz:** bez zrozumiałego przebiegu i materiału pokazującego pracę kandydata nie powstanie wiarygodna podstawa późniejszej oceny przez rekrutera.

**Granica prototypu:** klikalny przebieg ze scenariuszowymi odpowiedziami agenta może sprawdzić zrozumienie i obsługę sesji. Wiarygodność automatycznej obserwacji wymaga osobnego sprawdzenia agenta na rzeczywistym zapisie działań. Każda symulacja musi być oznaczona; samo przejście ekranów nie dowodzi poprawności agenta ani umiejętności kandydata. Przekazanie pracy kończymy lokalnym potwierdzeniem; nie potrzebujemy teraz panelu pracodawcy ani rzeczywistej wysyłki zgłoszenia.

### Ścieżka 2 — pracodawca uzasadnia decyzję na podstawie obserwacji pracy

**Status: odłożona. Poniżej tylko definicja przyszłego zadania i kryteriów; bez uruchamiania prac nad tą ścieżką.**

**Co chcielibyśmy sprawdzić:** czy raport z obserwacji pozwala rekruterowi uzasadnić następny krok konkretnymi działaniami kandydata i oddzielić je od niezweryfikowanych umiejętności.

**Zadanie użytkownika:** „Zapoznaj się ze zgłoszeniem i raportem z zadania. Wskaż, co kandydat zrobił samodzielnie, co sprawdził i czego nadal nie wiadomo. Zdecyduj, czy zaprosić go do rozmowy, czy najpierw zadać pytanie, i uzasadnij wybór fragmentami pracy”.

**Po czym poznamy, że przyszły prototyp działa:** rekruter znajduje źródło obserwacji, odróżnia działania kandydata od odpowiedzi AI, wskazuje niezweryfikowane kwestie i zapisuje własną decyzję z uzasadnieniem opartym na konkretnych fragmentach. Porównanie z oceną samego zgłoszenia pozwoli sprawdzić, czy raport wnosi nowe podstawy decyzji, a nie tylko zwiększa pewność oceniającego. To kierunek przyszłego porównania, bez wyników i bez ustalonego progu.

**Decyzja po przyszłych wynikach:** dowody użyteczności raportu mogłyby uzasadnić dalsze projektowanie panelu; nadinterpretacje lub trudność znalezienia źródeł wymagałyby zmiany raportu. Samo kliknięcie „zaproś” nie dowodzi trafnej oceny ani zatrudnienia.

**Dlaczego później:** obecny wybór użytkownika ogranicza realizację do doświadczenia kandydata. Uruchomienie drugiej ścieżki wymaga osobnej decyzji użytkownika; ukończenie pierwszej nie uruchamia jej automatycznie.

### Obowiązujący zakres na teraz

- Budujemy i sprawdzamy przebieg po stronie kandydata, dla jednego zadania Apply, wraz z podsumowaniem jego własnej sesji.
- Panel pracodawcy, przeglądanie zgłoszeń i podejmowanie decyzji przez rekrutera pozostają poza bieżącą realizacją.
- Kryteria opisują działanie i użyteczność prototypu. Wpływ na zatrudnienie, ponowne zakupy i cel 60% pozostaje poza tym sprawdzeniem.
