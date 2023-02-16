const {execSync} = require('child_process')

function checkInput(str) {
    return str && str.length > 0 ? strToNum(str) : str;
}

function strToNum(str) {
    const parsed = parseInt(str)
    if (isNaN(parsed)) {
        throw new Error(`Tried to parse string [${str}] to the num`)
    }
    return parsed
}

function shellCommand(command, cwd) {
    return execSync(command, {cwd}).toString();
}


module.exports = {
    checkInput,
    strToNum,
    shellCommand
}