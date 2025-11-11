<script lang="ts">
  import { ActionButton, Gift, saveFile } from "$lib";
  import { m } from "$lib/paraglide/messages";
  import { isNil } from "lodash-es";
  import IconDownload from "~icons/mingcute/download-2-line";

  type Props = {
    gift: Gift.QueryResponse;
    imageUrl: string | null;
  };
  let { gift, imageUrl }: Props = $props();

  const handleGiftSave = async (
    imageUrl: string | null,
    { ownerUserName, title }: Gift.QueryResponse
  ) => {
    if (isNil(imageUrl)) throw new Error("imageUrl not found");

    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const file = new File([blob], `${m.gift_file_name({ name: ownerUserName })}.png`, {
      type: "image/png"
    });

    await saveFile(file, title);
  };
</script>

<div class="flex flex-col items-center gap-16">
  <span
    class="font-display text-typography-attention text-3xl desktop:text-4xl font-bold animate-fade-slide-in"
    >{m.summary_heading_prefix()}<span class="text-primary">{gift.ownerUserName}</span
    >{m.summary_heading_suffix()}</span
  >
  <div class="flex flex-col gap-4">
    <img class="animate-fade-slide-in rounded-default" src={imageUrl} alt="gift" />
    <span class="font-base text-typography-subtle">{gift.title}</span>
  </div>
  <div
    class="flex flex-col gap-4 fixed bottom-6 left-6 right-6 desktop:static animate-fade-slide-in"
  >
    <ActionButton
      Icon={IconDownload}
      label={m.action_download_gift()}
      action={() => handleGiftSave(imageUrl, gift)}
    />
  </div>
</div>
