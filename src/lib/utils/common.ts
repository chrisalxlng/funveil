export const delay = (ms: number, signal?: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });

export const toMs = (value: string): number => {
  const match = value.trim().match(/^([\d.]+)\s*(ms|s)$/);

  if (!match) {
    throw new Error(`Invalid duration: "${value}"`);
  }

  const num = Number(match[1]);
  const unit = match[2];

  return unit === "s" ? num * 1000 : num;
};
