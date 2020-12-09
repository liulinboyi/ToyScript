const LinkList = require('linkedlist')
const CACHE_SIZE = 10 // 上限
class PeekIterator {
    constructor(iterator, endToken = null) {
        this.iterator = iterator
        // 需要putBack的元素
        this.stackPutBacks = new LinkList()

        // 流代表随着时间的产生的数据，有一个窗口在时间线上不停地移动，每次queueCache存若干个上限为CACHE_SIZE
        this.queueCache = new LinkList()

        // 相当于往流后面多追加一个值，在后面做编译器中有用
        this.endToken = endToken
    }

    peek() {
        // 如果this.stackPutBacks有值，则返回this.stackPutBacks的头元素，最左边的元素
        if (this.stackPutBacks.length > 0) {
            return this.stackPutBacks.head
        }
        // 相当于
        const val = this.next()
        this.putBack()
        return val || this.endToken // 如果val为空值
    }

    putBack() {
        // 从缓存中拿值
        // this.queueCache.pop() pop出离现在时间最近的元素
        if (this.queueCache.length > 0) {
            this.stackPutBacks.push(this.queueCache.pop())
            // 执行next时，结果会造成迭代器没有往前走
        }
    }

    hasNext() {
        return this.endToken || !!this.peek()
    }

    next() {
        let val = null;
        if (this.stackPutBacks.length > 0) {
            val = this.stackPutBacks.pop()
        } else {
            val = this.iterator.next().value
            if (val === undefined) {
                const tmp = this.endToken
                // 清空
                this.endToken = null
                return tmp
                // 暂不处理
            }
        }
        // 处理缓存
        while (this.queueCache.length > CACHE_SIZE - 1) {
            // linklist 的 pop是从左边pop的
            // 顺序是从前面进，后面出，要把最早的元素移除掉
            this.queueCache.shift()
        }
        this.queueCache.push(val)
        return val
    }

}

module.exports = PeekIterator
