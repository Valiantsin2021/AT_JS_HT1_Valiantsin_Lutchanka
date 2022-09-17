const expectChai = require('chai').expect;

module.exports = async function checkArray (elArr, arr) {
    for(let i = 0; i < await elArr.length; i++) {
        expectChai(await elArr[i].getText()).to.equal(arr[i]);
    }
}