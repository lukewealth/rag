// import path from "path";
// import { loadEnvVars } from "./loadEnvVars";
// import {
//   OpenAIClient,
//   OpenAIKeyCredential,
//   makeOpenAiEmbedder,
// } from "mongodb-chatbot-server";

// const dotenvPath = path.join(__dirname, "..", "..", "..", ".env"); // .env at project root

// const {
//   MONGODB_CONNECTION_URI,
//   MONGODB_DATABASE_NAME,
//   VECTOR_SEARCH_INDEX_NAME,
//   OPENAI_API_KEY,
//   OPENAI_EMBEDDING_MODEL,
//   OPENAI_CHAT_COMPLETION_MODEL,
// } = loadEnvVars(dotenvPath);

// const openAiClient = new OpenAIClient(new OpenAIKeyCredential(OPENAI_API_KEY));

// const embedder = makeOpenAiEmbedder({
//   openAiClient,
//   deployment: OPENAI_EMBEDDING_MODEL,
//   backoffOptions: {
//     numOfAttempts: 3,
//     maxDelay: 5000,
//   },
// });

// const find = async () => {
//   const res = await embedder.embed("What is the sui framework");
// };
