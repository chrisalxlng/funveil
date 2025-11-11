<script lang="ts">
  import { getCountdown } from "$lib/utils";
  import { onMount } from "svelte";
  import DataPoint from "./DataPoint.svelte";
  import { m } from "$lib/paraglide/messages";

  type Props = {
    value: string;
    compact?: boolean;
  };
  let props: Props = $props();
  let countdown = $state(getCountdown(props.value));

  onMount(() => {
    const interval = setInterval(() => {
      countdown = getCountdown(props.value);
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

{#if !props.compact}
  <div class="flex gap-10 items-center">
    <DataPoint label={m.countdown_days()} value={countdown.days} />
    <DataPoint label={m.countdown_hours()} value={countdown.hours} />
    <DataPoint label={m.countdown_minutes()} value={countdown.minutes} />
    <DataPoint label={m.countdown_seconds()} value={countdown.seconds} />
  </div>
{:else if countdown.days > 0}
  <DataPoint label={m.countdown_days()} value={countdown.days} />
{:else if countdown.hours > 0}
  <DataPoint label={m.countdown_hours()} value={countdown.hours} />
{:else if countdown.minutes > 0}
  <DataPoint label={m.countdown_minutes()} value={countdown.minutes} />
{:else}
  <DataPoint label={m.countdown_seconds()} value={countdown.seconds} />
{/if}
