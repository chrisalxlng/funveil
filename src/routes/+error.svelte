<script lang="ts">
  import { page } from "$app/state";
  import { ActionButton, LogoButton } from "$lib";
  import { m } from "$lib/paraglide/messages";
  import IconHome from "~icons/mingcute/home-4-line";

  const status = $derived(page.status);

  const messages: Record<number, { title: string; description: string }> = {
    404: {
      title: m.error_not_found_title(),
      description: m.error_not_found_description()
    }
  };

  const currentError = $derived(
    messages[status] || {
      title: m.error_default_title(),
      description: m.error_default_description()
    }
  );
</script>

<svelte:head>
  <title>{currentError.title}</title>
</svelte:head>

<div class="flex flex-col h-dvh w-screen overflow-hidden bg-background">
  <aside
    class="z-99 p-6 grid grid-cols-3 desktop:flex desktop:flex-col-reverse desktop:justify-between desktop:absolute desktop:h-screen"
  >
    <div></div>
    <LogoButton class="justify-self-center w-fit" />
  </aside>
  <main class="flex-1 p-0 flex flex-col desktop:h-full desktop:p-3">
    <div class="h-full flex flex-col justify-center items-center gap-2">
      <p class="font-base font-black text-typography-danger text-8xl opacity-20">
        {status}
      </p>
      <span class="font-display font-bold text-2xl text-typography-attention"
        >{currentError.title}</span
      >
      <span class="font-base text-typography-subtle">{currentError.description}</span>
      <ActionButton class="mt-9" Icon={IconHome} label={m.action_navigate_to_home()} action="/" />
    </div>
  </main>
</div>
