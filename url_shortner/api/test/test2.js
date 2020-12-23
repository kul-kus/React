const assert = require('assert');

// Generate an AssertionError to compare the error message 

// Verify error output:
try {
    assert.strictEqual(1, 2);
} catch (err) {
    console.log("err===>")
   
}