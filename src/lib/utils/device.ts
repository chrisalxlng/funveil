export const isMobileDevice = (): boolean => {
  if (typeof window === "undefined") return false;

  const ua = navigator.userAgent;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  return isMobileUA || isTouch;
};
