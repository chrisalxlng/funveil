<script lang="ts">
  import { IconButton, LogoButton, Menu, MenuGroup, MenuItem, useAuth, UserInfo } from "$lib";
  import IconMore from "~icons/mingcute/more-1-fill";
  import IconExit from "~icons/mingcute/exit-line";
  import { m } from "$lib/paraglide/messages";

  let { children } = $props();
  const OPTIONS_MENU_ID = "options-menu";

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
    {@render children()}
  </main>
</div>
