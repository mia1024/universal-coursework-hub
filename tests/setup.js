require('jsdom-global')()
require("fake-indexeddb/auto")
global.expect = require('expect')
process.on('unhandledRejection', e => {
    throw e
})
