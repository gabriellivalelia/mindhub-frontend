// Utilities to parse and format server dates.
// Some backends return local datetimes but append a trailing 'Z', which
// causes `new Date(isoString)` to interpret them as UTC and shift the time
// (commonly +3h). This helper normalizes that by removing a trailing 'Z'
// when present so the timestamp is parsed as local time.

export function parseServerDateToLocal(iso) {
  if (!iso) return null;
  if (iso instanceof Date) return iso;
  const s = String(iso).trim();

  // If string contains explicit timezone info (Z or +/-hh[:mm]), let JS parse it.
  // If it's a naive ISO (no timezone), assume the server sent a UTC timestamp
  // without the trailing Z — treat it as UTC by appending 'Z'. This converts
  // e.g. "2025-10-24T08:00:00" -> UTC 08:00 -> local 05:00 (UTC-3).
  const hasTZ = /([zZ]|[+-]\d{2}:?\d{2})$/.test(s);
  const toParse = hasTZ ? s : `${s}Z`;

  const d = new Date(toParse);
  if (isNaN(d.getTime())) return null;
  return d;
}

export function formatDateTime(iso, locale = "pt-BR", options = {}) {
  const d = parseServerDateToLocal(iso);
  if (!d) return "";
  return d.toLocaleString(locale, options);
}

export function formatTime(iso, locale = "pt-BR", options = {}) {
  const d = parseServerDateToLocal(iso);
  if (!d) return "";
  return d.toLocaleTimeString(locale, options);
}

export default { parseServerDateToLocal, formatDateTime, formatTime };
