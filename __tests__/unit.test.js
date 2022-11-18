// unit.test.js

const functions = require('../code-to-unit-test/unit-test-me.js');

// TODO - Part 2

// Tests for isPhoneNumber
test ('Phone numbers with all 1s', () => {
    expect (functions.isPhoneNumber ('(111)1111111)')).toBe (false)
}); 
test ('Phone numbers with 9 random numbers', () => {
    expect (functions.isPhoneNumber ('305-912-120')).toBe (false)
}); 
test ('Phone numbers with real numbers', () => {
    expect (functions.isPhoneNumber ('(858) 534-2230')).toBe (true)
}); 
test ('Phone numbers with phone numbers', () => {
    expect (functions.isPhoneNumber ('305-912120')).toBe (true)
}); 


// Tests for isEmail 
test ('Email with no @', () => {
    expect (functions.isEmail ('hello.com')).toBe (false)
}) 
test ('Email with no .', () => {
    expect (functions.isEmail ('hello@ucsd')).toBe (false)
}) 
test ('Email with @', () => {
    expect (functions.isEmail ('hello@ucsd.com')).toBe (true)
}) 
test ('Email with short', () => {
    expect (functions.isEmail ('ahol@bob.com')).toBe (true)
}) 


// Tests for isStrongPassword
test ('Password with only numbers', () => {
    expect (functions.isStrongPassword ('1234567')).toBe (false)
})
test ('Password with short', () => {
    expect (functions.isStrongPassword ('f4')).toBe (false)
})
test ('Password with 4 characters', () => {
    expect (functions.isStrongPassword ('f414')).toBe (true)
})
test ('Password with only letters', () => {
    expect (functions.isStrongPassword ('udishiuds')).toBe (true)
})


// Tests for isDate
test ('Email with wrong format', () => {
    expect (functions.isDate ('2022/30/12')).toBe (false)
})
test ('Email with space', () => {
    expect (functions.isDate ('20 /20 /2020')).toBe (false)
})
test ('Email with correct format', () => {
    expect (functions.isDate ('20/30/2012')).toBe (true)
})
test ('Email with good format', () => {
    expect (functions.isDate ('22/30/1002')).toBe (true)
})


// Tests for isHexColor 
test ('Hex color exceeds bound', () => {
    expect (functions.isHexColor ('GGGGGG')).toBe (false)
})
test ('Hex color exceeds bound', () => {
    expect (functions.isHexColor ('FFFFFFFFFFF')).toBe (false)
})
test ('Hex color within bound', () => {
    expect (functions.isHexColor ('FFF')).toBe (true)
})
test ('Hex color 3 digits', () => {
    expect (functions.isHexColor ('123')).toBe (true)
})