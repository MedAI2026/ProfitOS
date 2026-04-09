export function formatNumber(value: number, digits = 1) {
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatPercent(value: number, digits = 1) {
  return `${formatNumber(value, digits)}%`;
}

export function formatSigned(value: number, digits = 1) {
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${formatNumber(value, digits)}`;
}
