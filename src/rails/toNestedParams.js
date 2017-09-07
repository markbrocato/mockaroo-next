
export default function serialize(obj) {
    const result = {}

    if (typeof obj !== 'object') {
        return obj
    }

    for (let key in obj) {
        const value = obj[key]

        if (value == null) {
            result[key] = null
        } else if (Array.isArray(value)) {
            result[`${key}_attributes`] = value.map(item => serialize(item))
        } else if (value.id) {
            result[`${key}_id`] = value.id
        } else {
            result[key] = value
        }
    }

    return result
}