"use client";
import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import { Markdown } from "@proppex/react-md2pdf";

import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Times-Roman",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    border: 2,
    borderRadius: 10,
  },
});

const markdownText = `
# This is a header

![Image](http://localhost:3001/image.png)

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget molestie nunc. Morbi ex nunc, accumsan sed tortor eget, iaculis sodales augue. Integer in augue metus. Donec at finibus dui. Vestibulum non elit pellentesque magna tempor sagittis. Aliquam mattis finibus nunc, sed scelerisque massa pretium eu. Sed eget lorem ac nisi scelerisque hendrerit. Aenean pretium consectetur arcu. Duis et varius felis, ut maximus massa. Aenean aliquam nibh vitae imperdiet rhoncus. Quisque ornare velit vehicula, ultricies urna non, dictum ante. Etiam posuere luctus erat nec tristique. Integer sagittis, lacus et auctor molestie, ante neque eleifend sapien, a maximus velit est imperdiet nisi. Curabitur non placerat risus. Aenean et leo nunc.

## This is a subheader

This has a *emphasis* word.

<b>This is all underlined.</b>

This has a **strong** word. (NOT WORKING)

<h1>This is an HTML header</h1>
<p>This is a paragraph.</p>
<p style="color: red;">This is a paragraph with a style.</p>
<p style="text-align: center;">This is a centered paragraph.</p>

<img style="width:50px;height:60px;" src="http://localhost:3000/image.png" />

<span style="color: red;">This is a span.</span>


<p>
Markdown *emphasis* word (expectedly not translated to italic).
</p>
`;

const pureHtmlText = `
<div>
<h1 class="PlaygroundEditorTheme__h1" dir="ltr">
  <span style="white-space: pre-wrap;">Welcome to the playground</span>
</h1>
<blockquote class="PlaygroundEditorTheme__quote" dir="ltr">
  <span style="white-space: pre-wrap;">In case you were wondering what the black box at the bottom is – it's the debug view, showing the current state of the editor. You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting.</span>
</blockquote>
<p class="PlaygroundEditorTheme__paragraph" dir="ltr">
  <s>
    <span class="PlaygroundEditorTheme__textStrikethrough" style="white-space: pre-wrap;">The playground is a demo environment built with @lexical/react. Try typing in some text with different formats.</span>
  </s>
</p>
<p class="PlaygroundEditorTheme__paragraph" dir="ltr">
  <s>
    <span class="PlaygroundEditorTheme__textStrikethrough" style="white-space: pre-wrap;">Make sure to check out the various plugins in the toolbar. You can also use </span>
  </s>
  <s>
    <span class="PlaygroundEditorTheme__textStrikethrough PlaygroundEditorTheme__hashtag" style="white-space: pre-wrap;">#hashtags</span>
  </s>
  <s>
    <span class="PlaygroundEditorTheme__textStrikethrough" style="white-space: pre-wrap;"> or @-mentions too!</span>
  </s>
</p>
<p class="PlaygroundEditorTheme__paragraph" dir="ltr">
  <s>
    <span class="PlaygroundEditorTheme__textStrikethrough" style="white-space: pre-wrap;">If you'd like to find out more about Lexical, you can:</span>
  </s>
</p>
<ul class="PlaygroundEditorTheme__ul">
  <li value="1" class="PlaygroundEditorTheme__listItem">
    <span style="white-space: pre-wrap;">test</span>
  </li>
  <li value="2" class="PlaygroundEditorTheme__listItem">
    <span style="white-space: pre-wrap;">Visit the </span>
    <a href="https://lexical.dev/" class="PlaygroundEditorTheme__link">
      <span style="white-space: pre-wrap;">Lexical website</span>
    </a>
    <span style="white-space: pre-wrap;"> for documentation and more information.</span>
  </li>
  <li value="3" class="PlaygroundEditorTheme__listItem">
    <span style="white-space: pre-wrap;">Check out the code on our </span>
    <a href="https://github.com/facebook/lexical" class="PlaygroundEditorTheme__link">
      <span style="white-space: pre-wrap;">GitHub repository</span>
    </a>
    <span style="white-space: pre-wrap;">.</span>
  </li>
  <li value="4" class="PlaygroundEditorTheme__listItem">
    <span style="white-space: pre-wrap;">Playground code can be found </span>
    <a href="https://github.com/facebook/lexical/tree/main/packages/lexical-playground" class="PlaygroundEditorTheme__link">
      <span style="white-space: pre-wrap;">here</span>
    </a>
    <span style="white-space: pre-wrap;">.</span>
  </li>
  <li value="5" class="PlaygroundEditorTheme__listItem">
    <span style="white-space: pre-wrap;">Join our </span>
    <a href="https://discord.com/invite/KmG4wQnnD9" class="PlaygroundEditorTheme__link">
      <span style="white-space: pre-wrap;">Discord Server</span>
    </a>
    <span style="white-space: pre-wrap;"> and chat with the team.</span>
  </li>
</ul>
<p class="PlaygroundEditorTheme__paragraph" dir="ltr">
  <span style="white-space: pre-wrap;">Lastly, we're constantly adding cool new features to this playground. So make sure you check back here when you next get a chance 🙂.</span>
</p></div>`;

const MarkdownDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Markdown md={pureHtmlText} />
    </Page>
  </Document>
);

export default function App() {
  return (
    <PDFViewer width={500} height={800}>
      <MarkdownDocument />
    </PDFViewer>
  );
}
