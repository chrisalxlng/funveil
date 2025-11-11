<script lang="ts">
  import type { Component } from "svelte";
  import Button, { type ButtonProps } from "./Button.svelte";
  import classNames from "classnames";
  import { isNil } from "lodash-es";

  type Props = ButtonProps & {
    Icon?: Component;
    iconOnly?: boolean;
    variant?: "primary" | "subtle" | "danger";
  };
  let { Icon, label, iconOnly, class: className, variant = "primary", ...props }: Props = $props();
</script>

<Button
  {...props}
  {label}
  class={classNames("px-6 py-3 rounded-default flex gap-2 justify-center items-center", className, {
    "bg-primary text-typography-on-primary": variant === "primary",
    "bg-accent text-typography-subtle": variant === "subtle",
    "bg-accent text-typography-danger": variant === "danger"
  })}
>
  {#if !isNil(Icon)}
    <Icon />
  {/if}
  {#if !iconOnly}
    <span
      class={classNames("font-display font-bold", {
        "text-typography-on-primary": variant === "primary",
        "text-typography-subtle": variant === "subtle"
      })}>{label}</span
    >
  {/if}
</Button>
