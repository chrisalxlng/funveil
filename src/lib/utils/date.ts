type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const getLocalDateTime = (): string => {
  const d = new Date();
  const pad = (n: number): string => String(n).padStart(2, "0");

  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(date));

export const getCountdown = (targetDate: string): Countdown => {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();

  const diff = Math.max(target - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
};

export const getMsUntil = (targetDate: string): number => {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();

  return target - now;
};

export const isFuture = (targetDate: string): boolean => {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();

  return target > now;
};

export const toDateTimeInputString = (isoDate: string | undefined): string => {
  if (!isoDate) return "";

  const date = new Date(isoDate);

  if (isNaN(date.getTime())) return "";

  const pad = (n: number) => String(n).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const getSeconds = ({ days, hours, minutes, seconds }: Countdown) =>
  days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
