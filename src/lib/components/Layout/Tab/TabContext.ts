export const TAB_CONTEXT_KEY = Symbol("tab-context");

export type TabContext<T> = {
  selectedItemId: T;
  select: (id: T) => void;
};
