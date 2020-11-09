after((done) => {  
    console.log("Tearing down suite")
    //console.log(global.FUNCTIONS);
    var totalCases = 0;
    var totalPass = 0;
    var totalFail = 0;
    for(var func in global.FUNCTIONS) {
        totalCases  += global.FUNCTIONS[func].cases;
        totalPass   += global.FUNCTIONS[func].pass;
        totalFail   += global.FUNCTIONS[func].fail;
    }
    global.FUNCTIONS["TOTAL"] = {
        cases: totalCases,
        pass: totalPass,
        fail: totalFail
    }


    const fs = require('fs');
    let data = JSON.stringify(global.FUNCTIONS, null, 2);
    fs.writeFileSync('test/artifacts/COVERAGE.json', data);

    
    
    done();
});