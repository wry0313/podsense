import { OpenAIStream, OpenAIStreamPayload } from "@/utils/openAIStream";
import { PineconeClient } from "@pinecone-database/pinecone";
import { Configuration, OpenAIApi } from "openai";
import { HttpsProxyAgent } from "https-proxy-agent";
import { encoding_for_model } from "@dqbd/tiktoken";

if (!process.env.OPENAI_API_KEY || !process.env.PINECONE_API_KEY) {
  throw new Error("Missing .env API key");
}

const GPT_MODEL = "gpt-3.5-turbo";
const pinecone = new PineconeClient();

const initPinecone = async () => {
  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
  console.log("init pinecone");
};

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge' // https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes

const numTokens = (text: string) => {
  const enc = encoding_for_model(GPT_MODEL);
  return enc.encode(text).length;
};

export async function POST(req: Request): Promise<Response | undefined> {
  try {
    const { query, tokenBudget, namespace } = (await req.json()) as {
      query?: string;
      tokenBudget?: number;
      namespace?: string;
    };
    if (!query || !tokenBudget || !namespace) {
      return new Response("no query or namespace included", { status: 400 });
    }
    await initPinecone();
    const openai = new OpenAIApi(openAIConfig);
    const index = pinecone.Index("podcast");

    const response = await openai.createEmbedding(
      {
        model: "text-embedding-ada-002",
        input: query,
      },
      {
        proxy: false,
        httpAgent: new HttpsProxyAgent("http://127.0.0.1:1087"),
        httpsAgent: new HttpsProxyAgent("http://127.0.0.1:1087"),
      }
    );
    const query_embedding = response.data["data"][0].embedding;

    const queryRequest = {
      vector: query_embedding,
      topK: 5,
      includeMetadata: true,
      namespace: namespace,
    };
    const queryResponse = await index.query({ queryRequest });

    const introduction =
      "Use the below sentences in a podcast interview to answer the subsequent question. If the answer cannot be found in the quote, use the content to help answer the question. In the response also include the specific evidence. The format of the ansewr should be {answer} Evidence:{evidence}";
    const question = "\n\nQuestion: " + query;
    let message = introduction;
    if (queryResponse["matches"]) {
      for (let vectorObj of queryResponse["matches"]) {
        let string = (vectorObj["metadata"] as { text: string })["text"];
        let next_article = "\n########\n" + string;
        if (numTokens(message + next_article + question) > tokenBudget) {
          break;
        } else {
          message += next_article;
        }
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
        status: 500,
      });
    } else if (e instanceof Error) {
      return new Response((e as Error).message, {
        status: 500,
      });
    }
  }
}
