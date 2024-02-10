const {exec} = require('child_process')
const { log } = require('console')
const path = require('path')
const fs = require('fs')


async function init() {
    console.log("Executing script.js")
    const outDirPath = path.join(__dirname, 'output')

    const process = exec(`cd ${outDirPath} && npm install && npm run bild`)

    process.stdout.on('data', function(data){
        console.log(data.toString());
    })

    process.stdout.on('error', function (data){
        console.log('Error', data.toString());
    })

    process.on('close', async function() {
        console.log('Buld Complete');

        const distFolderPath = path.join(__dirname, 'output', 'dist')
        const distFolderContents = fs.readdirSync(distFolderPath, {recursive: true})

        for(const filePath of distFolderContents) {
            if (fs.lstatSync(filePath).isDirectory()) continue;
        }
    })
}