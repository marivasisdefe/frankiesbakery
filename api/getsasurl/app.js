// backend/app.js
const express = require('express');
const { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions } = require('@azure/storage-blob');
require('dotenv').config();

const app = express();

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = process.env.AZURE_CONTAINER_NAME;

app.get('/api/getsasurl', async (req, res) => {
  try {
    const fileName = req.query.filename;
    if (!fileName) return res.status(400).json({error: 'Falta el parámetro filename.'});

    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

    const blobSas = generateBlobSASQueryParameters({
      containerName: containerName,
      blobName: fileName,
      permissions: BlobSASPermissions.parse("cw"), // create & write (solo subida)
      startsOn: new Date(),
      expiresOn: new Date(Date.now() + 15 * 60 * 1000), // 15 minutos de validez
    }, sharedKeyCredential).toString();

    const sasUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${fileName}?${blobSas}`;
    res.json({ uploadUrl: sasUrl });
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});

app.listen(3000, () => console.log('Backend running on port 3000'));