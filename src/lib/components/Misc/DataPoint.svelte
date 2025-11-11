<script lang="ts">
  import classNames from "classnames";

  type Props = {
    class?: string;
    value: string | number;
    label: string;
  };

  let { value, label, class: className }: Props = $props();

  let valueElement: HTMLElement;
  let containerElement: HTMLDListElement;

  $effect(() => {
    if (!valueElement || !containerElement) return;

    value;

    const adjustFontSize = () => {
      valueElement.style.fontSize = "";

      const containerWidth = containerElement.clientWidth;
      const valueWidth = valueElement.scrollWidth;

      if (valueWidth > containerWidth) {
        const scale = containerWidth / valueWidth;
        const currentSize = parseFloat(getComputedStyle(valueElement).fontSize);
        const newSize = currentSize * scale * 0.95;

        valueElement.style.fontSize = `${newSize}px`;
      }
    };

    adjustFontSize();

    window.addEventListener("resize", adjustFontSize);
    return () => window.removeEventListener("resize", adjustFontSize);
  });
</script>

<dl bind:this={containerElement} class={classNames("flex flex-col items-center", className)}>
  <dd
    bind:this={valueElement}
    class="font-bold text-4xl text-typography-attention whitespace-nowrap"
  >
    {value}
  </dd>
  <dt class="font-base font-medium text-sm text-typography-subtle">{label}</dt>
</dl>
