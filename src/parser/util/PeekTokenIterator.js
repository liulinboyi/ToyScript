const PeekIterator = require('../../common/PeekIterator.js')
const ParseException = require('./ParseException.js')

class PeekTokenIterator extends PeekIterator {
    constructor(it) {
        super(it)
    }

    nextMatch(value) {
        let token = this.next()
        if (token.value !== value) {
            throw ParseException.fromToken(token)
        }
        return token
    }

    nextMatchType(type) {
        let token = this.next()
        if (token.type !== type) {
            throw ParseException.fromToken(type)
        }
        return token
    }
}

module.exports = PeekTokenIterator
