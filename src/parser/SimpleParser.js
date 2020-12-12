const Expr = require('./ast/Expr.js')
const Scalar = require('./ast/Scalar.js')
const ASTNodeType = require('./ast/ASTNodeType.js')

class SimpleParser {

    // 产生式
    // Expr -> digit + Expr | digit
    // digit -> 0|1|2|3|4|5|6|7|8|9
    static parse(it) {
        const expr = new Expr(null)
        const scalar = new Scalar(expr, it)
        if (!it.hasNext()) {
            // 递归结束条件
            return scalar
        }
        expr.addChild(scalar) // 左节点
        const op = it.nextMatch("+")
        expr.label = "+"
        expr.type = ASTNodeType.BINARY_EXPR // 二项表达式
        expr.lexeme = op
        expr.addChild(SimpleParser.parse(it)) // 右节点
        return expr
    }
}

module.exports = SimpleParser
