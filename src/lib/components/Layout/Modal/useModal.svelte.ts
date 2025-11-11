import { isNil } from "lodash-es";

export const useModal = <T>(id: string) => {
  let data = $state<T | undefined>();

  const open = (initialData?: T) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (isNil(modal)) throw new Error("modal not found");

    data = initialData;
    modal.showModal();
  };

  const close = () => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (isNil(modal)) throw new Error("modal not found");

    modal.close();
    data = undefined;
  };

  return {
    get data() {
      return data;
    },
    open,
    close
  };
};
