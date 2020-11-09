
before((done) => {  

    console.log("Test Suite Setup")
    var yahoo = require('../dist/index');
    var getAllFuncs = require('./utils/utils')
    const fs = require('fs');



    var FUNCTIONS = {}
    var funcs = getAllFuncs(yahoo);
    for (var i = 0; i < funcs.length; i++) {
        if (!funcs[i].includes("_") 
        && !funcs[i].includes("constructor")
        && !funcs[i].includes("toString")
        && !funcs[i].includes("toLocaleString")
        && !funcs[i].includes("propertyIsEnumerable")
        && !funcs[i].includes("isPrototypeOf")
        && !funcs[i].includes("hasOwnProperty")
        )
            FUNCTIONS[funcs[i]] = {
                file: funcs[i] + ".js",
                cases: 0,
                pass: 0,
                fail: 0
            }
    }
    let data = JSON.stringify(FUNCTIONS, null, 2);
    fs.writeFileSync('test/artifacts/COVERAGE.json', data);
    
    global.FUNCTIONS = FUNCTIONS;
    global.yahoo = require('../dist/index');
    var currentFile = ""
    done()
})



