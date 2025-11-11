<script lang="ts">
  import { type Component } from "svelte";
  import { getMenuContext } from "./MenuContext";
  import Button, { type ButtonAction } from "$lib/components/Button/Button.svelte";
  import classNames from "classnames";

  const { id } = getMenuContext();

  type Props = {
    Icon: Component;
    label: string;
    action?: ButtonAction;
    options?: { isDanger?: boolean };
  };
  let { Icon, label, action, options }: Props = $props();
</script>

<Button
  {label}
  popovertarget={id}
  {action}
  class={classNames(
    "flex items-center gap-2 w-full rounded-inner-2 font-display font-bold bg-base",
    {
      "text-typography-attention": !options?.isDanger,
      "text-typography-danger": options?.isDanger
    }
  )}
>
  <Icon />
  <span>{label}</span>
</Button>
