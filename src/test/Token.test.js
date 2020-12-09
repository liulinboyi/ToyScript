const { assert, expect } = require('chai')
const Token = require('../lexer/Token.js')
const arraytoGenerator = require('../common/arrayToGenerator')
const PeekIterator = require('../common/PeekIterator.js')

describe('test Token', () => {
    it("KEYWORD", () => {
        let keyWords = ["var",
            "if",
            "else",
            "for",
            "while",
            "break",
            "function",
            "return"]
        let allIt = []
        for (let item of keyWords) {
            allIt.push(new PeekIterator(arraytoGenerator([...item]), '\0'))
        }
        for (let item of allIt) {
            assert.equal(Token.makeVarOrKeyword(item).getType, 'KEYWORD')
            assert.equal(Token.makeVarOrKeyword(item).value, item.peek())
        }
    })

    it("BOOLEAN", () => {
        let keyWords = ["true", "false"]
        let allIt = []
        for (let item of keyWords) {
            allIt.push(new PeekIterator(arraytoGenerator([...item]), '\0'))
        }
        for (let item of allIt) {
            assert.equal(Token.makeVarOrKeyword(item).getType, 'BOOLEAN')
            assert.equal(Token.makeVarOrKeyword(item).value, item.peek())
        }
    })

    it("VARIABLE", () => {
        let keyWords = ["item", "hello", "_fake"]
        let allIt = []
        for (let item of keyWords) {
            allIt.push(new PeekIterator(arraytoGenerator([...item]), '\0'))
        }
        for (let item of allIt) {

            assert.equal(Token.makeVarOrKeyword(item).getType, 'VARIABLE')
            assert.equal(Token.makeVarOrKeyword(item).value, item.peek())
        }
    })
    it('error', () => {
        let it = new PeekIterator(arraytoGenerator([..."0haaha"]), '\0')
        expect(function () { Token.makeVarOrKeyword(it) }).to.throw(new RegExp(/unexpected char [\s\S]*/))
    })
})