import { v4 as uuid4 } from "uuid";

export const wrapOnEnter = (func) => {
  return (e) => {
    switch (e.key) {
      case "Enter":
        func();
    }
  };
};

export const uid = () => {
  // unlikely we'll need the full 16 bytes
  return uuid4().toString().slice(0, 7);
};

export const range = (n: number) => [...Array(n).keys()];

export const iterKeys = (obj: Object) => [...Object.keys(obj)];

export const iterValues = (obj: Object) => [...Object.values(obj)];

export const iterEntries = (obj: Object) => [...Object.entries(obj)];
