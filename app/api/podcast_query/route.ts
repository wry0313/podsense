import { OpenAIStream, OpenAIStreamPayload } from "@/utils/openAIStream";
import { PineconeClient } from "@pinecone-database/pinecone";
import { Configuration, OpenAIApi } from "openai";
// import { HttpsProxyAgent } from "https-proxy-agent";
import { TextMetadata, EpisodeClipMetadata } from "@/types";

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

    const { query, podcast_id, host, title } = (await req.json()) as {
      query?: string;
      podcast_id?: string;
      host?: string;
      title?: string;
    };
    if (!query || !podcast_id) {
      return new Response("no query or podcast id included", { status: 400 });
    }
    await initPinecone();
    const openai = new OpenAIApi(openAIConfig);
    const index = pinecone.Index("podsense");

    const response = await openai.createEmbedding(
      {
        model: "text-embedding-ada-002",
        input: query,
      },
      // {proxy: false,httpAgent: new HttpsProxyAgent("http://127.0.0.1:1087"),httpsAgent: new HttpsProxyAgent("http://127.0.0.1:1087"),}
    );

    const episodes : EpisodeClipMetadata[] = [];
    const query_embedding = response.data["data"][0].embedding;
    const queryRequest = {
      vector: query_embedding,
      topK: 3,
      includeMetadata: true,
      filter: {
        podcast_id: podcast_id,
      },
    };
    const queryResponse = await index.query({ queryRequest });
    // console.log(queryResponse);

    let message =
      `Pretend to be " + host + " who is a podcast host and your purpose is to answer questions directly using the clips from one or multiple episodes below. If the question is irrelavent to the episodes and if directed towards you personally, say something generic. Keep your answer short. You can only use the episode titles and information in provided text below. For your answer you should use many episodes: for each episdoe you use to answer, include the episode title in quotation marks and guest name if you haven't used it before and breiefly talk about the information in that episode text that can help you answer the question. You are given access to a max of three different episodes title. If the user ask for mroe than three episode info you can only give three`;

    if (queryResponse["matches"]) {
      for (let match of queryResponse["matches"]) {
        const metadata = match["metadata"] as TextMetadata;
        episodes.push({
          episode_id: metadata.episode_id,
          episode_title: metadata.title,
          timestamp: metadata["timestamp"],
        });
        message += "\n######\nEpisode title: \"" +
              metadata["title"] + "\""+
              "\nRelavent text: " +
              metadata["text"];
      }
    }

    message += '\n\n The input queston is this: "' + query + '"';
    // console.log(message);
    const payload: OpenAIStreamPayload = {
      model: GPT_MODEL,
      messages: [
        { role: "system", content: message },
        { role: "user", content: query },
      ],
      stream: true,
      temperature: 0,
    };

    const stream = await OpenAIStream(payload, episodes);
    
    return new Response(stream);
    
}

//https://levelup.gitconnected.com/how-to-stream-real-time-openai-api-responses-next-js-13-2-gpt-3-5-turbo-and-edge-functions-378fea4dadbd
