export function getCallback(callback, params) {
    let task;
    if (typeof callback == 'function') {
        task = () => callback(params)
    } else if (Array.isArray(callback)) {
        task = callback.map(fun => {
            if (typeof fun == 'function') {
                return () => fun(params)
            }
        }).filter(Boolean)
    } else {
        throw new Error('callbacks are needed')
    }
    return task
}
export function getOption(options) {
    let defaultOption = typeof options === 'object' ? {
        ...options
    } : {
        cycle: options
    }
    defaultOption.eventListener = (event,task) => {
        if (typeof options.eventListener == 'function') {
            options.eventListener(event,task);
        }
        this.status = event;
    }
    return defaultOption
}