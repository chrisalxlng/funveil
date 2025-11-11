<script lang="ts">
  import { invalidate } from "$app/navigation";
  import CountdownScreen from "./CountdownScreen.svelte";
  import SummaryScreen from "./SummaryScreen.svelte";
  import UnwrappingScreen from "./UnwrappingScreen.svelte";
  import { confetti } from "./confetti";
  import { env } from "$env/dynamic/public";
  import type { Gift } from "$lib/entities";
  import { m } from "$lib/paraglide/messages";
  import { deserialize } from "$app/forms";
  import type { ActionResult } from "@sveltejs/kit";

  type Props = {
    msUntilRelease: number;
    isPreview?: boolean;
    ongiftopened?: () => void;
  } & (Gift.Locked | Gift.Revealed);

  let props: Props = $props();

  let currentScreen = $state<"unwrapping" | "summary">("unwrapping");
  let imageUrl = $state<string | null>(null);

  $effect(() => {
    if (props.msUntilRelease > 0 && !props.isPreview) {
      const timer = setTimeout(() => {
        invalidate("gift:status");
      }, props.msUntilRelease);
      return () => clearTimeout(timer);
    }
  });

  const handleGiftPrepare = async () => {
    if (!props.revealed) throw new Error("Gift not released yet");

    const tokenResponse = await fetch("?/getFreshToken", {
      method: "POST",
      body: new FormData()
    });

    if (!tokenResponse.ok) throw new Error("Token fetch ended in error");

    const result = deserialize(await tokenResponse.text()) as ActionResult;

    if (result.type !== "success") {
      throw new Error("Token could not be fetched");
    }

    const fileAccessToken = result.data?.fileAccessToken;
    if (!fileAccessToken) throw new Error("Token not found");

    const fileUrl = `${env.PUBLIC_STASH_URL}/v1/clients/${env.PUBLIC_KEYCLOAK_CLIENT_ID}/files/${props.gift.fileId}`;

    const response = await fetch(fileUrl, {
      headers: {
        "x-file-access-token": fileAccessToken
      }
    });

    if (!response.ok) throw new Error("File could not be fetched");

    const blob = await response.blob();
    imageUrl = URL.createObjectURL(blob);
  };
</script>

<svelte:head>
  <title>{m.title_gift_viewer({ ownerUserName: props.gift.ownerUserName })}</title>
</svelte:head>

<div
  class="relative w-full h-full pt-12 desktop:pt-0 desktop:flex justify-center items-center text-center *:max-w-2xl *:p-6"
>
  {#if !props.revealed}
    <CountdownScreen gift={props.gift} />
  {:else if currentScreen === "unwrapping"}
    <UnwrappingScreen
      gift={props.gift}
      preparegift={handleGiftPrepare}
      ongiftunwrapped={() => confetti()}
      ongiftopened={() => {
        currentScreen = "summary";
        props.ongiftopened?.();
      }}
    />
  {:else}
    <SummaryScreen gift={props.gift} {imageUrl} />
  {/if}
</div>
