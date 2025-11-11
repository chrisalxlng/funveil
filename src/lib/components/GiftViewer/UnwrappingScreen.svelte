<script lang="ts">
  import GiftBoxIllustration from "./GiftBoxIllustration.svelte";
  import { ActionButton, delay, Gift, toMs } from "$lib";
  import IconScissors from "~icons/mingcute/scissors-line";
  import classNames from "classnames";
  import { m } from "$lib/paraglide/messages";

  type Props = {
    gift: Gift.QueryResponse;
    preparegift?: () => Promise<void>;
    ongiftunwrapped?: () => void;
    ongiftopened?: () => void;
  };
  let props: Props = $props();

  let uiHidden = $state(false);
  let isError = $state(false);
  let animateRibbon = $state(false);
  let animateBox = $state(false);

  const handleGiftOpen = async () => {
    uiHidden = true;

    try {
      await Promise.all([delay(750), props.preparegift?.()]);

      animateRibbon = true;

      const durationMs = toMs(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--gift-box-animation-duration")
          .trim()
      );

      await delay(durationMs);
      props.ongiftunwrapped?.();
      animateBox = true;

      await delay(durationMs);
      props.ongiftopened?.();
    } catch {
      isError = true;
    }
  };
</script>

<div class="flex flex-col items-center gap-16">
  <div
    class={classNames({
      "animate-fade-out": uiHidden
    })}
  >
    <div class="animate-fade-slide-in">
      <span
        class={classNames(
          "font-display text-typography-attention text-3xl desktop:text-4xl font-bold"
        )}
        >{m.unwrapping_heading_prefix()}<span class="text-primary">{props.gift.ownerUserName}</span
        >{m.unwrapping_heading_suffix()}</span
      >
    </div>
  </div>
  {#if isError}
    <div class={classNames("flex flex-col gap-3 animate-fade-in")}>
      <span
        class={classNames("font-display text-typography-danger text-lg desktop:text-2xl font-bold")}
        >{m.gift_not_loaded_title()}</span
      >
      <span class={classNames("font-base text-typography-danger text-md desktop:text-lg")}
        >{m.gift_not_loaded_description()}</span
      >
    </div>
  {/if}
  <GiftBoxIllustration
    class={classNames("scale-75 transition animate-fade-slide-in", {
      "scale-100": uiHidden,
      hidden: isError
    })}
    {animateRibbon}
    {animateBox}
  />
  <div
    class={classNames({
      "animate-fade-out": uiHidden
    })}
  >
    <ActionButton
      class={classNames("fixed bottom-6 left-6 right-6 desktop:static animate-fade-slide-in")}
      Icon={IconScissors}
      label={m.action_open_gift()}
      action={handleGiftOpen}
    />
  </div>
</div>
