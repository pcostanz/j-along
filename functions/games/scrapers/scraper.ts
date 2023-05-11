export type TScrapeParser = {
  selector: string;
  handler: HTMLRewriterElementContentHandlers;
};

// @TODO: TScrapeParser[] could be a tuple
export const scrape = async (
  url: string,
  parsers: TScrapeParser[]
): Promise<void> => {
  // @TODO: Abstract and wrap for error handling
  // https://www.newline.co/@bespoyasov/how-to-use-fetch-with-typescript--a81ac257
  const response = await fetch(url);
  const rewriter = new HTMLRewriter();

  parsers.reduce((prev, next) => {
    return prev.on(next.selector, next.handler);
  }, rewriter);

  await rewriter.transform(response).text();
};
