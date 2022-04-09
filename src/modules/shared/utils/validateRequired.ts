export const validateRequired = (arg: { [x: string]: any }, keys: any[]) => {
  keys.forEach(key => {
    if (!arg[key]) {
      throw {
        fieldName: key,
        message: `${key} should not be null or undefined`,
        constraint: 'isDefined',
      }
    }
  })
  return arg
}
