<script lang="ts">
  import classNames from "classnames";
  import { isNil } from "lodash-es";
  import type { Snippet } from "svelte";

  export type ButtonAction = string | ((event: Event) => void);
  export type ButtonType = "scale" | "color";

  export type ButtonProps = {
    class?: string;
    label: string;
    action?: ButtonAction;
    popovertarget?: string;
    type?: ButtonType;
    formId?: string;
    disabled?: boolean;
  };

  type Props = ButtonProps & {
    children: Snippet;
  };

  let {
    label,
    action,
    children,
    type = "color",
    class: className = "",
    formId,
    disabled,
    ...restProps
  }: Props = $props();

  let buttonAttributes = $derived({
    ...restProps,
    "aria-label": label,
    class: classNames(className, "transition select-none", {
      "hover:brightness-97 active:brightness-95": type == "color",
      "hover:scale-105 active:scale-95": type == "scale",
      "bg-transparent opacity-70 cursor-not-allowed": disabled,
      "cursor-pointer": !disabled
    })
  });
</script>

{#if typeof action === "string"}
  <a title={label} href={action} {...buttonAttributes}>
    {@render children()}
  </a>
{:else}
  <button
    title={label}
    onclick={action as (event: Event) => void}
    type={isNil(formId) ? "button" : "submit"}
    form={formId}
    {...buttonAttributes}
  >
    {@render children()}
  </button>
{/if}
