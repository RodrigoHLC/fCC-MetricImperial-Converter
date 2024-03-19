'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  // --- MY CODE STARTS HERE ---
  // ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ 

  // --- REGEX FOR VERIFYNG THAT INPUT IS VALID 
  let regEx = /^\d+(\.\d+)?(\/\d+(\.\d+)?)?(gal|l|lbs|kg|mi|km)$|^(gal|l|lbs|kg|mi|km)$/i;
  // FOR THE NUMBER, VERIFY EVERYTHING BEFORE A LETTER
  // NEED ONE REGEX TO SEE IF IT'S A VALID NUMBER
  let numRegEx = /(^\d+(\.\d+)?(\/\d+(\.\d+)?)?$)|(^\d+(\.\d+)?(\/\d+(\.\d+)?)?[a-z])/i;
  // let numRegEx = /^\d+(\.\d+)?(\/\d+(\.\d+)?)?(?=gal|l|lbs|kg|mi|km)/i; // OPCION CON LOOKAHEAD
  // let unitRegEx = /(?<=\d+(\.\d+)?(\/\d+(\.\d+)?)?)(?<![a-z].*)(gal|l|lbs|kg|mi|km)$/i; // OPCION CON LOOKBEHIND
  let unitRegEx = /(?<![a-z].*)(gal|l|lbs|kg|mi|km)$/i; // OPCION CON LOOKBEHIND

  app.get("/api/convert", (req, res)=>{
    let userInput = req.query.input
    // CHECK IF NUMBER IS EMPTY BUT UNIT IS VALID
    if((/^(gal|l|lbs|kg|mi|km)$/i).test(userInput)){
      // IF SO, ADD A "1"
      userInput="1"+userInput
    }
    // --- VERIFY THAT INPUT IS VALID 
    if(!regEx.test(userInput)){
      // IF INPUT IS INVALID, CHECK IF NUMBER IS INVALID
      if(!numRegEx.test(userInput)){
        // IF NUMBER REGEX IS FALSE, CHECK IF IT STARTS WITH A NUMBER
        if(/^[0-9]/.test(userInput) ){
          // IF NUMREGEX IS FALSE AND NOT EMPTY, THEN NUMBER IS INVALID
          // CHECK IF UNIT IS ALSO INVALID
          if(!unitRegEx.test(userInput)){
            // IF BOTH NUMBER AND UNIT ARE INVALID
            res.send("invalid number and unit") 
          }else{
            // IF NUMBER IS INVALID BUT UNIT IS VALID
            res.send("invalid number")
          }
        }else{
          // IF NUMBER IS EMPTY, CHECK IF UNIT IS INVALID
          if(!unitRegEx.test(userInput)){
            // IF NUMBER IS EMPTY AND UNIT IS INVALID
            res.send("invalid unit") 
            // res.send("Invalid unit #1") 
          }
        }
        
      }else{
        // IF INPUT IS INVALID BUT NUMBER IS VALID, UNIT MUST BE INVALID
        res.send("invalid unit")
        // res.send("Invalid unit #2") 
      }
    } 
    // ↑ ↑ ↑ IF INPUT IS INVALID, EXECUTION STOPS HERE ↑ ↑ ↑
    // -----------------------------------------------------
    // ↓ ↓ ↓ IF INPUT IS VALID, CONTINUE ↓ ↓ ↓ 
    let initNum = convertHandler.getNum(userInput);  
    let initUnit = convertHandler.getUnit(userInput);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let spelledOutUnit1 = convertHandler.spellOutUnit(initUnit);
    let spelledOutUnit2 = convertHandler.spellOutUnit(returnUnit);
    let finalString = convertHandler.getString(initNum, spelledOutUnit1, returnNum, spelledOutUnit2);

    res.json({
      "initNum": initNum*1,
      "initUnit": initUnit,
      "returnNum": returnNum*1,
      "returnUnit": returnUnit,
      "string": finalString
    })
  })


};
