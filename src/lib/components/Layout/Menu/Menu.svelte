<script lang="ts">
  import { type Snippet } from "svelte";
  import Popover from "../Popover/Popover.svelte";
  import { IconButton } from "$lib/components";
  import IconClose from "~icons/mingcute/close-fill";
  import { setMenuContext } from "./MenuContext";
  import { m } from "$lib/paraglide/messages";

  type Props = {
    id: string;
    children: Snippet;
  };
  let { id, children }: Props = $props();

  setMenuContext({ id });
</script>

<Popover {id} element="menu" class="rounded-t-default desktop:rounded-default">
  <div class="flex flex-col gap-6">
    <IconButton
      Icon={IconClose}
      label={m.action_close()}
      class="desktop:hidden self-end"
      popovertarget={id}
    />
    <div>
      {@render children()}
    </div>
  </div>
</Popover>
