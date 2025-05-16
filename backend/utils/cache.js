const cache = new Map();

class Cache {
    static get(query) {
        return cache.get(query);
    }

    static set(query, result) {
        cache.set(query, result);
    }
}
module.exports = Cache;