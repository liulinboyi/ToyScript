const fs = require('fs')
const path = require('path')
const arrayToGenerator = require('../common/arrayToGenerator')
const Lexer = require('../lexer/Lexer')
const SimpleParser = require('../parser/SimpleParser.js')
const PeekTokenIterator = require('../parser/util/PeekTokenIterator')
const stringify = require('../parser/util/stringfy')
const { assert } = require('chai')

describe("SimpleParser test", () => {
    it('basic', () => {
        const source = "1+2+3+4"

        const lexer = new Lexer()

        const tokens = lexer.analyse(arrayToGenerator([...source]))

        const tokensIt = new PeekTokenIterator(arrayToGenerator(tokens))

        const expr = SimpleParser.parse(tokensIt)

        assert.equal(expr.children.length, 2)

        assert.equal(expr.lexeme.value, "+")
        const v1 = expr.getChild(0)
        const e2 = expr.getChild(1)
        assert.equal(v1.lexeme.value, "1")
        assert.equal(e2.lexeme.value, "+")
        const v2 = e2.getChild(0)
        const e3 = e2.getChild(1)
        assert.equal(v2.lexeme.value, "2")
        assert.equal(e3.lexeme.value, "+")
        const v3 = e3.getChild(0)
        const v4 = e3.getChild(1)
        assert.equal(v3.lexeme.value, "3")
        assert.equal(v4.lexeme.value, "4")


        expr.print()
        let path_ = path.join(__dirname, '/output/ast.json')
        fs.writeFileSync(path_, stringify(expr));
    })
})