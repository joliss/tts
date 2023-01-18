# Text-to-speech utility for Google Wavenet voices

## Installation and setup

Clone this repository, and inside the directory, run:

```sh
npm install
```

Set up your Google Cloud billing & credentials as per the [Before you
Begin](https://www.npmjs.com/package/@google-cloud/text-to-speech#before-you-begin)
section. (It may charge you a few cents for the requests you make.) 

Assuming you stored your service account's JSON key in
`~/.google-cloud-credentials.json`, run

```sh
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.google-cloud-credentials.json"
```

## Usage

```
node index.js <output_file.wav> <text> [<voice>]
```

The default voice is `en-US-Wavenet-H`. To list the possible voices, run

```
node index.js --list
```

You can set the `SPEAKING_RATE` environment variable to change the speaking rate
(default: 1).

### Example

```sh
SPEAKING_RATE=1.8 node index.js test.wav "This is a test." en-US-Wavenet-H
```
