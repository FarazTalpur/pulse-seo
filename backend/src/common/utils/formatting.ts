export function formatDateLabel(date?: Date | null): string {
  if (!date) {
    return '—';
  }
  return date.toISOString().split('T')[0];
}

export function formatRelativeTime(date?: Date | null): string {
  if (!date) {
    return '—';
  }
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffSeconds = Math.max(Math.floor(diffMs / 1000), 0);
  if (diffSeconds < 60) {
    return 'Just now';
  }
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export function formatNumber(value?: number | null): string {
  const safeValue = value ?? 0;
  return safeValue.toLocaleString('en-US');
}

export function humanizeKey(key: string): string {
  return key
    .replace(/[_-]+/g, ' ')
    .replace(/\./g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatEtaLabel(date?: Date | null): string {
  if (!date) {
    return 'No due date';
  }
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDue = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round(
    (startOfDue.getTime() - startOfToday.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) {
    return 'Today';
  }
  if (diffDays === 1) {
    return 'Tomorrow';
  }
  if (diffDays < 0) {
    return 'Overdue';
  }
  return formatDateLabel(date);
}
