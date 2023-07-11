import { OpenAIStream, OpenAIStreamPayload } from "@/utils/openAIStream";
import { PineconeClient } from "@pinecone-database/pinecone";
import { Configuration, OpenAIApi } from "openai";
import { HttpsProxyAgent } from "https-proxy-agent";
import { TextMetadata } from "@/types";

if (!process.env.OPENAI_API_KEY || !process.env.PINECONE_API_KEY) {
  console.error("Missing .env API key");
}

const GPT_MODEL = "gpt-3.5-turbo";
const pinecone = new PineconeClient();

const initPinecone = async () => {
  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// export const runtime = 'nodejs' // 'nodejs' (default) | 'edge'

export async function POST(req: Request): Promise<Response | undefined> {

    const { query, episode_id, host, title } = (await req.json()) as {
      query: string;
      episode_id: string;
      host?: string;
      title?: string;
    };
    if (!query || !episode_id) {
      return new Response("no query or episode id included", { status: 400 });
    }
    await initPinecone();
    const openai = new OpenAIApi(openAIConfig);
    const index = pinecone.Index("podsense");

    const response = await openai.createEmbedding(
      {
        model: "text-embedding-ada-002",
        input: query,
      }
      ,{proxy: false,httpAgent: new HttpsProxyAgent("http://127.0.0.1:1087"),httpsAgent: new HttpsProxyAgent("http://127.0.0.1:1087"),}
    );
    const query_embedding = response.data["data"][0].embedding;

    const queryRequest = {
      vector: query_embedding,
      topK: 3,
      includeMetadata: true,
      filter: {
        episode_id: episode_id
      }
    };
    const queryResponse = await index.query({ queryRequest });
    console.log(queryResponse)
    let message =
    "Pretend to be " + host + " who is a podcast host and your purpose is to answer questions directly using the content from an episode. The title of the episode is " + title +  " Your answer's info must be directly taking info from the given text below. If the below text doens't contain info to help you answer, say this is not discussed in the episode and end your answer. If the input question is not complete or you cannot understand it, say that you cannot understand it in the tone of " + host +". Below is the selected transcript to help you answer the questions. For your answer you must incorporate the relavent text as quotations into your answer. for example say 'in the episode I said .... '.";    
    
    if (queryResponse["matches"]) {
      for (let match of queryResponse["matches"]) {
        const metadata = match["metadata"] as TextMetadata;
        message += "\n########\n" + metadata["text"];
      }
    }
    // message += "\n\n The input queston is this: \"" + query + "\"";
    console.log(message)
    const payload: OpenAIStreamPayload = {
      model: GPT_MODEL,
      messages: [{ role: "system", content: message }, { role: "user", content: query }],
      temperature: 0.3,
      // top_p: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0,
      // max_tokens: 1000,
      stream: true,
      // n: 1,
    };

    const stream = await OpenAIStream(payload);
    return new Response(stream);
 
}


//https://levelup.gitconnected.com/how-to-stream-real-time-openai-api-responses-next-js-13-2-gpt-3-5-turbo-and-edge-functions-378fea4dadbd