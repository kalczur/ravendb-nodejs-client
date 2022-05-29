// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const settings = require("./settings.json");

async function bench(name, attempts, run, opts) {
    const benchName = `${name} x${ attempts }`;

    if (opts && opts.before) {
        try {
            await opts.before();
        } catch (err) {
            console.log("BENCH BEFORE", err);
        }
    }

    console.time(benchName);
    try {
        console.profile(benchName);
        for (let n = 0; n < attempts; n++) {
            await run();
        }
        console.profileEnd(benchName);
    } catch (err) {
        console.log("BENCH ERROR", err);
    }
    console.timeEnd(benchName);

    if (opts && opts.after) {
        try {
            await opts.after();
        } catch (err) {
            console.log("BENCH AFTER", err);
        }
    }
}

// eslint-disable-next-line no-undef
module.exports = { settings, bench };
