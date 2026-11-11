import type { FieldName } from "./model";
export const groups: {
  title: string;
  intro: string;
  fields: { name: FieldName; label: string; hint: string; short?: boolean; optional?: boolean }[];
}[] = [
  {
    title: "01. Projekt i praca do wykonania",
    intro: "Wybierz jeden projekt. Nazwę firmy możesz zastąpić opisem branży.",
    fields: [
      {
        name: "title",
        label: "Nazwa projektu",
        hint: "Krótki tytuł, bez poufnych nazw.",
        short: true,
      },
      {
        name: "context",
        label: "Jaki problem rozwiązywał projekt?",
        hint: "Dla kogo, co nie działało i co miało się zmienić?",
      },
      {
        name: "role",
        label: "Twoja rola",
        hint: "Funkcja i zakres odpowiedzialności, nie sam tytuł stanowiska.",
        short: true,
      },
      {
        name: "period",
        label: "Okres i etap udziału",
        hint: "Np. marzec–maj 2026, od rozpoznania problemu do pilotażu.",
        short: true,
      },
      {
        name: "target",
        label: "Z jakim zadaniem w nowej roli łączysz ten przykład?",
        hint: "Wskaż konkretne wymaganie oferty i odpowiadającą mu pracę. Jeśli nie masz oferty, opisz zadanie, którego szukasz.",
      },
    ],
  },
  {
    title: "02. Ty i pozostałe osoby",
    intro:
      "Używaj czasowników: zaprojektowałam, policzyłem, wdrożyłam. Oddziel własną pracę od wspólnej.",
    fields: [
      {
        name: "own",
        label: "Co wykonałaś lub wykonałeś samodzielnie?",
        hint: "Wymień czynności i ich namacalne efekty. Zamiast „wdrażaliśmy AI”: „opracowałam scenariusze i przeprowadziłam 6 sesji”. Wpisuj wyłącznie fakty.",
      },
      {
        name: "shared",
        label: "Co powstało wspólnie i jaka była Twoja część?",
        hint: "Kto przygotował propozycję, kto wykonał resztę? Jeśli nie było wspólnej pracy, napisz to wprost.",
      },
      {
        name: "others",
        label: "Za co odpowiadały inne osoby, a Ty nie?",
        hint: "Podaj funkcje, bez nazwisk. Np. integracja — programista; budżet — lider. Przy pracy solo zaznacz, że nie było innych wykonawców.",
      },
      {
        name: "decisions",
        label: "Jaką decyzję podjęłaś lub podjąłeś i kto ją zatwierdził?",
        hint: "Opisz jeden wybór, powód i zakres swojej decyzyjności. Jeśli tylko rekomendowałaś lub wykonywałeś decyzję innej osoby, zaznacz to.",
      },
    ],
  },
  {
    title: "03. Rezultat, podstawa i granice",
    intro:
      "Brak pomiaru też jest informacją. Nie musisz dopisywać procentowej poprawy ani udostępniać firmowego repozytorium.",
    fields: [
      {
        name: "result",
        label: "Co się zmieniło i jak przyczyniła się do tego Twoja praca?",
        hint: "Oddziel rezultat zespołu od swojego efektu pracy. Jeśli projekt trwa lub nie osiągnął celu, opisz stan i wnioski.",
      },
      {
        name: "measurement",
        label: "Skąd wiesz, jaki był rezultat?",
        hint: "Jeśli masz pomiar: wartość przed i po, okres, próba i źródło. Jeśli nie: co zaobserwowano i czego nie zmierzono?",
      },
      {
        name: "limits",
        label: "Czego nie da się ustalić lub udostępnić?",
        hint: "Niewiadome, ograniczenia i poufne materiały. Np. brak danych po pilotażu; kod objęty poufnością. Jeśli nie ma ograniczeń, napisz to wprost.",
      },
      {
        name: "evidence",
        label: "Co możesz pokazać lub wyjaśnić?",
        hint: "Opcjonalnie: publiczny przykład, zanonimizowany schemat lub wyjaśnienie metody. Opisz, co materiał potwierdza, a czego nie.",
        optional: true,
      },
      {
        name: "link",
        label: "Publiczny link do przykładu",
        hint: "Opcjonalnie. Tylko materiał, który wolno Ci udostępnić. Adres http:// lub https://.",
        short: true,
        optional: true,
      },
    ],
  },
];
