const Enum = require('../common/enum.js')
const TokenType = {
    KEYWORD: new Enum("KEYWORD", 1),
    VARIABLE: new Enum("VARIABLE", 2),
    OPERATOR: new Enum("OPERATOR", 3),
    BRACKET: new Enum("BRACKET", 4),
    INTERGER: new Enum("INTERGER", 5),
    FLOAT: new Enum("FLOAT", 6),
    BOOLEAN: new Enum("BOOLEAN", 7),
}

module.exports = TokenType
