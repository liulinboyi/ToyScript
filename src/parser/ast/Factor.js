const ASTNode = require("./ASTNode.js");
const TokenType = require('../../lexer/TokenType.js')
const ASTNodeTypes = require('./ASTNodeType.js')

class Factor extends ASTNode {
    constructor(parent, it) {
        super(parent)
        const token = it.next()

        let type = token.type

        if (type === TokenType.VARIABLE) {
            this.type = ASTNodeTypes.VARIABLE
        } else {
            this.type = ASTNodeTypes.SCALAR
        }
        this.label = token.value
        this.lexeme = token
    }

}

module.exports = Factor
