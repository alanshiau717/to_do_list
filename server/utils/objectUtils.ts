export function removeUndefinedKeys(obj: Object) {
    Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])
    return obj
}