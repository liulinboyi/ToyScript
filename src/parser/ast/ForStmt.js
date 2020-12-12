/**
 * if
 */

const Stmt = require("./Stmt")

const ASTNodeTypes = require('./ASTNodeType.js')


class ForStmt extends Stmt {
    constructor(parent) {
        super(parent, ASTNodeTypes.FOR_STMT, 'for')
    }
}

module.exports = ForStmt
