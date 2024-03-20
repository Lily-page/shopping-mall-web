export default function to(promise, errorProps = {}, errorFirst = true) {
    return promise.then((data) => errorFirst ? [null, data] : [data, null])
        .catch(err => {
            if (errorProps) Object.assign(err, errorProps)
            errorFirst ? [err, undefined] : [undefined, err]
        })
}