export function FormatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
          // ✅ Use 12-hour format
  });
}
