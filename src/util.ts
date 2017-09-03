export function getValueByPath(obj, key): Object {
    return key.split(".").reduce(function(result, key) {
       return result[key]
    }, obj);
}

export function setValueByPath(obj, key, val): void {
    key.split(".").reduce(function(result, key) {
       result[key] = val;
    }, obj);
}
