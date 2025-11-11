<script lang="ts">
  import type { Component } from "svelte";
  import Button, { type ButtonProps } from "./Button.svelte";

  type Props = ButtonProps & {
    Icon: Component;
  };
  let { Icon, ...props }: Props = $props();
</script>

<Button
  {...props}
  type="scale"
  class="fixed bottom-4 right-4 bg-primary text-typography-on-primary p-4 rounded-default"
>
  <Icon />
</Button>
