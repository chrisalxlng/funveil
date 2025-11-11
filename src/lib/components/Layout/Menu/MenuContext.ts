import { createContext } from "svelte";

export type MenuContext = {
  id: string;
};

export const [getMenuContext, setMenuContext] = createContext<MenuContext>();
