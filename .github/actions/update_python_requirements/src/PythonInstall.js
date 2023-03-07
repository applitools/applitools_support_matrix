const path = require("path");
const fs = require("fs");
const {shellCommand} = require("../../util/common")


async function install({source, version, packageName, cwd}) {
    switch (source) {
        case "remote":
            return remote({version, packageName, cwd})
        case "package":
            return await packageInstall({version, packageName, cwd})
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

function removeDepsFromRequirements({packageName, cwd}){
    const requirementsPath = path.join(cwd, "requirements.txt")
    let requirements = fs.readFileSync(requirementsPath).toString()
    const reg = new RegExp(`^${packageName}[=>~]{0,2}[\\d\.\*]*$`, 'gm')
    requirements = requirements.split('\n').filter(line => !reg.test(line)).join('\n')
    console.log('Update file:')
    console.log(requirements)
    console.log('^^^^^^^^^^^^')
    fs.writeFileSync(requirementsPath, requirements)
}

async function packageInstall({version, packageName, cwd}) {
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
    const coreVersion = artifact_packages_paths.filter(val => val.startsWith("core_universal"))[0].split("-")[1]
    deepLs(cwd)
    removeDepsFromRequirements({packageName, cwd})
    shellCommand(`pip install core-universal==${coreVersion} --no-index --find-links=file://${cwd}/dist/`, cwd)
    shellCommand(`pip install ${packageName}==${version} --find-links=file://${cwd}/dist/`, cwd)

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

