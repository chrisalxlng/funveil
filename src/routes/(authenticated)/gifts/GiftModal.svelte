<script lang="ts">
  import {
    ActionButton,
    Modal,
    Gift,
    useAuth,
    toDateTimeInputString,
    notification,
    IconButton,
    openFilePickerAsync
  } from "$lib";
  import { isEmpty, isNil } from "lodash-es";
  import IconBowknot from "~icons/mingcute/bowknot-line";
  import IconText from "~icons/mingcute/text-2-line";
  import IconUser from "~icons/mingcute/user-1-line";
  import IconCalendar from "~icons/mingcute/calendar-time-add-line";
  import IconEdit from "~icons/mingcute/edit-2-line";
  import { type Component } from "svelte";
  import type { HTMLInputTypeAttribute } from "svelte/elements";
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import type { SubmitFunction } from "@sveltejs/kit";
  import classNames from "classnames";
  import { env } from "$env/dynamic/public";
  import { GIFT_MODAL_ID } from "./definitions";
  import { m } from "$lib/paraglide/messages";

  type Props = {
    data: Gift.FormValues | undefined;
    onsubmit?: () => void;
  };
  let props: Props = $props();

  const GIFT_FORM_ID = "gift-form";
  const auth = useAuth();

  const handleFileReplace = async () => {
    const files = await openFilePickerAsync({ accept: [".jpg", ".png", ".jpeg"] });

    if (!isNil(files) && !isEmpty(files) && props.data) {
      const [firstFile] = files;

      if (props.data.fileUrl.startsWith("blob:")) {
        URL.revokeObjectURL(props.data.fileUrl);
      }

      props.data.fileUrl = URL.createObjectURL(firstFile);
      props.data.fileName = firstFile.name;
      props.data.isFileUploaded = false;
    }
  };

  const handleClose = () => {
    const fileUrl = props.data?.fileUrl;
    if (isNil(fileUrl) || !fileUrl.startsWith("blob:")) return;

    URL.revokeObjectURL(fileUrl);
  };

  const handleEnhance: SubmitFunction = async ({ formData, cancel }) => {
    try {
      const giftId = props.data?.giftId;
      if (isNil(giftId)) throw new Error("giftId not found");
      formData.set("giftId", giftId);

      const fileId = props.data?.fileId;
      if (isNil(fileId)) throw new Error("fileId not found");
      formData.set("fileId", fileId);

      const isFileUploaded = props.data?.isFileUploaded;
      if (isNil(isFileUploaded)) throw new Error("isFileUploaded not found");

      const releasedAt = formData.get("releasedAt");
      if (typeof releasedAt !== "string") throw new Error("Wrong type for releasedAt");

      const localDate = new Date(releasedAt);
      const releasedAtIso = localDate.toISOString();
      formData.set("releasedAt", releasedAtIso);

      if (!isFileUploaded) {
        const fileUrl = props.data?.fileUrl;
        if (!fileUrl) throw new Error("fileUrl not found");

        const fileResponse = await fetch(fileUrl);
        if (!fileResponse.ok) throw new Error("Could not fetch file from URL");

        const blob = await fileResponse.blob();

        const fileUploadFormData = new FormData();
        fileUploadFormData.append("file", blob, props.data?.fileName);

        const token = await auth.getToken();

        const fileStorageResponse = await fetch(
          `${env.PUBLIC_STASH_URL}/v1/clients/${env.PUBLIC_KEYCLOAK_CLIENT_ID}/files/${fileId}`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "x-allow-token-access": "true" },
            body: fileUploadFormData
          }
        );
        if (!fileStorageResponse.ok) throw new Error("Could not upload file");
      }
    } catch (error) {
      console.error(error);
      notification.show(m.notification_gift_not_saved(), "error");
      cancel();
      return;
    }

    return async ({ result }) => {
      if (result.type === "success") {
        await invalidateAll();
      }
      await applyAction(result);
      props.onsubmit?.();
      handleClose?.();
    };
  };
</script>

{#snippet actions()}
  <ActionButton
    class="w-full desktop:w-auto"
    Icon={IconBowknot}
    label={m.action_save_gift()}
    formId={GIFT_FORM_ID}
  />
{/snippet}

{#snippet iconField({
  Icon,
  name,
  type,
  value,
  placeholder,
  autofocus
}: {
  Icon: Component;
  name: string;
  type: HTMLInputTypeAttribute;
  value: string;
  placeholder?: string;
  autofocus?: boolean;
})}
  <div class={classNames("flex gap-3 items-center")}>
    <Icon />
    <!-- svelte-ignore a11y_autofocus -->
    <input
      {autofocus}
      required
      class={classNames(
        "flex-1 outline-none text-typography-attention cursor-text [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:text-typography-subtle [&::-webkit-calendar-picker-indicator]:opacity-60"
      )}
      {name}
      {type}
      {placeholder}
      {value}
    />
  </div>
{/snippet}

{#snippet content(file?: { fileUrl: string })}
  {#if isNil(file)}
    <span class="font-base text-typography-danger">{m.file_not_found()}</span>
  {:else}
    <form
      class="flex flex-col gap-4"
      method="POST"
      id={GIFT_FORM_ID}
      action="?/upsert"
      use:enhance={handleEnhance}
    >
      <div class="relative">
        <img class="rounded-inner" src={file.fileUrl} alt="file" />
        <IconButton
          class="absolute top-2 right-2 shadow-lg"
          label={m.action_replace_file()}
          Icon={IconEdit}
          action={handleFileReplace}
        />
      </div>
      <div class="flex flex-col gap-4">
        {@render iconField({
          Icon: IconText,
          name: "title",
          type: "text",
          value: props.data?.title ?? "",
          placeholder: m.placeholder_title(),
          autofocus: true
        })}
        {@render iconField({
          Icon: IconUser,
          name: "recipient",
          type: "text",
          value: props.data?.recipient ?? "",
          placeholder: m.placeholder_recipient()
        })}
        {@render iconField({
          Icon: IconCalendar,
          name: "releasedAt",
          type: "datetime-local",
          value: toDateTimeInputString(props.data?.releasedAt)
        })}
      </div>
    </form>
  {/if}
{/snippet}

<Modal
  id={GIFT_MODAL_ID}
  data={props.data}
  title={m.title_your_gift()}
  {actions}
  {content}
  onclose={handleClose}
/>
