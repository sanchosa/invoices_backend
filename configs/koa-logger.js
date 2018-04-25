'use strict'

const Counter = require('passthrough-counter')
const humanize = require('humanize-number')
const bytes = require('bytes')
const log4js = require(`./log4js`)

module.exports = dev;

/**
 * Development logger.
 */

function dev(opts) {
    return function logger(ctx, next) {
        // request
        const start = new Date;
        log4js.info('  --> %s %s', ctx.method, ctx.originalUrl);
        
        if (ctx.request.method == 'POST' || ctx.request.method == 'PUT') {
            log4js.debug(ctx.request.body);
        };

        return next().then(function() {

            // calculate the length of a streaming response
            // by intercepting the stream with a counter.
            // only necessary if a content-length header is currently not set.
            const length = ctx.response.length;
            const body = ctx.body;
            let counter;
            if (null == length && body && body.readable) {
                ctx.body = body
                    .pipe(counter = Counter())
                    .on('error', ctx.onerror);
                }

            // log when the response is finished or closed,
            // whichever happens first.
            const res = ctx.res;

            const onfinish = done.bind(null, 'finish');
            const onclose = done.bind(null, 'close');

            res.once('finish', onfinish);
            res.once('close', onclose);

            function done(event){
                res.removeListener('finish', onfinish);
                res.removeListener('close', onclose);
                log(ctx, start, counter ? counter.length : length, null, event);
            }

        }, err => {
            // log uncaught downstream errors
            log(ctx, start, null, err);
            throw err;
        })

    }
}

/**
 * Log helper.
 */

function log(ctx, start, len, err, event) {
    // get the status code of the response
    const status = err
        ? (err.status || 500)
        : (ctx.status || 404);

    // get the human readable response length
    let length;
    if (~[204, 205, 304].indexOf(status)) {
        length = '';
    } else if (null == len) {
        length = '-';
    } else {
        length = bytes(len);
    }

    const upstream = err ? 'xxx'
        : event === 'close' ? '-x-'
        : '<--'

    log4js.trace('Response:');
    log4js.trace(ctx.body ? ctx.body : 'No data in Response BODY');
        
    log4js.info('  ' + upstream + ' %s %s %s %s %s',
        ctx.method,
        ctx.originalUrl,
        status,
        time(start),
        length);
}

/**
 * Show the response time in a human readable format.
 * In milliseconds if less than 10 seconds,
 * in seconds otherwise.
 */

function time(start) {
    const delta = new Date - start;
    return humanize(delta < 10000
        ? delta + 'ms'
        : Math.round(delta / 1000) + 's');
}