export function updateObject(obj1: any, obj2: any) {
    function isObject(val: any) {
        return val !== null && typeof val === 'object' && !Array.isArray(val);
    }

    function isArray(val: any) {
        return Array.isArray(val);
    }

    function updateNestedObject(template: any, source: any) {
        const result: any = {};
        for (const key of Object.keys(template)) {
            if (!(key in source)) {
                if (key === 'ConfigKey') {
                    result[key] = template[key]; // Preserve ConfigKey's value
                } else {
                    result[key] = isArray(template[key]) ? [] : isObject(template[key]) ? {} : null;
                }
                continue;
            }

            if (isObject(template[key])) {
                result[key] = updateNestedObject(template[key], source[key]);
            } else if (isArray(template[key])) {
                result[key] = source[key].map((item: any, index: any) => {
                    if (isObject(item) && index < template[key].length) {
                        return updateNestedObject(template[key][0], item);
                    }
                    return item;
                });
            } else {
                result[key] = source[key];
            }
        }
        return result;
    }

    function hasSameStructure(obj1: any, obj2: any): any {
        if (isObject(obj1) && isObject(obj2)) {
            const keys1 = Object.keys(obj1).sort();
            const keys2 = Object.keys(obj2).sort();
            if (keys1.length !== keys2.length || !keys1.every((k, i) => k === keys2[i])) {
                return false;
            }
            return keys1.every(key => hasSameStructure(obj1[key], obj2[key]));
        } else if (isArray(obj1) && isArray(obj2)) {
            if (obj1.length === 0 || obj2.length === 0) {
                return true;
            }
            return hasSameStructure(obj1[0], obj2[0]);
        } else {
            return typeof obj1 === typeof obj2;
        }
    }

    if (hasSameStructure(obj1, obj2)) {
        return obj2;
    }

    function convert() {
        if (isArray(obj1) && isArray(obj2)) {
            return obj2.map((item, index) => {
                if (index < obj1.length && isObject(item)) {
                    return updateNestedObject(obj1[index], item);
                }
                return item;
            });
        } else if (isObject(obj1) && isObject(obj2)) {
            return updateNestedObject(obj1, obj2);
        } else {
            return obj2;
        }
    }

    return { convert, hasSameStructure }
}