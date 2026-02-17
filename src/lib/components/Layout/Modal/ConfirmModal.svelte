<script lang="ts">
  import { ActionButton, type ButtonAction } from "$lib/components";
  import type { Component } from "svelte";
  import Modal from "./Modal.svelte";

  type Props = {
    id: string;
    label: string;
    message: string;
    Icon: Component;
    onconfirm?: ButtonAction;
  };
  let props: Props = $props();
</script>

{#snippet content()}
  <span class="font-base text-sm text-typography-subtle">{props.message}</span>
{/snippet}

{#snippet actions()}
  <ActionButton
    class="flex-1 desktop:flex-none"
    variant="danger"
    Icon={props.Icon}
    label={props.label}
    action={props.onconfirm}
  />
{/snippet}

<Modal id={props.id} title={props.label} {content} {actions} />
