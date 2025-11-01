/**
 * Converte uma string de data ISO do servidor para um objeto Date local.
 * Se a data não tiver timezone, assume UTC e converte para o fuso horário local.
 *
 * @param {string|Date|null} iso - String de data no formato ISO 8601, objeto Date ou null
 * @returns {Date|null} Objeto Date no fuso horário local ou null se inválido
 *
 * @example
 * parseServerDateToLocal("2025-11-01T14:30:00")
 * // Returns: Date object no fuso horário local
 *
 * parseServerDateToLocal("2025-11-01T14:30:00Z")
 * // Returns: Date object ajustado para o fuso horário local
 */
export function parseServerDateToLocal(iso) {
  if (!iso) return null;
  if (iso instanceof Date) return iso;
  const s = String(iso).trim();
  const hasTZ = /([zZ]|[+-]\d{2}:?\d{2})$/.test(s);
  const toParse = hasTZ ? s : `${s}Z`;

  const d = new Date(toParse);
  if (isNaN(d.getTime())) return null;
  return d;
}

/**
 * Formata uma data ISO em formato legível de data e hora.
 *
 * @param {string|Date|null} iso - String de data no formato ISO 8601, objeto Date ou null
 * @param {string} [locale="pt-BR"] - Locale para formatação (padrão: "pt-BR")
 * @param {Object} [options={}] - Opções de formatação do Intl.DateTimeFormat
 * @returns {string} Data formatada ou string vazia se inválida
 *
 * @example
 * formatDateTime("2025-11-01T14:30:00Z")
 * // Returns: "01/11/2025, 11:30:00" (considerando UTC-3)
 */
export function formatDateTime(iso, locale = "pt-BR", options = {}) {
  const d = parseServerDateToLocal(iso);
  if (!d) return "";
  return d.toLocaleString(locale, options);
}

/**
 * Formata apenas a hora de uma data ISO.
 *
 * @param {string|Date|null} iso - String de data no formato ISO 8601, objeto Date ou null
 * @param {string} [locale="pt-BR"] - Locale para formatação (padrão: "pt-BR")
 * @param {Object} [options={}] - Opções de formatação do Intl.DateTimeFormat
 * @returns {string} Hora formatada ou string vazia se inválida
 *
 * @example
 * formatTime("2025-11-01T14:30:00Z")
 * // Returns: "11:30:00" (considerando UTC-3)
 */
export function formatTime(iso, locale = "pt-BR", options = {}) {
  const d = parseServerDateToLocal(iso);
  if (!d) return "";
  return d.toLocaleTimeString(locale, options);
}

export default { parseServerDateToLocal, formatDateTime, formatTime };
