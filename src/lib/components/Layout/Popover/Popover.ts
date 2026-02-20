export const positionPopover = (node: HTMLElement) => {
  const popoverId = node.id;
  if (!popoverId) {
    console.error("The popover element must have an 'id' for positioning.");
    return { destroy() {} };
  }

  const PADDING = 8;
  const SMALL_SCREEN_QUERY = "(min-width: 500px)";
  const mediaQuery = window.matchMedia(SMALL_SCREEN_QUERY);

  const findTrigger = () =>
    document.querySelector(`[popovertarget="${popoverId}"]`) as HTMLElement | null;

  const handler = () => {
    if (!node.matches(":popover-open")) return;

    node.style.visibility = "hidden";

    node.style.top = "";
    node.style.left = "";
    node.style.right = "";
    node.style.bottom = "";
    node.style.width = "";
    node.style.position = "";

    const isDesktop = mediaQuery.matches;
    const trigger = findTrigger();

    if (isDesktop && trigger) {
      node.style.position = "absolute";
      node.style.width = "fit-content";

      const menuRect = node.getBoundingClientRect();
      const buttonRect = trigger.getBoundingClientRect();

      let left = buttonRect.left;

      if (left + menuRect.width > window.innerWidth - PADDING) {
        left = window.innerWidth - menuRect.width - PADDING;
      }

      left = Math.max(PADDING, left);

      let top = buttonRect.top - menuRect.height - PADDING;

      if (top < PADDING) {
        top = buttonRect.bottom + PADDING;
      }

      if (top + menuRect.height > window.innerHeight - PADDING) {
        top = window.innerHeight - menuRect.height - PADDING;
      }

      node.style.top = `${top}px`;
      node.style.left = `${left}px`;
    } else {
      node.style.position = "fixed";
      node.style.width = "100vw";
      node.style.left = "0px";
      node.style.bottom = "0px";
      node.style.top = "auto";
    }

    node.style.visibility = "visible";
  };

  node.addEventListener("toggle", handler);
  mediaQuery.addEventListener("change", handler);

  window.addEventListener("resize", handler);

  return {
    destroy() {
      node.removeEventListener("toggle", handler);
      mediaQuery.removeEventListener("change", handler);
      window.removeEventListener("resize", handler);
    }
  };
};
