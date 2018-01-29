# Reuben and Cherise

## Description

This project is made up of two bots: **Reuben** and **Cherise**.

It uses [Microsoft Azure's Cognitive Services](https://azure.microsoft.com/en-us/try/cognitive-services/) to generate a caption for an image and runs.

It runs on [AWS Lambda](https://aws.amazon.com/lambda/)

## Reuben

The project began with Reuben, a bot to handle posting caption for my personal photos. Each time I post a photo to my Instagram, Reuben will generate a caption and post the image and caption to my Twitter and Facebook.

## Cherise (TODO)

Demoing this project requires posting to my personal Instagram account.

Cherise will be a Twitter account. Anyone can tweet it an image and it will quote tweet the image with the caption.

## 10 Second Tutorial (Reuben)

Create an `.env` file with the following

```
INSTAGRAM_ACCESS_TOKEN=

AMAZON_ACCESS_KEY_ID=
AMAZON_SECRET_ACCESS_KEY=
S3_BUCKET=
MEDIA_ID_FILE_NAME=

COGNITIVE_SERVICES_URL=
COGNITIVE_SERVICES_KEY=

FACEBOOK_ACCESS_TOKEN=

TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_SECRET=
```

Build and deploy with

```
./build.sh
```

Run the function locally with

```
node run.js
```

Run tests with [Jest](https://facebook.github.io/jest/) or [Wallaby.js](https://wallabyjs.com)

```
npm test
```

This project also supports launching and debugging in [VS Code](https://code.visualstudio.com).
