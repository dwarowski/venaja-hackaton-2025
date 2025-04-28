export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0'); // Добавляем ведущий 0
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export function formatDateTime(date: Date): string {
  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return `${formatDate(date)}, ${formatTime(date)}`;
}

export type TimeRange = [start: Date, end: Date];