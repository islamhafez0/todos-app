export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 10000) {
    return "just now";
  } else if (diff < 60000) {
    const seconds = Math.floor(diff / 1000);
    return `${seconds} seconds ago`;
  } else if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes} minutes ago`;
  } else if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours} hours ago`;
  } else if (diff < 172800000) {
    return "yesterday";
  } else {
    const days = Math.floor(diff / 86400000);
    return `${days} days ago`;
  }
}
