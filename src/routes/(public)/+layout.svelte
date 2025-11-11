<script lang="ts">
  import { LogoButton } from "$lib";
  import { type Snippet } from "svelte";

  type Props = { children: Snippet };

  const { children }: Props = $props();
</script>

<div class="flex flex-col h-dvh w-screen overflow-hidden bg-background">
  <aside
    class="z-99 p-6 grid grid-cols-3 desktop:flex desktop:flex-col-reverse desktop:justify-between desktop:absolute desktop:h-screen"
  >
    <div></div>
    <LogoButton class="justify-self-center w-fit" />
  </aside>
  <main class="flex-1 p-0 flex flex-col desktop:h-full desktop:p-3">{@render children()}</main>
</div>
