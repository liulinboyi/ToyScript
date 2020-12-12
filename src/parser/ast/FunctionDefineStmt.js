/**
 * if
 */

const Stmt = require("./Stmt")

const ASTNodeTypes = require('./ASTNodeType.js')


class FunctionDefineStmt extends Stmt {
    constructor(parent) {
        super(parent, ASTNodeTypes.FUNCTION_DECLARE_STMT, 'function')
    }
}

module.exports = FunctionDefineStmt
