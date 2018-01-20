#!/bin/bash

# Clean up
echo 'cleaning up...'
rm -rf build
rm build.zip
mkdir build

cp package.json build/
cp -R src/ build
rm build/main.test.js

echo 'installing production dependencies...'
cd build
npm install --production

cd ..
echo 'compressing `build` directory...'
zip -qr build.zip build/*

echo 'uploading to amazon...'
aws lambda update-function-code --function-name imageCaptions --zip-file fileb://build.zip --profile personal