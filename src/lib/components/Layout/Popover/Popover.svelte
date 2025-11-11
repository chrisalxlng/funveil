<script lang="ts">
  import type { Snippet } from "svelte";
  import { positionPopover } from "./Popover";
  import classNames from "classnames";

  type Props = {
    id: string;
    children: Snippet;
    element?: keyof HTMLElementTagNameMap;
    class?: string;
  };
  let props: Props = $props();
  let { id, children, element = "div" } = props;
  const className = props["class"] ?? "";
</script>

<svelte:element
  this={element}
  popover="auto"
  {id}
  class={classNames(className, "border-accent border-2 p-3 desktop:p-1 invisible shadow-elevated")}
  use:positionPopover
>
  {@render children()}
</svelte:element>

<style>
  [popover] {
    opacity: 0;
    transform: translateY(100%);

    transition:
      display 200ms allow-discrete,
      overlay 200ms allow-discrete,
      opacity 200ms,
      transform 200ms;
  }

  [popover]:popover-open {
    opacity: 1;
    transform: translateY(0);
  }

  @starting-style {
    [popover]:popover-open {
      opacity: 0;
      transform: translateY(100%);
    }
  }

  @media (min-width: 500px) {
    [popover] {
      transform: none;
    }

    [popover]:popover-open {
      transform: none;
    }

    @starting-style {
      [popover]:popover-open {
        opacity: 0;
        transform: none;
      }
    }
  }
</style>
