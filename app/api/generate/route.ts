import { OpenAIStream, OpenAIStreamPayload } from "@/utils/openAIStream";
import { PineconeClient } from "@pinecone-database/pinecone";
import { Configuration, OpenAIApi } from "openai";
// import { HttpsProxyAgent } from "https-proxy-agent";

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

export const runtime = 'nodejs' // 'nodejs' (default) | 'edge'

const numTokens = (text: string) => {
  return 0;
};

export async function POST(req: Request): Promise<Response | undefined> {
  try {
    const { query, namespace } = (await req.json()) as {
      query?: string;
      namespace?: string;
    };
    if (!query || !namespace) {
      return new Response("no query or namespace included", { status: 400 });
    }
    await initPinecone();
    const openai = new OpenAIApi(openAIConfig);
    const index = pinecone.Index("podcast");

    const response = await openai.createEmbedding(
      {
        model: "text-embedding-ada-002",
        input: query,
      }
      // ,{
      //   proxy: false,
      //   httpAgent: new HttpsProxyAgent("http://127.0.0.1:1087"),
      //   httpsAgent: new HttpsProxyAgent("http://127.0.0.1:1087"),
      // }
    );
    const query_embedding = response.data["data"][0].embedding;

    const queryRequest = {
      vector: query_embedding,
      topK: 3,
      includeMetadata: true,
      namespace: namespace,
    };
    const queryResponse = await index.query({ queryRequest });

    const introduction =
      "use the below transcript from a podcast interview to answer the question. if the exact answer cannot be found, use the transcript to help you answer the question. incorporate the text as quotation into your answer.";
    const question = "\n\nQuestion: " + query;
    let message = introduction;
    if (queryResponse["matches"]) {
      for (let vectorObj of queryResponse["matches"]) {
        message += "\n########\n" + (vectorObj["metadata"] as { text: string })["text"];
      }
    }
    message = message + question;
    console.log(message)
    const payload: OpenAIStreamPayload = {
      model: GPT_MODEL,
      messages: [{ role: "user", content: message }],
      // temperature: 0.7,
      // top_p: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0,
      // max_tokens: 1000,
      stream: true,
      // n: 1,
    };

    const stream = await OpenAIStream(payload);
    return new Response(stream);
  } catch (e) {
    
    if (typeof e === "string") {
      return new Response(e, {
        status: 400,
      });
    } else if (e instanceof Error) {
      return new Response((e as Error).message, {
        status: 400,
      });
    }
  }
}


//https://levelup.gitconnected.com/how-to-stream-real-time-openai-api-responses-next-js-13-2-gpt-3-5-turbo-and-edge-functions-378fea4dadbd