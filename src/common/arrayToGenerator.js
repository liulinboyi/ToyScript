function* arrayToGenerator(arr) {
    for (let item of arr) {
        yield item
    }
}

module.exports = arrayToGenerator
