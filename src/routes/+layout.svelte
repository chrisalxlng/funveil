<script lang="ts">
  import { type Snippet } from "svelte";
  import "../app.css";
  import { Notification, notification } from "$lib";

  type Props = { children: Snippet };

  const { children }: Props = $props();
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <meta name="apple-mobile-web-app-title" content="funveil" />
  <link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<div class="h-dvh">
  {@render children()}
</div>

{#if notification.current}
  <Notification
    message={notification.current.message}
    variant={notification.current.variant}
    onClose={notification.dismiss}
  />
{/if}

<style lang="postcss">
  @reference "tailwindcss";

  :global(html) {
    background: var(--color-background);
  }
</style>
