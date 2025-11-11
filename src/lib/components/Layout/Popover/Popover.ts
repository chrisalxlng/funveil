export const positionPopover = (node: HTMLElement) => {
  const popoverId = node.id;
  if (!popoverId) {
    console.error("The popover element must have an 'id' for positioning.");
    return { destroy() {} };
  }

  const SMALL_SCREEN_QUERY = "(min-width: 500px)";
  const mediaQuery = window.matchMedia(SMALL_SCREEN_QUERY);

  const findTrigger = () =>
    document.querySelector(`[popovertarget="${popoverId}"]`) as HTMLElement | null;

  const handler = () => {
    if (!node.matches(":popover-open")) return;

    node.style.visibility = "hidden";

    const PADDING = 8;
    node.style.top = "";
    node.style.left = "";
    node.style.right = "";
    node.style.bottom = "";
    node.style.position = "";

    const isDesktop = mediaQuery.matches;
    let top = 0;
    let left = 0;
    let width = "";

    if (isDesktop) {
      const trigger = findTrigger();
      if (!trigger) return;

      width = "fit-content";
      node.style.position = "absolute";
      node.style.width = width;

      const menuRect = node.getBoundingClientRect();
      const buttonRect = trigger.getBoundingClientRect();

      const fits = (top: number, left: number) => {
        return (
          top >= PADDING &&
          left >= PADDING &&
          top + menuRect.height <= window.innerHeight - PADDING &&
          left + menuRect.width <= window.innerWidth - PADDING
        );
      };

      top = buttonRect.top - menuRect.height - PADDING;
      left = buttonRect.left;

      if (!fits(top, left)) {
        top = buttonRect.bottom + PADDING;
        left = buttonRect.left;

        if (!fits(top, left)) {
          top = buttonRect.top;
          left = buttonRect.right + PADDING;
        }
      }

      node.style.top = `${top}px`;
      node.style.left = `${left}px`;
    } else {
      width = "100vw";
      node.style.position = "fixed";
      node.style.width = width;

      node.style.bottom = "0px";
      node.style.left = "0px";

      const menuRect = node.getBoundingClientRect();
      top = window.innerHeight - menuRect.height;

      node.style.top = `${top}px`;
    }

    node.style.visibility = "visible";
  };

  node.addEventListener("toggle", handler);
  mediaQuery.addEventListener("change", handler);

  return {
    destroy() {
      node.removeEventListener("toggle", handler);
      mediaQuery.removeEventListener("change", handler);
    }
  };
};
