class ASTNode {
    constructor(parent, type = null, label = null) {
        // 维护树的结构
        this.children = []
        this.parent = parent
        // 源代码关键信息
        this.lexeme = null
        this.type = type // 抽象语法树类型
        this.label = label // 展示值
    }

    getChild(index) {
        return this.children[index]
    }

    addChild(node) {
        this.children.push(node)
    }

    getLexeme() {
        return this.lexeme
    }

    getChildren() {
        return this.children
    }

    print(indent = 0) {
        console.log(`${''.padStart(indent * 2, " ")}${this.label}`)
        this.children.forEach(x => x.print(indent + 1))
    }
}

module.exports = ASTNode
