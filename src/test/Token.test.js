const { assert, expect } = require('chai')
const Token = require('../lexer/Token.js')
const arraytoGenerator = require('../common/arrayToGenerator')
const PeekIterator = require('../common/PeekIterator.js')
const TokenType = require('../lexer/TokenType.js')

describe('test Token', () => {
    it("KEYWORD", () => {
        {
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
            }
        }

        {
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
            let index = 0
            for (let item of allIt) {
                assert.equal(Token.makeVarOrKeyword(item).value, keyWords[index])
                index++
            }
        }
    })

    it("BOOLEAN", () => {
        {
            let keyWords = ["true", "false"]
            let allIt = []
            for (let item of keyWords) {
                allIt.push(new PeekIterator(arraytoGenerator([...item]), '\0'))
            }
            for (let item of allIt) {
                assert.equal(Token.makeVarOrKeyword(item).getType, 'BOOLEAN')
            }
        }
        {
            let keyWords = ["true", "false"]
            let allIt = []
            for (let item of keyWords) {
                allIt.push(new PeekIterator(arraytoGenerator([...item]), '\0'))
            }
            let index = 0;
            for (let item of allIt) {
                assert.equal(Token.makeVarOrKeyword(item).value, keyWords[index])
                index++
            }
        }
    })

    it("VARIABLE", () => {
        {
            let keyWords = ["item", "hello", "_fake"]
            let allIt = []
            for (let item of keyWords) {
                allIt.push(new PeekIterator(arraytoGenerator([...item]), '\0'))
            }
            for (let item of allIt) {
                assert.equal(Token.makeVarOrKeyword(item).getType, 'VARIABLE')
            }
        }

        {
            let keyWords = ["item", "hello", "_fake"]
            let allIt = []
            for (let item of keyWords) {
                allIt.push(new PeekIterator(arraytoGenerator([...item]), '\0'))
            }
            let index = 0
            for (let item of allIt) {
                assert.equal(Token.makeVarOrKeyword(item).value, keyWords[index])
                index++
            }
        }

    })

    it('error', () => {
        let it = new PeekIterator(arraytoGenerator([..."0haaha"]), '\0')
        expect(function () { Token.makeVarOrKeyword(it) }).to.throw(new RegExp(/unexpected char [\s\S]*/))
    })

    it('makeString', () => {
        let testCase = [`"hahah"`, `'hahah'`, `"23123"`, `'2333'`]
        for (let item of testCase) {
            {
                let it = new PeekIterator(arraytoGenerator([...item]), '\0')
                assert.equal(Token.makeString(it).getType, "STRING")
            }
            {
                let it = new PeekIterator(arraytoGenerator([...item]), '\0')
                assert.equal(Token.makeString(it).value, item)
            }
        }
    })

    it("makeOp test", () => {
        let testCase = [
            ["+ abc", "+"],
            ["==3", "=="],
            ["++ll", "++"],
            ["/=g", "/="],
            ["&=345345", "&="],
            ["&880", "&"],
            ["||ss", "||"],
            ["^=909", "^="],
            ["%7", "%"]
        ]

        for (let test of testCase) {
            const input = test[0]
            const expected = test[1]
            let it = new PeekIterator(arraytoGenerator([...input]), '\0')
            assert.equal(Token.makeOp(it).value, expected)
        }

    })

    it("make number", () => {
        let testCase = [
            "-0 aa",
            "-0 ccc",
            ".3 hhh",
            ".666 ddd",
            "2333.666 kkk",
            "-40 ppp",
            "-2000.2333*3444",
            "1. aaaa" // 与js不同1.为浮点数
        ]
        for (let test of testCase) {
            let it = new PeekIterator(arraytoGenerator([...test]), '\0')
            const token = Token.makeNumber(it)
            const regx = test.split(/[ |*]/); // 字符串用空格或乘号隔开
            const expected = regx[0]
            // let isIntergerRegx = /[0-9]+\.[0-9]*|[0-9]*\.[0-9]+/
            let isFloatRegx = /[0-9]*\.[0-9]+|[0-9]+\.[0-9]*/
            let isFloat = isFloatRegx.test(expected)
            assert.equal(token.value, expected)
            assert.equal(token.type, isFloat ? TokenType.FLOAT : TokenType.INTERGER)
        }
    })
})