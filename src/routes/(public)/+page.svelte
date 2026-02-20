<script>
  import { DotLottieSvelte } from "@lottiefiles/dotlottie-svelte";
  import { m } from "$lib/paraglide/messages";
  import classNames from "classnames";
  import { ActionButton } from "$lib";
  import IconArrowRight from "~icons/mingcute/arrow-right-fill";
</script>

<svelte:head>
  <title>{m.title_landing}</title>
</svelte:head>

<div
  class="relative w-full h-full pt-8 desktop:pt-0 flex flex-col desktop:flex-row justify-center items-center text-center *:max-w-2xl *:p-6 grow"
>
  <div class="flex flex-col items-center gap-8 justify-between desktop:justify-start grow">
    <div class="flex flex-col gap-6 items-center">
      <div class="animate-fade-slide-in">
        <span
          class={classNames(
            "font-display text-typography-attention text-3xl desktop:text-4xl font-bold flex flex-col gap-2"
          )}
          ><span class="text-primary">{m.landing_heading_high_emphasis()}</span><span
            >{m.landing_heading_low_emphasis()}</span
          ></span
        >
      </div>
      <div class="animate-fade-slide-in">
        <span class="font-base text-typography-subtle text-sm desktop:text-sm font-medium"
          >{m.landing_subheading()}</span
        >
      </div>
      <div class="w-full aspect-square desktop:w-72">
        <DotLottieSvelte src="/gift.lottie" loop autoplay />
      </div>
    </div>
    <div class="w-full desktop:w-auto flex flex-col gap-2">
      <ActionButton
        action="/auth/demo"
        Icon={IconArrowRight}
        label={m.action_start_demo()}
        class="w-full"
      />
      <a class="font-base text-primary text-sm font-medium py-3" href="/gifts"
        >{m.action_sign_in()}</a
      >
    </div>
  </div>
</div>
