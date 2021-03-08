export function minmax(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

export function getProminentKeyValue(obj) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1])[0];
}
