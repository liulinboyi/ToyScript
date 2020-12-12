/**
 * if
 */

const Stmt = require("./Stmt")

const ASTNodeTypes = require('./ASTNodeType.js')


class IFSmt extends Stmt {
    constructor(parent) {
        super(parent, ASTNodeTypes.IF_STMT, 'if')
    }
}

module.exports = IFSmt
