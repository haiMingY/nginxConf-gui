/**
 *
 * @param {Function} cb
 * @param {Number} wait
 */
function debounce(cb: Function, delay = 100) {
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

function isDef() {
    return Object.prototype.hasOwnProperty.call(window, 'MutationObserver')
}


interface result {
    add: Function,
    remove: Function,
}

const controller = (function (params): result {
    let cache: Array<Resize> = []
    return {
        add(resize: Resize) {
            return cache.push(resize)
        },
        remove(resize: Resize) {
            let i = cache.indexOf(resize)
            if (i >= 0) cache.splice(i, 1)
        }
    }
})()


function init() {
    let cb = debounce(Listener)
    window.addEventListener("resize", cb)

    let observer = new MutationObserver(cb)
    observer.observe(document, {})
}


function Listener() {

}


class Resize {
    constructor() {
        controller.add(this)
    }
}