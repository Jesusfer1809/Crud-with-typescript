export const trimDate = (date: Date): string => {
  const fullDate = new Date(date)

  const trimmed = fullDate.toString().split('').slice(0, 24).join('')
  return trimmed
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

export const defaultToastStyle = {
  borderRadius: '2px',
  background: '#333',
  color: '#fff'
}
