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
    const pomPath = path.join(cwd, "SupportMatrix.csproj")
    const pom = fs.readFileSync(pomPath, 'utf8')
    const js = parseXML(pom);
    const packageReference = js.Project.ItemGroup.PackageReference
    const search = packageReference.find(ref => ref._attributes.Include === packageName)
    if (search) search._attributes.Version = version
    else {
        packageReference.push({
            _attributes: {
                Include: packageName,
                Version: version
            }
        })
    }
    const xml = prepareXML(js)
    fs.writeFileSync(pomPath, xml)
}

function parseXML(xml) {
    return convert.xml2js(xml, {ignoreComment: true, alwaysChildren: true, compact: true});
}

function prepareXML(js) {
    return convert.js2xml(js, {compact: true, spaces: 4})
}


module.exports = install

