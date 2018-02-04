// When Jest scrapes the project directory for test files, it is looking for files with the extension .test.js

const add = (a,b) => a + b;

// test() takes in two required arguments
// 1 - name: description of what the test should do
// 2 - code to run for the test case
test('should add two numbers', () => {
    const result = add(3, 4);
    // make an assertion that we are expecting it to return
    // if (result !== 7) { 
    //     // then something is wrong, so throw an error
    //     throw new Error(`You added 4 and 5. The result was ${result}. Expected 7`)
    // }

    // Jest gives us an assertion library
    expect(result).toBe(7); // global variable available from Jest
});