<script lang="ts">
  import classNames from "classnames";
  import type { ButtonProps } from "./Button.svelte";
  import Button from "./Button.svelte";
  import type { Component } from "svelte";

  type Props = ButtonProps & {
    Icon: Component;
    class?: string;
  };
  let props: Props = $props();
  const { Icon, type, ...buttonProps } = props;
  const className = props["class"] ?? "";
  const buttonType = type ?? "scale";
</script>

<Button
  {...buttonProps}
  type={buttonType}
  class={classNames(
    className,
    "rounded-full w-8 h-8 flex justify-center items-center bg-accent p-0"
  )}
>
  <Icon class="text-typography-subtle" />
</Button>
