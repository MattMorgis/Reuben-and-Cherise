#!/bin/bash

# Clean up
echo 'cleaning up...'
rm -rf build
mkdir build

cp package.json build/
cp src/main.js build/

echo 'installing production dependencies...'
cd build
npm install --production

cd ..
echo 'compressing `build` directory...'
zip -qr build.zip build/*

echo 'uploading to amazon...'
aws lambda update-function-code --function-name imageCaptions --zip-file fileb://build.zip --profile personal
rm build.zip