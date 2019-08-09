 // Imports the Google Cloud client library
 const {Translate} = require('@google-cloud/translate');

 projectId = process.env.PROJECT_ID
 // Instantiates a client
 const translate = new Translate({projectId});

 // The text to translate
 const text = 'Hello, world!';

 // The target language
 const target = 'ru';

 module.exports = translate

 // Translates some text into Russian
//  const [translation] = await translate.translate(text, target);
//  console.log(`Text: ${text}`);
//  console.log(`Translation: ${translation}`);