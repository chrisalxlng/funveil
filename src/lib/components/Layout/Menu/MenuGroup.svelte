<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  };
  let { children }: Props = $props();
</script>

<div class="group">
  <ul class="*:px-5 *:py-3 border-2 border-accent rounded-inner desktop:border-none">
    {@render children()}
  </ul>
  <hr class="text-accent m-3 border p-0 invisible group-last:hidden desktop:visible desktop:m-1" />
</div>
