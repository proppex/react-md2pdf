import markdownToReactPDF from "./markdownToReactPDF";

describe("markdownToReactPDF", () => {
  it("should render a root node with children", () => {
    const markdown = `
      # Heading 1
      ## Heading 2
      ### Heading 3
      Paragraph
    `;
    const result = markdownToReactPDF(markdown);
    expect(result).toBeDefined();
  });

  // it("should render a heading node with style", () => {
  //   const markdown = `
  //     # Heading 1
  //     ## Heading 2
  //     ### Heading 3
  //   `;
  //   const result = markdownToReactPDF(markdown);
  //   const container = render(result);
  //   expect(container).toMatchSnapshot();
  // });

  // it("should render a paragraph node with style", () => {
  //   const markdown = `
  //     Paragraph
  //   `;
  //   const result = markdownToReactPDF(markdown);
  //   const container = render(result);
  //   expect(container).toMatchSnapshot();
  // });

  // it("should render an emphasis node with style", () => {
  //   const markdown = `
  //     *Emphasis*
  //     **Strong**
  //   `;
  //   const result = markdownToReactPDF(markdown);
  //   const container = render(result);
  //   expect(container).toMatchSnapshot();
  // });

  // it("should render an image node with style", () => {
  //   const markdown = `
  //     ![Company Logo](https://example.com/logo.png)
  //   `;
  //   const result = markdownToReactPDF(markdown);
  //   const container = render(result);
  //   expect(container).toMatchSnapshot();
  // });
});
