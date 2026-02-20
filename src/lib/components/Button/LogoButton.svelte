<script lang="ts">
  import Logo from "../Misc/Logo.svelte";
  import type { ButtonProps } from "./Button.svelte";
  import Button from "./Button.svelte";

  type Props = Omit<ButtonProps, "label">;
  let { type, ...props }: Props = $props();
  const buttonType = type ?? "scale";
</script>

<Button label="Logo" type={buttonType} action="/" {...props}><Logo /></Button>
