<script lang="ts">
  import { applyAction, deserialize } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { GiftViewer } from "$lib";

  let { data } = $props();

  const handleGiftOpened = async () => {
    const response = await fetch("?/markAsOpened", {
      method: "POST",
      body: new FormData()
    });

    const result = deserialize(await response.text());

    if (result.type === "success") {
      await invalidateAll();
    }

    applyAction(result);
  };
</script>

<GiftViewer {...data} ongiftopened={handleGiftOpened} />
