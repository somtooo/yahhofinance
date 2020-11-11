
const fs = require("fs"); // Or `import fs from "fs";` with ESM
function fileAlreadyExists(path) {
    if (fs.existsSync(path)) {
        return true;
    }
    else {
        return false;
    }
}

function writeHeadingTestFile(path) {
    var script = 'let chai = require("chai");\nlet should = chai.should();\n'
    script += 'let expect = chai.expect();var path = require("path");\nvar file = path.basename(__filename).split(".js")[0];\n\n'
    script += 'describe(file + "-TC", () => {\n'
    script += '\tbeforeEach(function(done) {\n'
    script += '\t\tFUNCTIONS[file].cases = FUNCTIONS[file].cases += 1;\n'
    script += '\t\tdone()\n'
    script += '\t});\n'
    script += '\tafterEach(function(done) {\n'
    script += '\t\tif (this.currentTest.state == "passed") {\n'
    script += '\t\t\tFUNCTIONS[file].pass = FUNCTIONS[file].pass += 1;\n'
    script += '\t\t}\n'
    script += '\t\tif (this.currentTest.state == "failed") {\n'
    script += '\t\t\tFUNCTIONS[file].fail = FUNCTIONS[file].fail += 1;\n'
    script += '\t\t}\n'
    script += '\t\tdone();\n'
    script += '\t});\n';
    script += '\n\n\n});'
    fs.writeFile(path, script, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}

before((done) => {  
    console.log("Test Suite Setup")
    var yahoo = require('../dist/index');
    var getAllFuncs = require('./utils/utils')

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
        && !funcs[i].includes("valueOf")
        )
            FUNCTIONS[funcs[i]] = {
                file: funcs[i] + ".js",
                cases: 0,
                pass: 0,
                fail: 0
            }

        if ( !fileAlreadyExists( "test/" + FUNCTIONS[funcs[i]].file )  ) 
        {   
            if (FUNCTIONS[funcs[i]].file != null)
            {
                //console.log(FUNCTIONS[funcs[i]].file)
                writeHeadingTestFile( "test/" + FUNCTIONS[funcs[i]].file );
            }
        }
    }
    let data = JSON.stringify(FUNCTIONS, null, 2);
    fs.writeFileSync('test/artifacts/COVERAGE.json', data);
    global.FUNCTIONS = FUNCTIONS;
    global.yahoo = require('../dist/index');
    done()
})



