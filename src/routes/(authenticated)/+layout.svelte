<script lang="ts">
  import {
    Button,
    IconButton,
    LogoButton,
    Menu,
    MenuGroup,
    MenuItem,
    Popover,
    useAuth,
    UserInfo
  } from "$lib";
  import IconMore from "~icons/mingcute/more-1-fill";
  import IconExit from "~icons/mingcute/exit-line";
  import IconInfo from "~icons/mingcute/information-line";
  import IconClose from "~icons/mingcute/close-fill";
  import { m } from "$lib/paraglide/messages";

  let { children } = $props();
  const OPTIONS_MENU_ID = "options-menu";
  const DEMO_POPOVER_ID = "demo-popover";

  const auth = useAuth();
</script>

<div class="flex flex-col h-dvh w-screen overflow-hidden bg-background">
  <aside
    class="z-99 p-6 grid grid-cols-3 desktop:flex desktop:flex-col-reverse desktop:justify-between desktop:absolute desktop:h-screen"
  >
    <IconButton Icon={IconMore} label="Mehr" popovertarget={OPTIONS_MENU_ID} />
    <LogoButton class="justify-self-center w-fit" />
    <Menu id={OPTIONS_MENU_ID}>
      <MenuGroup>
        <UserInfo
          firstName={auth.userInfo?.given_name ?? ""}
          lastName={auth.userInfo?.family_name ?? ""}
          emailAddress={auth.userInfo?.email ?? ""}
        />
      </MenuGroup>
      <MenuGroup>
        <MenuItem
          Icon={IconExit}
          label={m.action_sign_out()}
          options={{ isDanger: true }}
          action={auth.logout}
        />
      </MenuGroup>
    </Menu>
  </aside>
  <main class="flex-1 p-0 flex flex-col desktop:h-full desktop:p-3">
    {#if auth.userInfo?.is_demo}
      <div class="absolute z-99 flex desktop:justify-end right-6 top-6">
        <Button
          type="scale"
          popovertarget={DEMO_POPOVER_ID}
          label={m.demo()}
          class="flex rounded-default bg-info text-typography-on-info py-2 px-4 font-base font-medium text-xs gap-1 items-center shadow-2xs cursor-pointer"
        >
          <IconInfo />
          <span>{m.demo()}</span>
        </Button>
      </div>
    {/if}
    {@render children()}
  </main>
</div>

{#if auth.userInfo?.is_demo}
  <Popover id={DEMO_POPOVER_ID} element="div" class="desktop:max-w-96">
    <div class="flex flex-col">
      <IconButton
        Icon={IconClose}
        label={m.action_close()}
        class="desktop:hidden self-end"
        popovertarget={DEMO_POPOVER_ID}
      />
      <div class="px-5 desktop:pt-3 pb-3 flex flex-col gap-2">
        <span class="font-display text-typography-attention font-bold">{m.demo_info_heading()}</span
        >
        <ul class="pl-4">
          {#each [m.demo_info_item_1(), m.demo_info_item_2(), m.demo_info_item_3()] as item}
            <li class="font-base text-typography-subtle list-disc list-outside py-1 text-sm">
              {item}
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </Popover>
{/if}
