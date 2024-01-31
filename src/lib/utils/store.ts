import { writable } from "svelte/store";
import { darkTheme } from "../themes/dark";

export const localStore = (key: string, initial: any) => {
  const slot = localStorage.getItem(key);
  const data = slot ? JSON.parse(slot) : initial;
  const store = writable(data, () => {
    const unsubscribe = store.subscribe((value: any) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
    return unsubscribe;
  });
  return store;
};

// TODO check for queries on init:
// - prefers-reduced-motion
// - prefers-contrast
// - prefers-color-scheme
// - prefers-reduced-data
// - prefers-reduced-transparency
export const theme = localStore("theme", darkTheme);
