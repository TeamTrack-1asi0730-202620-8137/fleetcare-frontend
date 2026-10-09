export function toIsoDate(date) {
  if (!date) return null
  const d = date instanceof Date ? date : new Date(`${date}T12:00:00`)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
}
export function fromIsoDate(value) {
  return value ? new Date(`${value}T12:00:00`) : null
}
export function todayIsoDate() {
  return toIsoDate(new Date())
}
