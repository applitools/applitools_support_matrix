const path = require("path");
const fs = require("fs");


async function install({source, version, packageName, cwd}) {
    switch (source) {
        case "remote":
            return remote({version, packageName, cwd})
        case "package":
            return await package({version, packageName, cwd})
        default:
            throw new Error(`Installer doesn't support installation from ${source}`)
    }
}

function remote({version, packageName, cwd}) {
    const requirementsPath = path.join(cwd, "requirements.txt")
    let requirements = fs.readFileSync(requirementsPath).toString()
    const reg = new RegExp(`^${packageName}[=>~]{0,2}[\\d\.\*]*$`, 'gm')
    const newPackageLine = `${packageName}==${version}`
    if (reg.test(requirements)) {
        requirements = requirements.replace(reg, newPackageLine)
    } else {
        requirements = requirements.concat(`\n${newPackageLine}`)
    }
    console.log('Update file:')
    console.log(requirements)
    console.log('^^^^^^^^^^^^')
    fs.writeFileSync(requirementsPath, requirements)
}

async function package({version, packageName, cwd}) {
    const artifact = require('@actions/artifact');
    const artifactClient = artifact.create()
    const artifactName = 'package';
    const dirPath = path.join(cwd, 'dist')
    const options = {
        createArtifactFolder: false
    }
    const downloadResponse = await artifactClient.downloadArtifact(artifactName, dirPath, options)
    console.log(JSON.stringify(downloadResponse))
    const artifact_packages_paths = []
    collect_packages_paths(path.join(cwd, 'dist', 'python'))
    artifact_packages_paths.forEach(filePath => {
        fs.renameSync(filePath, path.join(cwd, 'dist', path.basename(filePath)))
    })
    deepLs(cwd)
    remote({version: `${version} --find-links=file://${cwd}/dist/`,packageName, cwd})

    function collect_packages_paths(dir) {
        fs.readdirSync(dir).forEach(file => {
            const absolute = path.join(dir, file);
            if (fs.statSync(absolute).isDirectory()) collect_packages_paths(absolute);
            else artifact_packages_paths.push(absolute);
        });
    }

    function deepLs(dir) {
        fs.readdirSync(dir).forEach(file => {
            const absolute = path.join(dir, file);
            if (fs.statSync(absolute).isDirectory()) deepLs(absolute);
            else console.log(absolute);
        });
    }
}



module.exports = install

