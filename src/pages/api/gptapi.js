import { OpenAIStream } from "../../../utils/OpenAIStream";

if (!process.env.CHATGPT_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req )=> {
  const { content } = await req.json()

  if (!content) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload= {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: content }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
