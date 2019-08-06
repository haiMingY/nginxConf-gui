/**
 *
 * @param {Function} cb
 * @param {Number} wait
 */
function debounce(cb, delay = 100) {
    let timer: any = null
    let result: any = null
    let context: any, args: any
    function timeout() {
        timer = null
        if (args) result = cb.apply(context, args)
        context = args = null
        return result
    }
    function clear() {
        timer && clearTimeout(timer)
        timer = null
    }
    return function () {
        context = this
        args = arguments
        clear()
        timer = setTimeout(timeout, delay)
    }
}

const controller = (function (params) {
    return {}
})()
