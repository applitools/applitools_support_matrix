const {shellCommand} = require("../../util/common");
const {spawn} = require("node:child_process")

    async function install({source, version, packageName, legacyNpmPeers, cwd}) {
        switch (source) {
            case "remote":
                return await remote({version, packageName, legacyNpmPeers, cwd})
            default:
                throw new Error(`Installer doesn't support installation from ${source}`)
        }
    }

    async function remote({version, packageName, legacyNpmPeers, cwd}) {
        // let command = `npm install ${packageName}@${version} -E`
        // if (legacyNpmPeers) command += ' --legacy-peer-deps'
        // shellCommand(command, cwd)
        const parameters = ['install', `${packageName}@${version}`, '-E']
        if (legacyNpmPeers) parameters.push('--legacy-peer-deps')
        await promiseSpawn({command:'npm',parameters,cwd})
        const ls = shellCommand(`npm list`, cwd)
        const regResult = new RegExp(` (${packageName})@(.*)`).exec(ls)
        return {installed_name: regResult[1], installed_version: regResult[2]}
    }

    async function promiseSpawn({command, parameters, cwd}) {
        return new Promise((resolve, reject) => {
            const process = spawn(command, parameters, {cwd})
            process.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`)
            })
            process.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`)
            })
            process.on('close', (code) => {
                console.log(`Command ${command} ${parameters.join(' ')} - exited with code ${code}`);
                if(code === 0) resolve()
                else reject(code)
            })
        })
    }



module.exports = install

