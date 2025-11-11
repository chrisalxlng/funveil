<script lang="ts">
  import { onMount } from "svelte";
  import classNames from "classnames";
  import { delay } from "$lib/utils";

  type Props = {
    message: string;
    variant?: "success" | "error";
    duration?: number;
    onClose: () => void;
  };

  let { message, variant = "success", duration = 3000, onClose }: Props = $props();
  let popoverNode: HTMLElement;
  let isExiting = $state(false);

  onMount(() => {
    popoverNode.showPopover();

    const timer = setTimeout(async () => {
      isExiting = true;
      await delay(300);
      popoverNode.hidePopover();
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  });
</script>

<div
  bind:this={popoverNode}
  popover="manual"
  class={classNames(
    "fixed bottom-12 inset-x-0 mx-auto w-fit h-fit flex justify-center animate-fade-in [animation-duration:100ms]",
    isExiting ? "animate-fade-out [animation-duration:200ms]" : ""
  )}
>
  <div
    class="flex items-center gap-3 mx-4 px-5 py-3 rounded-full shadow-elevated bg-contrast text-center"
  >
    <div class="relative w-4 h-4 flex items-center justify-center">
      <div
        class={classNames("absolute inset-0 rounded-full blur-[3px] opacity-40", {
          "bg-success": variant === "success",
          "bg-danger": variant === "error"
        })}
      ></div>

      <div
        class={classNames("relative w-1.5 h-1.5 rounded-full", {
          "bg-success": variant === "success",
          "bg-danger": variant === "error"
        })}
      ></div>
    </div>
    <span class="text-sm font-medium tracking-wide text-typography-on-contrast">{message}</span>
  </div>
</div>

<style>
  :popover-open {
    inset: 0 !important;
    top: auto !important;
    bottom: 3rem !important;

    margin-inline: auto !important;
    margin-block: 0 !important;

    padding: 0;
    border: none;
    background: transparent;
    overflow: visible;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  [popover] {
    border: none;
    background: transparent;
  }
</style>
