/**
 * Pipe the output from one function to another.
 *
 * @param fns - a var arg of functions.
 * @return {function(*): *}
 */
export const pipeline = (...fns) => {
    return (val) => {
        let lastResult;
        for ( let fn of fns ) {
            lastResult = fn( lastResult || val );
        }
        return lastResult;
    }
};

/**
 * Compose promises together, resolved results are feed to the next.
 * @param fns
 * @return {function(*=): *}
 */
export const composePromise = (...fns) => args => fns.reduce((p, f) => p.then(f), Promise.resolve(args));
