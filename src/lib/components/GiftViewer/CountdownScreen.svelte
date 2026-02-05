<script lang="ts">
  import { Countdown, type Gift } from "$lib";
  import { m } from "$lib/paraglide/messages";

  type Props = {
    gift: Gift.LockedQueryResponse;
  };
  let { gift }: Props = $props();
</script>

<div class="flex flex-col items-center gap-16">
  <span class="font-display text-typography-attention text-3xl desktop:text-4xl font-bold">
    {m.countdown_heading_prefix()}<span class="text-primary">{gift.ownerUserName}</span
    >{m.countdown_heading_suffix()}
  </span>
  <Countdown value={gift.releasedAt} />
</div>
