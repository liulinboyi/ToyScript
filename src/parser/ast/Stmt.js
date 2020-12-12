const ASTNode = require("./ASTNode.js");

/**
 * 语句
 */
class Stmt extends ASTNode {
    constructor(parent, type, label) {
        super(parent, type, label)
    }
}

module.exports = Stmt
