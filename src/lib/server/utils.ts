import pc from "picocolors";

type Service = "DB" | "CLEANUP";
type Variant = "info" | "success" | "error" | "warn";

export const log = (service: Service, message: string, variant: Variant) => {
  let prefix: string;

  const basePrefix = `[${service}]`;

  if (variant === "info") {
    prefix = pc.cyan(pc.bold(basePrefix));
  } else if (variant === "success") {
    prefix = pc.green(pc.bold(basePrefix));
  } else if (variant === "error") {
    prefix = pc.red(pc.bold(basePrefix));
  } else if (variant === "warn") {
    prefix = pc.yellow(pc.bold(basePrefix));
  } else {
    prefix = basePrefix;
  }

  console.log(`${prefix} ${message}`);
};
