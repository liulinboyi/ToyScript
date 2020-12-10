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
    get type() {
        return this._type
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
    // 提取字符串
    static makeString(it) {
        let s = ""
        let state = 0
        while (it.hasNext()) {
            // 每一个字符都是确定的不需要使用peek
            let c = it.next()
            switch (state) {
                case 0:
                    if (c === '"') {
                        state = 1
                    } else if (c === "'") {
                        state = 2
                    }
                    s += c
                    break
                case 1:
                    if (c === '"') {
                        let value = s + c
                        return new Token(TokenType.STRING, value)
                    } else {
                        s += c
                    }
                    break;
                case 2:
                    if (c === "'") {
                        let value = s + c
                        return new Token(TokenType.STRING, value)
                    } else {
                        s += c
                    }
                    break;
            }
        }
        // 状态机迭代完了，没有结尾符，到这里还没return
        throw new LexicalException("Unexpected error")
    }

    static makeOp(it) {
        let state = 0
        while (it.hasNext()) {
            // lookhead操作可以使用next和putBack来模拟
            let lookhead = it.next()

            switch (state) {
                case 0:
                    switch (lookhead) {
                        case "+":
                            state = 1
                            break;
                        case "-":
                            state = 2
                            break;
                        case "*":
                            state = 3
                            break;
                        case "/":
                            state = 4
                            break;
                        case "%":
                            state = 5
                            break;
                        case ">":
                            state = 6
                            break;
                        case "<":
                            state = 7
                            break;
                        case "=":
                            state = 8
                            break;
                        case "!":
                            state = 9
                            break;
                        case "&":
                            state = 10
                            break;
                        case "|":
                            state = 11
                            break;
                        case "^":
                            state = 12
                            break;
                        case ",":
                            return new Token(TokenType.OPERATOR, ',')
                        case ";":
                            return new Token(TokenType.OPERATOR, ';')
                    }
                    break;
                case 1: {
                    if (lookhead === '+') {
                        return new Token(TokenType.OPERATOR, "++")
                    } else if (lookhead === '=') {
                        return new Token(TokenType.OPERATOR, "+=")
                    } else {
                        // lookhead 使用next生成的
                        it.putBack() // 我们遇到的lookhead不是我们要吃掉的字符，把它放回去
                        return new Token(TokenType.OPERATOR, "+")
                    }
                }

                case 2: {
                    if (lookhead === '-') {
                        return new Token(TokenType.OPERATOR, "--")
                    } else if (lookhead === '=') {
                        return new Token(TokenType.OPERATOR, "-=")
                    } else {
                        // lookhead 使用next生成的
                        it.putBack() // 我们遇到的lookhead不是我们要吃掉的字符，把它放回去
                        return new Token(TokenType.OPERATOR, "-")
                    }
                }

                case 3: {
                    if (lookhead === '=') {
                        return new Token(TokenType.OPERATOR, "*=")
                    } else {
                        // lookhead 使用next生成的
                        it.putBack() // 我们遇到的lookhead不是我们要吃掉的字符，把它放回去
                        return new Token(TokenType.OPERATOR, "*")
                    }
                }

                case 4: {
                    if (lookhead === '=') {
                        return new Token(TokenType.OPERATOR, "/=")
                    } else {
                        // lookhead 使用next生成的
                        it.putBack() // 我们遇到的lookhead不是我们要吃掉的字符，把它放回去
                        return new Token(TokenType.OPERATOR, "/")
                    }
                }

                case 5: {
                    if (lookhead === '=') {
                        return new Token(TokenType.OPERATOR, "%=")
                    } else {
                        // lookhead 使用next生成的
                        it.putBack() // 我们遇到的lookhead不是我们要吃掉的字符，把它放回去
                        return new Token(TokenType.OPERATOR, "%")
                    }
                }

                case 6: {
                    if (lookhead === '=') {
                        return new Token(TokenType.OPERATOR, ">=")
                    } else if (lookhead === '>') {
                        return new Token(TokenType.OPERATOR, ">>")
                    } else {
                        // lookhead 使用next生成的
                        it.putBack() // 我们遇到的lookhead不是我们要吃掉的字符，把它放回去
                        return new Token(TokenType.OPERATOR, ">")
                    }
                }

                case 7: {
                    if (lookhead === '=') {
                        return new Token(TokenType.OPERATOR, "<=")
                    } else if (lookhead === '<') {
                        return new Token(TokenType.OPERATOR, "<<")
                    } else {
                        // lookhead 使用next生成的
                        it.putBack() // 我们遇到的lookhead不是我们要吃掉的字符，把它放回去
                        return new Token(TokenType.OPERATOR, "<")
                    }
                }

                case 8: {
                    if (lookhead === '=') {
                        return new Token(TokenType.OPERATOR, "==")
                    } else {
                        // lookhead 使用next生成的
                        it.putBack() // 我们遇到的lookhead不是我们要吃掉的字符，把它放回去
                        return new Token(TokenType.OPERATOR, "=")
                    }
                }

                case 9: {
                    if (lookhead === '=') {
                        return new Token(TokenType.OPERATOR, "!=")
                    } else {
                        // lookhead 使用next生成的
                        it.putBack() // 我们遇到的lookhead不是我们要吃掉的字符，把它放回去
                        return new Token(TokenType.OPERATOR, "!")
                    }
                }

                case 10: {
                    if (lookhead === '&') {
                        return new Token(TokenType.OPERATOR, "&&")
                    } else if (lookhead === '=') {
                        return new Token(TokenType.OPERATOR, "&=")
                    } else {
                        // lookhead 使用next生成的
                        it.putBack() // 我们遇到的lookhead不是我们要吃掉的字符，把它放回去
                        return new Token(TokenType.OPERATOR, "&")
                    }
                }

                case 11: {
                    if (lookhead === '|') {
                        return new Token(TokenType.OPERATOR, "||")
                    } else if (lookhead === '=') {
                        return new Token(TokenType.OPERATOR, "|=")
                    } else {
                        // lookhead 使用next生成的
                        it.putBack() // 我们遇到的lookhead不是我们要吃掉的字符，把它放回去
                        return new Token(TokenType.OPERATOR, "|")
                    }
                }

                case 12: {
                    if (lookhead === '^') {
                        return new Token(TokenType.OPERATOR, "^^")
                    } else if (lookhead === '=') {
                        return new Token(TokenType.OPERATOR, "^=")
                    } else {
                        // lookhead 使用next生成的
                        it.putBack() // 我们遇到的lookhead不是我们要吃掉的字符，把它放回去
                        return new Token(TokenType.OPERATOR, "^")
                    }
                }
            }
        }
        // end while loop
        throw new LexicalException("Unexpected error")
    }

    static makeNumber(it) {
        let state = 0
        let s = ''
        while (it.hasNext()) {
            let lookhead = it.peek()

            switch (state) {
                case 0:
                    if (lookhead === '0') {
                        state = 1
                    } else if (AlphabetHelper.isNumber(lookhead)) {
                        state = 2
                    } else if (lookhead === "+" || lookhead === "-") {
                        state = 3
                    } else if (lookhead === ".") {
                        state = 5
                    }
                    break
                case 1:
                    if (lookhead === '0') {
                        state = 1 // 继续等于0，不会发生变化
                    } else if (lookhead === '.') {
                        state = 4 // 累计浮点数状态
                    } else {
                        return new Token(TokenType.INTERGER, s)
                    }
                    break
                case 2:
                    if (AlphabetHelper.isNumber(lookhead)) {
                        state = 2
                    } else if (lookhead === '.') {
                        state = 4 // 累计浮点数状态
                    } else {
                        return new Token(TokenType.INTERGER, s)
                    }
                    break
                case 3:
                    if (AlphabetHelper.isNumber(lookhead)) {
                        state = 2
                    } else if (lookhead === '.') {
                        state = 5
                    } else {
                        throw new LexicalException(lookhead)
                    }
                    break
                case 4:
                    if (lookhead === '.') {
                        throw new LexicalException(lookhead)
                    } else if (AlphabetHelper.isNumber(lookhead)) {
                        state = 20
                    } else {
                        return new Token(TokenType.FLOAT, s)
                    }
                    break
                case 5:
                    if (AlphabetHelper.isNumber(lookhead)) {
                        state = 20
                    } else {
                        throw new LexicalException(lookhead)
                    }
                    break
                case 20:
                    if (AlphabetHelper.isNumber(lookhead)) {
                        state = 20
                    } else if (lookhead === '.') {
                        throw new LexicalException(lookhead)
                    } else {
                        return new Token(TokenType.FLOAT, s)
                    }
            }
            s += lookhead
            it.next()

        }
        throw new LexicalException("Unexpected error")
    }
}

module.exports = Token
