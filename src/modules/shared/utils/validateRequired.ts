export const validateRequired = (arg: any, keys: any[]): any => {
  if (arg instanceof Array) {
    return arg.map(obj => validateRequired(obj, keys))
  }
  keys.forEach(key => {
    if (arg[key] == null) {
      throw {
        fieldName: key,
        message: `${key} should not be null or undefined`,
        constraint: 'isDefined',
      }
    }
  })
  return arg
}
