const TokenType = require('./TokenType.js')
const AlphabetHelper = require('./AlphabetHelper.js')
const LexicalException = require('./LexicalException.js')

const keyWords = new Set([
    "var",
    "if",
    "else",
    "for",
    "while",
    "break",
    "function",
    "return"
])

class Token {
    constructor(type, value) {
        this._type = type; // TokenType 类型
        this._value = value; // String
    }
    get getType() {
        return this._type.type
    }
    get value() {
        return this._value
    }
    get isVariable() {
        return this._type.value === TokenType.VARIABLE.value
    }
    get isScaler() {
        return this._type.value === TokenType.BOOLEAN.value ||
            this._type.value === TokenType.BRACKET.value ||
            this._type.value === TokenType.FLOAT.value ||
            this._type.value === TokenType.INTERGER.value
    }
    toString() {
        return `type ${this._type.type}, value ${this._value}`
    }

    // 工厂方法
    static makeVarOrKeyword(it) {
        let s = ''
        let firstToken = it.peek()
        while (it.hasNext()) {
            const c = it.peek() // 拿一个字符出来
            if (AlphabetHelper.isLiteral(c)) {
                s += c
            } else {
                break
            }

            // 不变式
            it.next()
        }
        // 关键字
        if (keyWords.has(s)) {
            return new Token(TokenType.KEYWORD, s)
        }
        if (s === 'true' || s === 'false') {
            return new Token(TokenType.BOOLEAN, s)
        }
        if (AlphabetHelper.isNumber(firstToken)) {
            throw LexicalException.fromChar(s)
        }
        return new Token(TokenType.VARIABLE, s)
    }
}

module.exports = Token
