const PeekIterator = require('../common/PeekIterator')

const arraytoGenerator = require('../common/arrayToGenerator')

const { assert } = require('chai')

describe('test PeekIterator', () => {
    it('test_peek', () => {
        const it = new PeekIterator(arraytoGenerator([..."abcdef"]))
        assert.equal(it.next(), "a")
        assert.equal(it.next(), "b")
        assert.equal(it.peek(), "c")
        assert.equal(it.peek(), "c")
        assert.equal(it.next(), "c")
        assert.equal(it.next(), "d")
        assert.equal(it.next(), "e")
        assert.equal(it.next(), "f")
    })
    it('test_lookahead2', () => {
        const it = new PeekIterator(arraytoGenerator([..."abcdef"]))
        assert.equal(it.next(), 'a')
        assert.equal(it.peek(), 'b')
        assert.equal(it.peek(), 'b')
        assert.equal(it.next(), 'b')
        assert.equal(it.next(), 'c')
        it.putBack()
        it.putBack()
        assert.equal(it.next(), 'b')
        assert.equal(it.next(), 'c')
        assert.equal(it.next(), 'd')
    })
    it('test_endToken', () => {
        let arrString = "abcdef"
        const it = new PeekIterator(arraytoGenerator([...arrString]), '\0')
        for (let i = 0; i < arrString.length + 1; i++) {
            if (i === arrString.length) {
                assert.equal(it.next(), '\0')
            } else {
                assert.equal(it.next(), arrString[i])
            }
        }
    })
})