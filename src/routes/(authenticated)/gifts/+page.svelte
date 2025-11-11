<script lang="ts">
  import {
    FloatingActionButton,
    Gift,
    List,
    TabGroup,
    TabItem,
    openFilePickerAsync,
    getLocalDateTime,
    ConfirmModal,
    isFuture,
    formatDate,
    saveFile,
    notification,
    useAuth,
    ActionButton
  } from "$lib";
  import QRCode from "qrcode";
  import { goto, invalidateAll } from "$app/navigation";
  import { page } from "$app/state";
  import { type Component } from "svelte";
  import type { PageProps } from "../gifts/$types";
  import Button from "$lib/components/Button/Button.svelte";
  import IconAdd from "~icons/mingcute/add-fill";
  import IconDelete from "~icons/mingcute/delete-2-line";
  import IconGift from "~icons/mingcute/gift-line";
  import IconEmptyBox from "~icons/mingcute/empty-box-line";
  import { isEmpty, isNil } from "lodash-es";
  import { useModal } from "$lib/components/Layout/Modal/useModal.svelte";
  import GiftModal from "./GiftModal.svelte";
  import GiftMenu from "./GiftMenu.svelte";
  import Countdown from "$lib/components/Misc/Countdown.svelte";
  import {
    DELETE_GIFT_CONFIRM_MODAL_ID,
    GIFT_MODAL_ID,
    PAGE_QUERY_PARAM_KEY,
    STATUS_QUERY_PARAM_KEY,
    type TabItemStatus
  } from "./definitions";
  import { env } from "$env/dynamic/public";
  import { v4 as uuid } from "uuid";
  import { applyAction, deserialize } from "$app/forms";
  import { m } from "$lib/paraglide/messages";

  const giftModal = useModal<Gift.FormValues>(GIFT_MODAL_ID);
  const deleteGiftConfirmModal = useModal(DELETE_GIFT_CONFIRM_MODAL_ID);

  const status = $derived(
    (page.url.searchParams.get(STATUS_QUERY_PARAM_KEY) as TabItemStatus) ?? "pending"
  );

  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(page.url.searchParams);
    params.set(key, value);
    if (key === STATUS_QUERY_PARAM_KEY) {
      params.set(PAGE_QUERY_PARAM_KEY, "1");
    }
    goto(`?${params.toString()}`);
  };

  const setStatus = (newStatus: TabItemStatus) =>
    updateQueryParam(STATUS_QUERY_PARAM_KEY, newStatus);
  const setPage = (newPage: number) => updateQueryParam(PAGE_QUERY_PARAM_KEY, newPage.toString());

  let { data }: PageProps = $props();

  const auth = useAuth();

  const buildListMenuId = (itemId: string) => `list-menu-${itemId}`;
  const buildGiftUrl = (giftId: string) => `${window.location.origin}/gift/${giftId}`;

  const handleAdd = async () => {
    const files = await openFilePickerAsync({ accept: [".jpg", ".png", ".jpeg"] });
    if (!isNil(files) && !isEmpty(files)) {
      const [firstFile] = files;
      const fileUrl = URL.createObjectURL(firstFile);
      const fileName = firstFile.name;
      const giftId = uuid();
      const fileId = uuid();

      giftModal.open(
        Gift.getFormValues({
          giftId,
          fileUrl,
          fileName,
          fileId,
          releasedAt: getLocalDateTime()
        })
      );
    }
  };

  const handleEdit = async (gift: Gift.QueryResponse) => {
    const token = await auth.getToken();
    const response = await fetch(
      `${env.PUBLIC_STASH_URL}/v1/clients/${env.PUBLIC_KEYCLOAK_CLIENT_ID}/files/${gift.fileId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    let fileUrl: string;

    if (response.ok) {
      const blob = await response.blob();
      fileUrl = URL.createObjectURL(blob);
    }

    setTimeout(() =>
      giftModal.open(
        Gift.getFormValues({
          ...gift,
          fileUrl,
          isFileUploaded: true
        })
      )
    );
  };

  const handleLinkCopy = async ({ giftId }: Gift.QueryResponse) => {
    try {
      const url = buildGiftUrl(giftId);
      await navigator.clipboard.writeText(url);
      notification.show(m.notification_link_copied(), "success");
    } catch {
      notification.show(m.notification_link_not_copied(), "error");
    }
  };

  const handleQrCodeSave = async ({ giftId, title }: Gift.QueryResponse) => {
    const url = buildGiftUrl(giftId);

    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 750,
        margin: 4,
        color: {
          dark: "#000000",
          light: "#ffffff"
        },
        errorCorrectionLevel: "H"
      });

      const response = await fetch(dataUrl);
      const blob = await response.blob();

      const file = new File([blob], `qr-code-${giftId}.png`, { type: "image/png" });

      await saveFile(file, title);
    } catch {
      notification.show(m.notification_qr_code_not_saved(), "error");
    }
  };
  const handlePreviewOpen = ({ giftId }: Gift.QueryResponse) => {
    const url = `${window.location.origin}/preview/${giftId}`;

    window.open(url, "_blank", "noreferrer,noopener");
  };

  const handleDelete = async ({ giftId, fileId }: Gift.QueryResponse) => {
    deleteGiftConfirmModal.close();

    try {
      const formData = new FormData();
      formData.set("giftId", giftId);

      const response = await fetch("?/delete", {
        method: "POST",
        body: formData
      });

      const result = deserialize(await response.text());

      if (result.type !== "success") {
        applyAction(result);
        throw new Error("Server could not delete the gift record.");
      }

      const token = await auth.getToken();

      const fileStorageResponse = await fetch(
        `${env.PUBLIC_STASH_URL}/v1/clients/${env.PUBLIC_KEYCLOAK_CLIENT_ID}/files/${fileId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (!fileStorageResponse.ok) {
        console.warn("Gift was removed from DB, but the corresponding file could not be deleted.");
      }

      await invalidateAll();
      notification.show(m.notification_gift_deleted(), "success");
      applyAction(result);
    } catch (error) {
      console.error(error);
      notification.show(m.notification_gift_not_deleted(), "error");
    }
  };

  const handleMarkUnopened = async ({ giftId }: Gift.QueryResponse) => {
    try {
      const formData = new FormData();
      formData.set("giftId", giftId);

      const response = await fetch("?/markUnopened", {
        method: "POST",
        body: formData
      });

      const result = deserialize(await response.text());

      if (result.type !== "success") {
        applyAction(result);
        throw new Error("Server could not mark the gift record as unopened.");
      }

      await invalidateAll();
      notification.show(m.notification_gift_marked_as_unopened(), "success");
      applyAction(result);
    } catch (error) {
      console.error(error);
      notification.show(m.notification_gift_not_marked_as_unopened(), "error");
    }
  };

  const handleModalSubmit = () => {
    giftModal.close();
    notification.show(m.notification_gift_wrapped(), "success");
  };
</script>

{#snippet giftStatus(Icon: Component, label: string)}
  <div class="flex flex-col items-center">
    <Icon class="font-bold text-4xl text-typography-attention whitespace-nowrap" />
    <span class="font-base font-medium text-sm text-typography-subtle">{label}</span>
  </div>
{/snippet}

<svelte:head>
  <title>{m.title_your_gifts()}</title>
</svelte:head>

<div class="flex flex-col items-center">
  <TabGroup class="w-full desktop:w-max z-1" selectedItemId={status} onitemselect={setStatus}>
    <TabItem id="pending" label={m.tab_status_pending()} />
    <TabItem id="opened" label={m.tab_status_opened()} />
  </TabGroup>
  <List class="-translate-0.5 w-full desktop:w-120">
    {#if isEmpty(data.gifts)}
      <div class="flex flex-col items-center gap-2 px-8 py-20 text-center">
        <span class="font-display font-bold text-lg text-typography-attention">
          {#if status === "pending"}
            {m.pending_empty_state_title()}
          {:else}
            {m.opened_empty_state_title()}
          {/if}
        </span>
        <span class="font-base text-typography-subtle text-sm">
          {#if status === "pending"}
            {m.pending_empty_state_description()}
          {:else}
            {m.opened_empty_state_description()}
          {/if}
        </span>
      </div>
    {:else}
      {#each data.gifts as gift (gift.giftId)}
        <div>
          <Button
            class="bg-base grid grid-cols-[80px_1fr] gap-6 p-6 w-full"
            label={gift.title}
            popovertarget={buildListMenuId(gift.giftId)}
          >
            {#if !isNil(gift.openedAt)}
              {@render giftStatus(IconEmptyBox, formatDate(gift.openedAt))}
            {:else if !isFuture(gift.releasedAt)}
              {@render giftStatus(IconGift, m.gift_status_unopened())}
            {:else}
              <Countdown value={gift.releasedAt} compact />
            {/if}
            <div class="flex flex-col items-start gap-2">
              <span class="font-display font-bold text-lg/6 text-typography-attention text-start"
                >{gift.title}</span
              >
              <span class="font-base text-sm text-typography-subtle"
                >{m.util_for({ recipient: gift.recipient })}</span
              >
            </div>
          </Button>
          <GiftMenu
            id={buildListMenuId(gift.giftId)}
            {gift}
            onqrcodesave={() => handleQrCodeSave(gift)}
            onlinkcopy={() => handleLinkCopy(gift)}
            onpreviewopen={() => handlePreviewOpen(gift)}
            onedit={() => handleEdit(gift)}
            ondelete={() => setTimeout(() => deleteGiftConfirmModal.open())}
            onmarkunopened={() => handleMarkUnopened(gift)}
          />
          <ConfirmModal
            id={DELETE_GIFT_CONFIRM_MODAL_ID}
            Icon={IconDelete}
            label={m.action_delete_gift()}
            message={m.confirm_message_delete_gift()}
            onconfirm={() => handleDelete(gift)}
          />
        </div>
      {/each}
    {/if}

    {#if data.pagination.totalPages > 1}
      <div class="flex items-center justify-between p-4">
        <ActionButton
          variant="subtle"
          label={m.action_previous()}
          disabled={!data.pagination.hasPrevPage}
          action={() => setPage(data.pagination.currentPage - 1)}
        />
        <span class="font-base text-sm text-typography-subtle">
          {m.page_current_of_total({
            currentPage: data.pagination.currentPage,
            totalPages: data.pagination.totalPages
          })}
        </span>

        <ActionButton
          variant="subtle"
          label={m.action_next()}
          disabled={!data.pagination.hasNextPage}
          action={() => setPage(data.pagination.currentPage + 1)}
        />
      </div>
    {/if}
  </List>
</div>
<FloatingActionButton Icon={IconAdd} label={m.action_add_gift()} action={handleAdd} />
<GiftModal data={giftModal.data} onsubmit={handleModalSubmit} />
