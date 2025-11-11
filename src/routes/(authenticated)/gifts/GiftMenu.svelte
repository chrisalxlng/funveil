<script lang="ts">
  import { Gift, Menu, MenuGroup, MenuItem } from "$lib";
  import IconCopy from "~icons/mingcute/copy-2-line";
  import IconQrCode from "~icons/mingcute/qrcode-2-line";
  import IconPlay from "~icons/mingcute/play-line";
  import IconEdit from "~icons/mingcute/edit-2-line";
  import IconBack from "~icons/mingcute/back-2-line";
  import IconDelete from "~icons/mingcute/delete-2-line";
  import { isNil } from "lodash-es";
  import { m } from "$lib/paraglide/messages";

  type Props = {
    id: string;
    gift: Gift.QueryResponse;
    onlinkcopy?: () => void;
    onqrcodesave?: () => void;
    onpreviewopen?: () => void;
    onedit?: () => void;
    onmarkunopened?: () => void;
    ondelete?: () => void;
  };
  let props: Props = $props();
</script>

<Menu id={props.id}>
  {#if isNil(props.gift.openedAt)}
    <MenuGroup>
      <MenuItem Icon={IconCopy} label={m.action_copy_link()} action={props.onlinkcopy} />
      <MenuItem Icon={IconQrCode} label={m.action_save_qr_code()} action={props.onqrcodesave} />
    </MenuGroup>
  {/if}
  <MenuGroup>
    <MenuItem Icon={IconPlay} label={m.action_show_preview()} action={props.onpreviewopen} />
  </MenuGroup>
  <MenuGroup>
    {#if isNil(props.gift.openedAt)}
      <MenuItem Icon={IconEdit} label={m.action_edit()} action={props.onedit} />
    {:else}
      <MenuItem Icon={IconBack} label={m.action_mark_as_unopened()} action={props.onmarkunopened} />
    {/if}
    <MenuItem
      Icon={IconDelete}
      label={m.action_delete()}
      action={props.ondelete}
      options={{ isDanger: true }}
    />
  </MenuGroup>
</Menu>
