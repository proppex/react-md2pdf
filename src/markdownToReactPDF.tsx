import { Text, View, Image } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import React from "react";
import { remark } from "remark";
import parse from "remark-parse";
import * as md from "mdast";

import { defaultStyles } from "./styles";
import htmlToReactPDF from "./htmlToReactPDF";

export default function markdownToReactPDF(
  markdown: string,
  customStyles?: Style
) {
  const styles = { ...defaultStyles, ...customStyles };
  const isRoot = (node: md.Node): node is md.Root =>
    (node as md.Root).children !== undefined &&
    (node as md.Root).type === "root";

  const isHeading = (node: md.Node): node is md.Heading =>
    (node as md.Heading).depth !== undefined &&
    (node as md.Heading).type === "heading";

  const isParagraph = (node: md.Node): node is md.Paragraph =>
    (node as md.Paragraph).type === "paragraph";

  const isEmphasis = (node: md.Node): node is md.Emphasis =>
    (node as md.Emphasis).type === "emphasis";

  const isBold = (node: md.Node): node is md.Strong =>
    (node as md.Strong).type === "strong";

  const isHtml = (node: md.Node): node is md.Html =>
    (node as md.Html).type === "html";

  const isLiteral = (node: md.Node): node is md.Literal =>
    (node as md.Literal).value !== undefined;

  const isImage = (node: md.Node): node is md.Image =>
    (node as md.Image).type === "image";

  const processRoot = (node: md.Root): JSX.Element => (
    <View key={node.position?.start.offset}>
      {node.children.map((child) => processNode(child))}
    </View>
  );

  const processHeading = (node: md.Heading, style?: Style): JSX.Element => {
    if (node.depth === 1 || node.depth === 2 || node.depth === 3) {
      const headerStyle =
        node.depth === 1
          ? styles.header_1
          : node.depth === 2
          ? styles.header_2
          : styles.header_3;
      return (
        <View key={node.position?.start.offset}>
          {node.children.map((child: md.Node) =>
            processNode(child, { ...headerStyle, ...style })
          )}
        </View>
      );
    }
    return (
      <View key={node.position?.start.offset}>
        {node.children.map((child: md.Node) =>
          processNode(child, { ...styles.paragraph, ...style })
        )}
      </View>
    );
  };

  const processParagraph = (node: md.Paragraph, style?: Style): JSX.Element => (
    <View>
      <Text key={node.position?.start.offset} style={styles.paragraph}>
        {node.children.map((child) => processNode(child, style))}
      </Text>
    </View>
  );

  const processHtml = (node: md.Html, style?: Style): JSX.Element =>
    htmlToReactPDF(node.value, style);

  const processEmphasis = (node: md.Emphasis, style?: Style): JSX.Element => (
    <Text key={node.position?.start.offset}>
      {node.children.map((child) =>
        processNode(child, { ...styles.strong, ...style })
      )}
    </Text>
  );

  const processBold = (node: md.Strong, style?: Style): JSX.Element => (
    <Text key={node.position?.start.offset}>
      {node.children.map((child) =>
        processNode(child, { ...styles.bold, ...style })
      )}
    </Text>
  );

  const processLiteral = (node: md.Literal, style?: Style): JSX.Element => (
    <Text key={node.position?.start.offset} style={style}>
      {node.value}
    </Text>
  );

  const processImage = (node: md.Image, style?: Style): JSX.Element => (
    <Image
      key={node.position?.start.offset}
      style={styles.imageCompanyLogo}
      src={node.url}
    />
  );

  const processNode = (node: md.Node, style?: Style): JSX.Element => {
    // console.log(node);
    if (isRoot(node)) return processRoot(node);
    if (isHeading(node)) return processHeading(node, style);
    if (isParagraph(node)) return processParagraph(node, style);
    if (isHtml(node)) return processHtml(node, style);
    if (isEmphasis(node)) return processEmphasis(node, style);
    if (isBold(node)) return processBold(node, style);

    if (isLiteral(node)) return processLiteral(node, style);
    if (isImage(node)) return processImage(node, style);
  };

  const tree = remark().use(parse).parse(markdown);

  return processNode(tree);
}
