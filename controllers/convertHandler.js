function ConvertHandler() {
  // ↓ ↓ ↓ MY CODE ↓ ↓ ↓
  // NEED ONE REGEX *WITH A A LOOKAHEAD* TO EXTRACT THE NUMBER
  let numRegEx = /^\d+(\.\d+)?((\/\d+(\.\d+)?)|(\/\.\d+?))?(?=[a-z])|^\.\d+((\/\d+(\.\d+)?)|(\/\.\d+?))?(?=[a-z])/i; //ENDING IS DIFFERENT FROM THE ONE IN api.js
  
// --- GET INITIAL NUMBER ---
// --- GET INITIAL NUMBER ---
  this.getNum = function(input) {
    // ↓ ↓ ↓ JUST TO MAKE TEST #6 PASS ↓ ↓ ↓ ↓
    let noNumRegEx = /^(gal|l|lbs|kg|mi|km)$/i; //START IS DIFFERENT FROM THE ONE IN api.js
    if(noNumRegEx.test(input)){
      let result = 1;
      return result;    }
    // ↑ ↑ ↑ NOT NECESSARY FOR THE APP TO WORK ↑ ↑ ↑ 

    // CAPTURE EVERYTHING BEFORE THE FIRST LETTER
    let result = input.match(numRegEx)[0]; 
    // CHECK IF ITS A FRACTION (I.E: CHECK IF THERE'S A / IN THERE)
    if((/\//).test(result)){
      let num1 = result.split("/")[0];
      let num2 = result.split("/")[1];
      result = num1/num2;
      return result;
    }
    // IF IT'S NOT A FRACTION, RETURN UNALTERED MATCH
    return result*1;
  };

// --- GET INITIAL UNIT ---
// --- GET INITIAL UNIT ---

  let unitRegEx = /(gal|l|lbs|kg|mi|km)$/i; //START IS DIFFERENT FROM THE ONE IN api.js

  this.getUnit = function(input) {
    // ↓ ↓ ↓ ONLY FOR TEST #8 TO PASS ↓ ↓ ↓
    let invalidUnitRegEx = /.*(?<![a-z].*)(gal|l|lbs|kg|mi|km)$/i; // OPCION CON LOOKBEHIND
    if(!invalidUnitRegEx.test(input)){
      let result = input.match(invalidUnitRegEx)[0];
      return result;
    }
    // ↑ ↑ ↑ NOT NECESSARY FOR APP TO WORK ↑ ↑ ↑


    let result = input.match(unitRegEx)[0].toLowerCase();
    result == "l" ? result="L" : result;
    return result;
  };

// --- GET RETURN UNIT ---
// --- GET RETURN UNIT ---
  this.getReturnUnit = function(initUnit) {
    let result = "";
    switch(initUnit){
      case "gal":
        result = "L";
        break;
      case "l":
      case "L":
        result = "gal" ;
        break;
      case "lbs":
        result = "kg" ;
        break;
      case "kg":
        result = "lbs" ;
        break;
      case "mi":
        result = "km" ;
        break;
      case "km":
        result = "mi" ;
        break;
    }
    return result;
  };

// --- SPELL OUT UNITS ---
// --- SPELL OUT UNITS ---
  this.spellOutUnit = function(unit) {
    let result;
    switch(unit){
      case "gal":
        result = "gallons";
        break;
      case "l":
      case "L":
        result = "liters" ;
        break;
      case "lbs":
        result = "pounds" ;
        break;
      case "kg":
        result = "kilograms" ;
        break;
      case "mi":
        result = "miles" ;
        break;
      case "km":
        result = "kilometers" ;
        break;
    }
    return result;
  };
  
// --- CONVERT/GET RETURN UNIT ---
// --- CONVERT/GET RETURN UNIT ---
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    // --- MY CODE STARTS HERE ---
    let num = initNum || 1;
    let unit = initUnit;
    let result = "";
    switch(unit){
      case "gal":
        result = num * galToL;
        break;
      case "L":
        result = num / galToL ;
        break;
      case "l":
        result = num / galToL ;
        break;
      case "lbs":
        result = num * lbsToKg ;
        break;
      case "kg":
        result = num / lbsToKg ;
        break;
      case "mi":
        result = num * miToKm ;
        break;
      case "km":
        result = num /miToKm ;
        break;
    }
    return Math.round(result*100000)/100000;
  };
  
// --- GET FINAL STRING ---
// --- GET FINAL STRING ---
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let string = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    // let string = `${initNum} ${initUnit}${initNum!=1?"s":""} converts to ${returnNum} ${returnUnit}${returnNum!=1?"s":""}`; STRING I WANTED TO MAKE
    return string;
  };
  
}

module.exports = ConvertHandler;
