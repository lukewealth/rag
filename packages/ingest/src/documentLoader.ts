import { makeLangChainDocumentLoaderDataSource } from "mongodb-rag-ingest/sources";
import { TextLoader } from "langchain/document_loaders/fs/text";

// Langchain document loader
const documentLoader = new TextLoader("./docs/move_concepts.html");

const documentLoaderDataSource = makeLangChainDocumentLoaderDataSource({
  documentLoader,
  name: "some-source",
  metadata: {
    foo: "bar",
  },
  // This function transforms the Langchain document to a MongoDB Chatbot Framework `Page`
  transformLangchainDocumentToPage: async (doc) => ({
    format: "md",
    url: "Hello",
    body: doc.pageContent,
    metadata: {
      fizz: "buzz",
    },
    title: "page title",
  }),
});

console.log(documentLoaderDataSource);
