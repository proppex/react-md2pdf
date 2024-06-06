"use client";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
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

![Image](http://localhost:3000/image.png)

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget molestie nunc. Morbi ex nunc, accumsan sed tortor eget, iaculis sodales augue. Integer in augue metus. Donec at finibus dui. Vestibulum non elit pellentesque magna tempor sagittis. Aliquam mattis finibus nunc, sed scelerisque massa pretium eu. Sed eget lorem ac nisi scelerisque hendrerit. Aenean pretium consectetur arcu. Duis et varius felis, ut maximus massa. Aenean aliquam nibh vitae imperdiet rhoncus. Quisque ornare velit vehicula, ultricies urna non, dictum ante. Etiam posuere luctus erat nec tristique. Integer sagittis, lacus et auctor molestie, ante neque eleifend sapien, a maximus velit est imperdiet nisi. Curabitur non placerat risus. Aenean et leo nunc.

## This is a subheader

This has a *emphasis* word.

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

const MarkdownDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Markdown md={markdownText} />
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
