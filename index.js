const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');

const client = new textToSpeech.TextToSpeechClient();

if (process.argv[2] === '--list') {
  listVoices().catch(console.error)  
} else {
  let outFile = process.argv[2]
  let text = process.argv[3]
  let voiceName = process.argv[4] || 'en-US-Wavenet-H'
  synthesize(outFile, text, voiceName).catch(console.error);
}

async function listVoices() {
  const textToSpeech = require('@google-cloud/text-to-speech');

  const client = new textToSpeech.TextToSpeechClient();

  const [result] = await client.listVoices({});
  const voices = result.voices;

  console.log('Voices:');
  voices.forEach(voice => {
    console.log(`Name: ${voice.name}`);
    console.log(`  SSML Voice Gender: ${voice.ssmlGender}`);
    console.log(`  Natural Sample Rate Hertz: ${voice.naturalSampleRateHertz}`);
    console.log('  Supported languages:');
    voice.languageCodes.forEach(languageCode => {
      console.log(`    ${languageCode}`);
    });
  });
}

async function synthesize(outFile, text, voiceName) {
  const request = {
    input: {text: text},
    voice: {
      languageCode: 'en-US',
      // ssmlGender: 'FEMALE',
      name: voiceName,
    },
    audioConfig: {
      audioEncoding: 'LINEAR16',
      // Google Cloud's Ogg and MP3 encoders are pretty bad. Better to do it ourselves.
      // audioEncoding: 'OGG_OPUS',
      // audioEncoding: 'MP3',
      volumeGainDb: 6,
      "pitch": 0,
      "speakingRate": parseFloat(process.env.SPEAKING_RATE || '1')
    },
  };

  const [response] = await client.synthesizeSpeech(request);
  fs.writeFileSync(outFile, response.audioContent, 'binary');
}
