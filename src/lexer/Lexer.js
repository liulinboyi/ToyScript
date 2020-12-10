const PeekIterator = require("../common/PeekIterator")
const AlphabetHelper = require("./AlphabetHelper")
const LexicalException = require("./LexicalException")
const Token = require("./Token")
const TokenType = require("./TokenType")



class Lexer {
    analyse(source) {
        const tokens = [];
        const it = new PeekIterator(source, "\0");

        while (it.hasNext()) {
            let c = it.next();
            if (c === "\0") {
                break;
            }
            let lookahead = it.peek();

            if (c === " " || c === "\n" || c === "\r") {
                continue;
            }

            // 提取注释的程序
            if (c === "/") {
                if (lookahead === "/") {
                    while (it.hasNext()) {
                        c = it.next()
                        if (c === '\n') {
                            break
                        }
                    }
                    continue;
                } else if (lookahead === "*") {
                    let valid = false;
                    while (it.hasNext()) {
                        const p = it.next();
                        // 删除到是*的时候，并且下一个是/
                        if (p === "*" && it.peek() === "/") {
                            // 删成功了
                            valid = true;
                            // 吃掉最后一个字符
                            it.next();
                            break;
                        }
                    }

                    if (!valid) {
                        throw new LexicalException("comment not matched");
                    }
                    continue;
                }
            }

            if (c === "{" || c === "}" || c === "(" || c === ")") {
                tokens.push(new Token(TokenType.BRACKET, c));
                continue;
            }

            if (c === '"' || c === "'") {
                it.putBack();
                tokens.push(Token.makeString(it));
                continue;
            }

            if (AlphabetHelper.isLetter(c)) {
                it.putBack();
                tokens.push(Token.makeVarOrKeyword(it));
                continue;
            }

            if (AlphabetHelper.isNumber(c)) {
                it.putBack();
                tokens.push(Token.makeNumber(it));
                continue;
            }

            // + -
            if ((c === "+" || c === "-") && AlphabetHelper.isNumber(lookahead)) {
                // 跳过:a+1, 1+1
                // +5, 3*-5
                const lastToken = tokens[tokens.length - 1] || null;

                if (lastToken === null || !lastToken.isValue) {
                    it.putBack();
                    tokens.push(Token.makeNumber(it));
                    continue;
                }
            }

            if (AlphabetHelper.isOperator(c)) {
                it.putBack();
                tokens.push(Token.makeOp(it));
                continue;
            }

            throw LexicalException.fromChar(c);
        }
        return tokens;
    }

    static fromFile(src) {
        const content = fs.readFileSync(src, "utf-8")
        const lexer = new Lexer()
        return arrayToGenerator(lexer.analyse(arrayToGenerator(content)))
    }
}

// class Lexer {
//     constructor() {

//     }

//     analyse(sourceCode/*迭代器*/) {// 传递迭代器
//         const tokens = []
//         const it = new PeekIterator(sourceCode, '\0')
//         while (it.hasNext()) {
//             let c = it.next()
//             if (c === '\0') {
//                 break
//             }
//             let lookhead = it.peek()
//             if (c === ' ' || c === '\n' || c === '\r') {
//                 continue
//             }
//             // 提取注释
//             // todo
//             if (c === "{" || c === "}" || c === "(" || c === ")") {
//                 // it.putBack()
//                 tokens.push(new Token(TokenType.BRACKET, c))
//                 continue
//             }
//             if (c === '"' || c === "'") {
//                 it.putBack() // 当前c已经从字符串中拿出来了，但是c是字符串的一部分，需要放回去
//                 tokens.push(Token.makeString(it))
//                 continue
//             }

//             if (AlphabetHelper.isLetter(c)) {
//                 it.putBack()
//                 tokens.push(Token.makeVarOrKeyword(it))
//                 continue
//             }
//             if (AlphabetHelper.isNumber(c)) {
//                 it.putBack()
//                 tokens.push(Token.makeNumber(it))
//                 continue
//             }
//             if ((c === '+' || c === '-') && AlphabetHelper.isNumber(lookhead)) {
//                 // 正负号作为开头并且下一个字符为number
//                 // 跳过a+1、1+1这种形式
//                 const lastToken = tokens[tokens.length - 1] || null
//                 if (lastToken === null || !lastToken.isValue) {
//                     it.putBack()
//                     tokens.push(Token.makeNumber(it))
//                     continue
//                 }
//             }
//             if (AlphabetHelper.isOperator(c)) {
//                 it.putBack()
//                 tokens.push(Token.makeOp(it))
//                 continue
//             }

//             throw new LexicalException(c)
//         }
//         return tokens
//     }
// }

module.exports = Lexer
