import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { initialState, transition, type Action, type State } from "./model";
import { parseState, readState, saveState, STORAGE_KEY, type StoragePort } from "./storage";
function browserStorage(): StoragePort | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
function useStore() {
  const [loaded] = useState(() => readState(browserStorage()));
  const [state, setState] = useState(loaded.state);
  const [issue, setIssue] = useState(loaded.issue);
  const [error, setError] = useState("");
  const [blocked, setBlocked] = useState(loaded.blocked);
  const latest = useRef(state);
  const persisted = useRef(loaded.raw);
  function commit(next: State, replace = false) {
    const storage = browserStorage();
    if (!blocked && !replace && storage) {
      try {
        if (storage.getItem(STORAGE_KEY) !== persisted.current) {
          setIssue(
            "Scenariusz zmienił się w innej karcie. Nie nadpisano danych. Przed odświeżeniem skopiuj niezapisany tekst, a następnie odśwież stronę i ponów zmianę.",
          );
          return false;
        }
      } catch {
        // A storage failure is handled below; the in-memory result remains exportable.
      }
    }
    latest.current = next;
    setState(next);
    setError("");
    if (blocked && !replace) return true;
    try {
      saveState(storage, next);
      persisted.current = storage!.getItem(STORAGE_KEY);
      setIssue("");
      if (replace) setBlocked(false);
    } catch (e) {
      setIssue((e as Error).message);
    }
    return true;
  }
  function run(action: Action) {
    try {
      return commit(transition(latest.current, action));
    } catch (e) {
      setError(
        e instanceof Error && e.name !== "ZodError"
          ? e.message
          : "Sprawdź poprawność i długość wprowadzonych danych.",
      );
      return false;
    }
  }
  function importState(raw: string) {
    try {
      const next = parseState(raw);
      commit(next, true);
      return true;
    } catch (e) {
      setError((e as Error).message);
      return false;
    }
  }
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);
  return {
    state,
    issue,
    error,
    blocked,
    original: loaded.original,
    run,
    importState,
    clearError: () => setError(""),
    reset: () => commit(initialState(), true),
  };
}
type Store = ReturnType<typeof useStore>;
const Context = createContext<Store | null>(null);
export function PrototypeProvider({ children }: { children: ReactNode }) {
  const store = useStore();
  return <Context.Provider value={store}>{children}</Context.Provider>;
}
export function usePrototype() {
  const store = useContext(Context);
  if (!store) throw new Error("PrototypeProvider is required");
  return store;
}
