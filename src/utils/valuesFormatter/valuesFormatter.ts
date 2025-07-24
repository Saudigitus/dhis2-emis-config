export function areObjectsEqual(obj1: any, obj2: any): boolean {
    function isObject(val: any): boolean {
        return val !== null && typeof val === 'object' && !Array.isArray(val);
    }

    function isArray(val: any): boolean {
        return Array.isArray(val);
    }

    function areEqual(obj1: any, obj2: any): boolean {
        if (isObject(obj1) && isObject(obj2)) {
            const keys1 = Object.keys(obj1).sort();
            const keys2 = Object.keys(obj2).sort();
            if (keys1.length !== keys2.length || !keys1.every((k, i) => k === keys2[i])) {
                return false;
            }
            return keys1.every(key => areEqual(obj1[key], obj2[key]));
        } else if (isArray(obj1) && isArray(obj2)) {
            if (obj1.length !== obj2.length) {
                return false;
            }
            return obj1.every((item: any, index: number) => areEqual(item, obj2[index]));
        } else {
            return obj1 === obj2;
        }
    }

    return areEqual(obj1, obj2);
}