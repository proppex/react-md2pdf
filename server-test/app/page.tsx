"use client";
import { Document, Page, StyleSheet, Font } from "@react-pdf/renderer";
import { Markdown } from "@proppex/react-md2pdf";

import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

Font.register({
  family: "Nunito Sans",
  fonts: [
    {
      src: "/NunitoSansRegular.ttf",
    },
    {
      src: "/NunitoSansBold.ttf",
      fontWeight: 700,
      fontStyle: "bold",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Nunito Sans",
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

<u>This is all underlined.</u> (ONLY WORKS IF SURROUNDED BY P TAG)

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
<p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Greg’s career began in manufacturing. </span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><u><span class="PlaygroundEditorTheme__textUnderline" style="white-space: pre-wrap;">{{Tenant_First_Name}}{{Tenant_Last_Name}} </span></u></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">The </span><b><strong class="PlaygroundEditorTheme__textBold" style="white-space: pre-wrap;">company</strong></b><span style="white-space: pre-wrap;"> he started with focused on using lean manufacturing techniques. Lean manufacturing focuses on eliminating waste and improving process flow when building a product. </span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">One of the people who influenced the creation of lean manufacturing was W. Edwards Deming, a noted statistician and manufacturing consultant. In his book Out of the Crisis, Deming out- lines 14 points for management. One of those points appears at the beginning of this chapter and has resonated with Greg his entire career. Building quality into the product sounds clichéd and has been overused by many marketing departments. But in an agile environment, the concept is real and tangi-ble. Consider the following. {{Tenant_ID_No}} {{Tenant_Email}}</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-indent: 20px;"><span style="white-space: pre-wrap;">One of the people who influenced the creation of lean manufacturing was W. Edwards Deming, a noted statistician and manufacturing consultant. In his book Out of the Crisis, Deming out- lines 14 points for management. {{Tenant_ID_No}} {{Tenant_Email}}</span></p>`;
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
