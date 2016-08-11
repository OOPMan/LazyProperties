/**
 * Adds lazy getter properties to an object.
 *
 * The first time a lazy property is accessed the `provider` function will
 * be called in order to generate an object that is expected to provide
 * concrete version of all the lazy properties. These concrete properties
 * will then be assigned to the object, replacing the lazy properties that
 * existed before.
 *
 * @param {Object} target
 * @param {Function} provider
 * @param {Iterable} properties
 */
export default function (target, provider, ...properties) {
    for (let property of properties) Object.defineProperty(
        target,
        property,
        {
            configurable: true,
            enumerable: true,
            get: function () {
                let source = provider();
                for (let property of properties) {
                    delete target[property];
                    target[property] = source[property];
                }
                return source[property];
            }
        }
    );
    return target;
}