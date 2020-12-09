/**
 * 异常处理类 词法分析异常处理
 */
class LexicalException extends Error {
    constructor(msg) {
        super(msg)
    }
    static fromChar(c) {
        const ex = new LexicalException(`unexpected char ${c}`)
        return ex
    }
}

module.exports = LexicalException
