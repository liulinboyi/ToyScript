/**
 * if
 */

const Stmt = require("./Stmt")

const ASTNodeTypes = require('./ASTNodeType.js')


class AssignStmt extends Stmt {
    constructor(parent) {
        super(parent, ASTNodeTypes.ASSIGN_STMT, 'assign')
    }
}

module.exports = AssignStmt
