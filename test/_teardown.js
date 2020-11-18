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

    var availableFuncs = [];
    for (var func in global.FUNCTIONS) {
        if (func == "TOTAL") { continue; }
        var write = "yahoo." + func + "(ticker, callback)"
        while (write.length < 65)
            write += " ";
        write += "// Available; "
        if (global.FUNCTIONS[func].pass == 0)
        {
            availableFuncs.push( write + "Testing In Progress" );
        }
        else {
            availableFuncs.push( write );
        }
    }
    
    var fullString = ""
    for (var i = 0; i < availableFuncs.length; i++) {
        fullString += availableFuncs[i] + "\n"
    }
    console.log(fullString);
    fs.writeFile('test/artifacts/AvailableFunctions.txt', fullString, (err) => { 
        // In case of a error throw err. 
        if (err) throw err; 
    });
    
    done();
});