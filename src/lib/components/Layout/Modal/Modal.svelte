<script lang="ts" generics="T">
  import { onMount, type Snippet } from "svelte";
  import classNames from "classnames";
  import { IconButton } from "$lib/components";
  import IconClose from "~icons/mingcute/close-fill";
  import { isNil } from "lodash-es";
  import { m } from "$lib/paraglide/messages";

  type Props = {
    id: string;
    title: string;
    content: Snippet<[T | undefined]>;
    actions: Snippet;
    data?: T;
    class?: string;
    onclose?: () => void;
  };
  let { id, title, content, actions, data, class: className, onclose }: Props = $props();

  const close = () => {
    onclose?.();
  };

  onMount(() => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (isNil(modal)) throw new Error("modal not found");

    const closeOnOutsideClick = (event: PointerEvent) => {
      const modalDimensions = modal.getBoundingClientRect();
      if (
        event.clientX < modalDimensions.left ||
        event.clientX > modalDimensions.right ||
        event.clientY < modalDimensions.top ||
        event.clientY > modalDimensions.bottom
      ) {
        close();
      }
    };

    modal.addEventListener("click", closeOnOutsideClick);

    return () => modal.removeEventListener("click", closeOnOutsideClick);
  });
</script>

<dialog
  {id}
  class={classNames(
    className,
    "backdrop:backdrop-blur-xs desktop:shadow-lg z-50 fixed desktop:top-1/2 desktop:left-1/2 desktop:-translate-x-1/2 desktop:-translate-y-1/2 bg-base desktop:rounded-default max-w-[unset] max-h-[unset]"
  )}
>
  <div
    class="flex flex-col h-dvh w-screen desktop:h-auto desktop:w-[550px] desktop:max-h-[90vh] desktop:max-w-[90vw]"
  >
    <header class="grid grid-cols-[50px_1fr_50px] items-center px-6 py-4">
      <div></div>
      <span
        class="font-display font-bold text-lg text-typography-attention justify-self-center text-center"
        >{title}</span
      ><IconButton
        class="justify-self-end"
        Icon={IconClose}
        label={m.action_close()}
        action={close}
      />
    </header>
    <hr class="text-accent border p-0" />
    <div class="p-6 flex-1 overflow-y-auto">{@render content(data)}</div>
    <footer class="px-6 py-4 flex justify-end items-center">{@render actions()}</footer>
  </div>
</dialog>

<style>
  dialog {
    opacity: 0;
    transform: translateY(100%);

    transition:
      display 200ms allow-discrete,
      overlay 200ms allow-discrete,
      opacity 200ms,
      transform 200ms;
  }

  dialog[open] {
    opacity: 1;
    transform: translateY(0);
  }

  @starting-style {
    dialog[open] {
      opacity: 0;
      transform: translateY(100%);
    }
  }

  dialog::backdrop {
    background-color: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0);
    transition:
      display 200ms allow-discrete,
      overlay 200ms allow-discrete,
      background-color 200ms,
      backdrop-filter 200ms;
  }

  dialog[open]::backdrop {
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
  }

  @starting-style {
    dialog[open]::backdrop {
      background-color: rgba(0, 0, 0, 0);
      backdrop-filter: blur(0);
    }
  }

  @media (min-width: 500px) {
    dialog {
      transform: scale(0.95);
    }

    dialog[open] {
      transform: scale(1);
    }

    @starting-style {
      dialog[open] {
        opacity: 0;
        transform: scale(0.95);
      }
    }
  }
</style>
