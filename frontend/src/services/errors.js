export const getErrorMessage = (err, fallback = 'Something went wrong. Please try again.') => {
  if (!err) return fallback;
  if (typeof err === 'string') return err;
  if (err instanceof Error && err.message) return err.message;

  const detail = err?.response?.data?.detail;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    const parts = detail
      .map((item) => {
        if (typeof item === 'string') return item;
        if (item && typeof item === 'object') {
          const msg = item.msg || item.message;
          return msg ? String(msg) : null;
        }
        return null;
      })
      .filter(Boolean);
    if (parts.length) return parts.join(' ');
    return 'Invalid input. Please check your details and try again.';
  }
  if (detail && typeof detail === 'object') {
    const msg = detail.msg || detail.message;
    if (msg) return String(msg);
  }

  if (err?.message) return err.message;
  return fallback;
};
