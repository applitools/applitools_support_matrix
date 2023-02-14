const {Version} = require("./Version");
const {getLatest, getMajorMinus, getPatchMinus, getMinorMinus} = require("./js/util");


function parseVersion(versionString) {
    const reg_version_parse = /(\d+).(\d+).(\d+)/gm
    const arr = reg_version_parse.exec(versionString);
    if (arr === null) {
        console.log(versionString)
        throw new Error("failed to parse")
    }
    return new Version({
        major: arr[1],
        minor: arr[2],
        patch: arr[3],
    })
}

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

function parseInputVersion({version, packageName, cwd}) {
    const TYPES = {
        exact: ({minus})=> {
            return minus
        },
        major: getMajorMinus,
        minor: getMinorMinus,
        patch: getPatchMinus,
        latest: ({packageName, cwd}) => {
            return getLatest(packageName, cwd)
        },
    }
    const arr = getCheck(version)
    const type = arr[1];
    const value = arr[2];

    if (!TYPES.hasOwnProperty(type)) throw new Error(`There were wrong input type, ${JSON.stringify(arr)}`)
    return TYPES[type]({packageName, cwd, minus:value})


    function getCheck(str) {
        const regex = /(\w+)@(.*)/gm
        return regex.exec(str)
    }


}

export {
    checkInput,
    strToNum,
    parseVersion,
    parseInputVersion
}