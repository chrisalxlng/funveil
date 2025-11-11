<script lang="ts" generics="T">
  import { setContext, type Snippet } from "svelte";
  import { TAB_CONTEXT_KEY, type TabContext } from "./TabContext";
  import classNames from "classnames";

  type Props<T> = {
    class?: string;
    children: Snippet;
    selectedItemId: T;
    onitemselect: (id: T) => void;
  };

  let { children, onitemselect, selectedItemId, class: className = "" }: Props<T> = $props();

  setContext<TabContext<T>>(TAB_CONTEXT_KEY, {
    get selectedItemId() {
      return selectedItemId;
    },
    select: (id) => onitemselect(id)
  });
</script>

<nav class={classNames("grid grid-cols-2", className)}>
  {@render children()}
</nav>
