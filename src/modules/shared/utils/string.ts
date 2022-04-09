export function isString(value: unknown): value is string {
  return Object.prototype.toString.call(value) === '[object String]'
}

export function isTrueString(value: string): boolean {
  return value.toLowerCase() === 'true'
}
