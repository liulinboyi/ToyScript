const AlphabetHelper = require('../lexer/AlphabetHelper.js')
const { assert } = require('chai')

describe("test AlphabetHelper", () => {
    it("isLetter", () => {
        let char = "l";
        assert.equal(AlphabetHelper.isLetter(char), true)
        assert.equal(AlphabetHelper.isLetter('1'), false)
    })
    it("isNumber", () => {
        let char = 1;
        assert.equal(AlphabetHelper.isNumber(char), true)
    })
    it("isLiteral", () => {
        let char = "_";
        assert.equal(AlphabetHelper.isLiteral(char), true)
    })
    it("isOperator", () => {
        let char = "+-*/%><=!&|^";
        for (let item of char) {
            assert.equal(AlphabetHelper.isOperator(item), true)
        }
    })
})