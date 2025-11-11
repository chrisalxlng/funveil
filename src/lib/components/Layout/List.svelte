<script lang="ts">
  import classNames from "classnames";
  import type { Snippet } from "svelte";

  type Props = {
    class?: string;
    children: Snippet;
  };
  let { class: className, children }: Props = $props();
</script>

<ul
  class={classNames(
    "overflow-hidden bg-base flex flex-col border-accent desktop:border-2 desktop:rounded-default *:border-b-2 desktop:*:last:border-b-0 *:border-accent",
    className
  )}
>
  {@render children()}
</ul>
