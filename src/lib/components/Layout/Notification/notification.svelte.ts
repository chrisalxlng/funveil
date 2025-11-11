type NotificationData = {
  message: string;
  variant: "success" | "error";
} | null;

let currentNotification = $state<NotificationData>(null);

export const notification = {
  get current() {
    return currentNotification;
  },
  show(message: string, variant: "success" | "error" = "success") {
    currentNotification = { message, variant };
  },
  dismiss() {
    currentNotification = null;
  }
};
