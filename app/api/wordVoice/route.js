import { NextResponse } from "next/server";
// import { Storage } from "@google-cloud/storage"
// const stream = require('stream');
import { ElevenLabsClient, play } from "elevenlabs";
import { WriteStream } from 'fs';

//const storage = new Storage({
//    credentials: {
//                   "type": "service_account",
//                   "project_id": "daylang",
//                   "private_key_id": "a48a86e8b797a6029916f690d276b9822527cfed",
//                   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDFkmDoSJr0yimT\nC+dmxU0HM57Ge3khni4MKqI+NU6YP7e8m2ZHOwIFfmsn3RYU9wAuvkHzNznssL56\nMQvQiHkTMsXxALgrKYF1mB6WYPi0s/b4MqPSkmKVEa6ArizKBMsMwAgWHDW5egyE\nwuQiMrOtDnVzweheMXjcBl+j83WZINWZV710S9/L1OLP4vF1/iRl6a5C+jKnqIcV\n/yQhgBrWd+SnWpJDaEQ5G6yelWoYQ0XSQ1iKzXzSW0nStOBEou4nk+a8YxUjcnmQ\nq3+aTjmK5nwvrLuzzB7TjF6akZUhUmLvGff3tboue7vS6TNJDZjxzcLM8YB0ox8w\nQ2PBHLSNAgMBAAECggEAJaDUE5FWb9Y79k1PWFet7Lf0Xq1/+7reXsNU7J+m9SC3\ni/SV1W2j3CuAWZKGJN6JGp3yPhHv1ogv8uI585C2bIVgRR8DtHa+eQjMlIvp+jKH\nUCyG3nEyVN1N/KSPk7c3e9lsANgFFGruDO/4VpoM9eH51R7idGQcNl2BZB6XcF8G\nXmUj9e5PBYaCI9M3uz/qSkXQaYNpKGleD9Y4ZgIUHCYwIS84/pFSQSvqcU3qGMCW\nf7oxc3Mg/Ji6RV3Oto1WqgvfVE7X+rMhEbTzrNNQ4HFN8BG5sXy9SNTIgi7G0AC7\n7NRy33VzDZShKpJK7eCuEdboeeL2DSryX8pF2XED8QKBgQDyiAmEx0i5UYXN2SCE\nuF1Azo7Rodlv/EFrqNqR9CnFvwHWsMHP+zKZeEYQyWJHwxAOu557wB73Lvz1S97t\nKopksJf3dKhCuXYVmrp6Sj97RVD7f3Pxk+nm9dJWx6l1bRB9shJDNuEqYup704Oc\nFv32zMKcuzKZxapH+maYLuiN8QKBgQDQiyuagw2+olqdhxSjQcAilrt8SuhlRVmS\nNJtFycrt0xR7py9r2jK0+5TnEvvXYYSC7tHrTgFY/Q8nfXS5yN7KutM8OYSZFnuJ\nTrvV9Gdp8euTO2Di4C0QTl2sJSVQu4hILVPDVnQ561/jQ0+s+98eQU6EdIXb7bJU\n7SbWnx9kXQKBgQDi0Xztc568ydQ0RorV9MIpuMPyo8YBqE3ajMkU1N84M8FZcmdf\nxhJ1WvlT+7LxYCklTiwSmgObspMaKUGsViulrU4CPFScSmx4GgOqGMQz2gi5nGHn\nnSiUOnPjesktq7lPhHj16V49UNLwyUh9czdCWA7tm1jgXO86b6EBVGVjUQKBgQCv\nKrbNahc5cRW8C6KCHtBMPV/t3t2lcsLx0844qG8TpKEn3B4w8W52JnvEPGXdW8P6\nVq9sfnETVjxMZ0yMYPUCRDr58zY1gHTzuHZ+GHRkwRem69FNwA8aCzkTR4A4d8zZ\nE3mwMgYeQF6iff+GxWl7+E8DYvys5tNMEob072Nm4QKBgQCfGCrtVKanswehuGh7\n3YdXBYB+e1lrHU14h+8XYIX+98O6u0ljMZSiaa8Km8e6896cV+hKddCiBSwG3kT0\nR0cNK8xqd+aZFdQQIeBeuO/8jdPoFCaWSpefgFOdHvmz7zLe2rFb3+m1G/keF9NW\nLH5BWytKALsBJlVhZwAqaVwx7Q==\n-----END PRIVATE KEY-----\n",
//                   "client_email": "top-227@daylang.iam.gserviceaccount.com",
//                   "client_id": "105493303879804138581",
//                   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//                   "token_uri": "https://oauth2.googleapis.com/token",
//                   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//                   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/top-227%40daylang.iam.gserviceaccount.com",
//                   "universe_domain": "googleapis.com"
//                 }
//
//  })
export async function POST(req, res) {
    const {wordString,name} = await req.json();
  

     const elevenlabs = new ElevenLabsClient({
      apiKey: "643430969c1b268733c0f435403adff3" // Defaults to process.env.ELEVENLABS_API_KEY
    })
    

try {

    const audio = await elevenlabs.generate({
        voice: "Adam",
        model_id: "eleven_turbo_v2",
        voice_settings: { similarity_boost: 0.5, stability: 0.5 },
        text: wordString
        // stream: true,
      });
//const myBucket = storage.bucket("word-image-save");
//
//const file = myBucket.file(`${name}Audio.mp3`);
//async function streamFileUpload() {
//  audio.pipe(file.createWriteStream()).on('finish', () => {
//    // The file upload is complete
//    console.log(`uploaded ${name}Audio.mp3`);
//  });
//
//  console.log(`uploaded`);
//}
//
//streamFileUpload().catch(console.error);

      return new Response(audio, {
        headers: { "Content-Type": "audio/mpeg" }
      });


}   catch(err) {
    console.log("oh no",err)
    // console.log(err,"the error")
    return NextResponse.json({err})

} 




}