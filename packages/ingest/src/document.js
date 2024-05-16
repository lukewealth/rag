import {
  makeLangChainDocumentLoaderDataSource,
  handleHtmlDocument,
} from "mongodb-rag-ingest/sources";
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
    title: doc.pageContent.body,
  }),
});

const useThis = async () => {
  const res = await documentLoaderDataSource.fetchPages();
  return res;
};

// useThis().then((res) => console.log(res));
// console.log(documentLoaderDataSource);

// console.log(
//   documentLoader.load().then((res) => console.log(res[0].pageContent))
// );

const jvmDriversVersion = "4.10";
const jvmDriversHtmlToRemove = (domDoc) => [
  ...Array.from(domDoc.querySelectorAll("head")),
  ...Array.from(domDoc.querySelectorAll("script")),
  ...Array.from(domDoc.querySelectorAll("noscript")),
  ...Array.from(domDoc.querySelectorAll(".sidebar")),
  ...Array.from(domDoc.querySelectorAll(".edit-link")),
  ...Array.from(domDoc.querySelectorAll(".toc")),
  ...Array.from(domDoc.querySelectorAll(".nav-items")),
  ...Array.from(domDoc.querySelectorAll(".bc")),
];
const jvmDriversExtractTitle = (domDoc) => {
  const title = domDoc.querySelector("title");
  return title?.textContent ?? undefined;
};
const javaReactiveStreamsHtmlParserOptions = {
  pathToPageUrl: (pathInRepo) =>
    `https://dizzle.com${pathInRepo}`.replace(/index\.html$/, ""),
  removeElements: jvmDriversHtmlToRemove,
  extractTitle: jvmDriversExtractTitle,
};
// handleHtmlDocument("Hello", content, javaReactiveStreamsHtmlParserOptions).then(
//   (res) => console.log(res)
// );
const content = documentLoader
  .load()
  .then((res) =>
    handleHtmlDocument(
      "Hello",
      res[0].pageContent,
      javaReactiveStreamsHtmlParserOptions
    ).then((re) => console.log(re))
  );
