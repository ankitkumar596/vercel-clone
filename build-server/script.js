const {exec} = require('child_process')
const { log } = require('console')
const path = require('path')
const fs = require('fs')
const {s3Client, PutObjectCommand} = require('@aws-sdk/client-s3')
const mime = mime = require('mime-types')
const s3Client = new s3Client({
    region: 'us-east-1',
    credentials: {
        access_key: 'AKIAYNNV67FSM6IOEQJ4',
        secret_key: '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'
    } 
})

const PROJECT_ID = process.env.PROJECT_ID

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

            console.log('Uploading file', filePath);

            const command = new PutObjectCommand({
                Bucket: 'versel-bucket-vers',
                kye: `__output/${PROJECT_ID/$filePath}`,
                Body: fs.createReadStream(filePath),
                ContentType:  mime.lookup(filePath)
            })
            
            await s3Client.send(command)
            console.log('Uploaded file', filePath);
        }
        console.log('Done.....');
    })
}

init()

