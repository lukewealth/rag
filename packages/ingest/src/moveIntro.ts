import {
  makeGitDataSource,
  handleHtmlDocument,
  HandleHtmlPageFuncOptions,
  MakeGitDataSourceParams,
  makeMdOnGithubDataSource,
  MakeMdOnGithubDataSourceParams,
} from "mongodb-rag-ingest/sources";

const jvmDriversVersion = "4.10";
const jvmDriversHtmlToRemove = (domDoc: Document) => [];
const jvmDriversExtractTitle = (domDoc: Document) => {
  const title = domDoc.querySelector("title");
  return title?.textContent ?? undefined;
};
const javaReactiveStreamsHtmlParserOptions: Omit<
  HandleHtmlPageFuncOptions,
  "sourceName"
> = {
  pathToPageUrl: (pathInRepo: string) =>
    `https://github.com/sui-foundation/sui-move-intro-course${pathInRepo}`,
  removeElements: jvmDriversHtmlToRemove,
  extractTitle: jvmDriversExtractTitle,
};

const sourceConfig: MakeMdOnGithubDataSourceParams = {
  name: "sui-move-intro-course",
  repoUrl: "https://github.com/sui-foundation/sui-move-intro-course.git",
  repoLoaderOptions: {
    branch: "main",
  },
  metadata: {
    productName: "sui-move-intro-course",
    tags: ["intro", "basics", "fundamentals", "design capability"],
  },
  filter: (path: string) =>
    path.endsWith(".md") &&
    path.includes("lesson") &&
    !path.includes("apidocs"),
  pathToPageUrl: (pathInRepo: string) =>
    `https://github.com/sui-foundation/sui-move-intro-course${pathInRepo}`,
  //   handlePage: async (path, content) =>
  //     await handleHtmlDocument(
  //       path,
  //       content,
  //       javaReactiveStreamsHtmlParserOptions
  //     ),
};

export const SuiSource = async () => makeMdOnGithubDataSource(sourceConfig);
