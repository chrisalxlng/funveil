import { isMobileDevice } from "./device";

type FilePickerOptions = {
  multiple?: boolean;
  accept?: string[];
  maxSize?: number;
};

export class FilePickerError extends Error {
  constructor(public code: "FILE_TOO_LARGE") {
    super(code);
  }
}

export const openFilePickerAsync = (options: FilePickerOptions = {}): Promise<FileList | null> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.style.visibility = "hidden";

    if (options.accept !== undefined) input.accept = options.accept.join(",");
    if (options.multiple !== undefined) input.multiple = options.multiple;

    document.body.appendChild(input);

    const cleanup = () => {
      input.remove();
      input.removeEventListener("change", onChange);
      input.removeEventListener("cancel", onCancel);
    };

    const onCancel = () => {
      cleanup();
      resolve(null);
    };

    const onChange = () => {
      const files = input.files;

      if (files && options.maxSize) {
        for (const file of Array.from(files)) {
          if (file.size > options.maxSize) {
            cleanup();
            reject(new FilePickerError("FILE_TOO_LARGE"));
            return;
          }
        }
      }

      cleanup();
      resolve(files?.length ? files : null);
    };

    input.addEventListener("change", onChange);
    input.addEventListener("cancel", onCancel);

    input.value = "";
    input.click();
  });
};

export const shareFiles = async (data: ShareData): Promise<void> => {
  if (navigator.canShare && navigator.canShare(data)) {
    return await navigator.share(data);
  }
  throw new Error("Web Share API not supported.");
};

export const downloadFile = (fileUrl: string, fileName: string = "file"): void => {
  const safeFileName = fileName.replace(/[^a-z0-9.]/gi, "-").toLowerCase();

  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = safeFileName;
  link.click();
};

export const saveFile = async (file: File, title: string) => {
  const extension = file.type.split("/")[1] || "png";
  const fileNameWithExt = `${title}.${extension}`;

  const data: ShareData = {
    files: [file],
    title: title
  };

  if (isMobileDevice() && navigator.canShare && navigator.canShare(data)) {
    try {
      await navigator.share(data);
      return;
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
    }
  }

  const url = URL.createObjectURL(file);
  downloadFile(url, fileNameWithExt);

  setTimeout(() => URL.revokeObjectURL(url), 2000);
};
