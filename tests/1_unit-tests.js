const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test("convertHandler should correctly read a whole number input", function(){
        assert.equal(convertHandler.getNum("23km"), 23);
        assert.equal(convertHandler.getNum("12mi"), 12);
        assert.equal(convertHandler.getNum("23463454l"), 23463454);
        assert.equal(convertHandler.getNum("2123lbs"), 2123);
    });
    test("convertHandler should correctly read a decimal number input.", function(){
        assert.equal(convertHandler.getNum("1.5l"), 1.5 );
        assert.equal(convertHandler.getNum("2.41mi"), 2.41 );
        assert.equal(convertHandler.getNum("0.655l"), 0.655 );
        assert.equal(convertHandler.getNum(".3l"), 0.3 );
        assert.equal(convertHandler.getNum("19.0025l"), 19.0025 );
    });
    test("convertHandler should correctly read a fractional input.", function(){
        assert.equal(convertHandler.getNum("1/2gal"), 0.5);
        assert.equal(convertHandler.getNum("1/4L"), 0.25);
        assert.equal(convertHandler.getNum("2/5km"), 0.4);
        assert.equal(convertHandler.getNum("10/200mi"), 0.05);
        assert.equal(convertHandler.getNum("9/12kg"), 0.75);
    });
    test("convertHandler should correctly read a fractional input with a decimal.", function(){
        assert.equal(convertHandler.getNum("0.5/2kg"), 0.25);
        assert.equal(convertHandler.getNum("0.5/1kg"), 0.5);
        assert.equal(convertHandler.getNum("0.06/0.03kg"), 2);
        assert.equal(convertHandler.getNum("6/1.5mi"), 4);
        assert.equal(convertHandler.getNum("0.15/15kg"), 0.01);
        assert.equal(convertHandler.getNum(".2/.4kg"), 0.5);
    });
    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", function(){
        assert.throw(()=>{convertHandler.getNum("1/2/5")}, Error);
        assert.throw(()=>{convertHandler.getNum("5/7/34")}, Error);
        assert.throw(()=>{convertHandler.getNum("1/1.2/0.25")}, Error);
    });
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function(){
        assert.equal(convertHandler.getNum("kg"), 1);
        assert.equal(convertHandler.getNum("lbs"), 1);
        assert.equal(convertHandler.getNum("Km"), 1);
        assert.equal(convertHandler.getNum("mI"), 1);
        assert.equal(convertHandler.getNum("l"), 1);
        assert.equal(convertHandler.getNum("L"), 1);
        assert.equal(convertHandler.getNum("gAl"), 1);
    });
    test("convertHandler should correctly read each valid input unit.", function(){
        assert.equal(convertHandler.getUnit("1/2gal"), "gal");
        assert.equal(convertHandler.getUnit("6/1.5mi"), "mi");
        assert.equal(convertHandler.getUnit("0.15/15kG"), "kg");
        assert.equal(convertHandler.getUnit("1/4l"), "L");
        assert.equal(convertHandler.getUnit("2123lBs"), "lbs");
        assert.equal(convertHandler.getUnit("2/5kM"), "km");
    });
    test("convertHandler should correctly return an error for an invalid input unit.", function(){
        assert.throw(()=>{convertHandler.getUnit("12dsdkm")}, Error);
        assert.throw(()=>{convertHandler.getUnit("442")}, Error);
        assert.throw(()=>{convertHandler.getUnit("12.k.km")}, Error);
        assert.throw(()=>{convertHandler.getUnit("3j#l")}, Error);
    });
    test("convertHandler should return the correct return unit for each valid input unit.", function(){
        assert.equal(convertHandler.getReturnUnit("km"), "mi");
        assert.equal(convertHandler.getReturnUnit("mi"), "km");
        assert.equal(convertHandler.getReturnUnit("l"), "gal");
        assert.equal(convertHandler.getReturnUnit("gal"), "L");
        assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
        assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    });
    test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", function(){
        assert.equal(convertHandler.spellOutUnit("mi"), "miles");
        assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
        assert.equal(convertHandler.spellOutUnit("l"), "liters");
        assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
        assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
        assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    });
    test("convertHandler should correctly convert gal to L.", function(){
        assert.equal(convertHandler.convert(1, "gal"), 3.78541)
    });
    test("convertHandler should correctly convert L to gal.", function(){
        assert.equal(convertHandler.convert(1, "L"), 0.26417)
    });
    test("convertHandler should correctly convert mi to km.", function(){
        assert.equal(convertHandler.convert(1, "mi"), 1.60934)
    });
    test("convertHandler should correctly convert km to mi.", function(){
        assert.equal(convertHandler.convert(1, "km"), 0.62137)
    });
    test("convertHandler should correctly convert lbs to kg.", function(){
        assert.equal(convertHandler.convert(1, "lbs"), 0.45359)
    });
    test("convertHandler should correctly convert kg to lbs.", function(){
        assert.equal(convertHandler.convert(1, "kg"), 2.20462)
    });
});