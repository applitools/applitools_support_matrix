const convert = require("xml-js")
const fs = require("fs");
const path = require("path");

function install({source, version, packageName, cwd}) {
    switch (source) {
        case "remote":
            return remote({version, packageName, cwd})
        default:
            throw new Error(`Installer doesn't support installation from ${source}`)
    }
}

function remote({version, packageName, cwd}) {
    const pomPath = path.join(cwd, "pom.xml")
    const pom = fs.readFileSync(pomPath, 'utf8')
    const js = parseXML(pom);
    const deps = js.project.dependencies.dependency
    const search = deps.find(dependency=> dependency.groupId._text === packageName.groupId && dependency.artifactId._text === packageName.artifactId)
    if (search) search.version = {_text:version}
    else {
        deps.push({
            groupId: {_text: packageName.groupId},
            artifactId: {_text: packageName.artifactId},
            version: {_text: version}
        })
    }
    const xml = prepareXML(js)
    fs.writeFileSync(pomPath, xml)
}

function parseXML(xml) {
    return convert.xml2js(xml, {ignoreComment: true, alwaysChildren: true, compact: true});
}

function prepareXML(js) {
    return convert.js2xml(js, {compact: true, spaces: 4, indentAttributes: true})
}


module.exports = install

