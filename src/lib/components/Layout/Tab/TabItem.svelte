<script lang="ts" generics="T">
  import { Button } from "$lib/components";
  import { getContext } from "svelte";
  import { TAB_CONTEXT_KEY, type TabContext } from "./TabContext";
  import classNames from "classnames";

  type Props = {
    id: T;
    label: string;
  };

  let { id, label }: Props = $props();

  const context = getContext<TabContext<T>>(TAB_CONTEXT_KEY);

  const isSelected = $derived(id === context.selectedItemId);
</script>

<Button
  {label}
  action={() => context.select(id)}
  class={classNames("w-full bg-background font-display font-bold px-4 py-4 border-b-2", {
    "text-primary border-primary": isSelected,
    "text-typography-subtle border-accent": !isSelected
  })}
>
  {label}
</Button>
