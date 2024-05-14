import { Text, View, ViewProps, Image } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import React from "react";
import { remark } from "remark";
import parse from "remark-parse";
import * as md from "mdast";

import { styles } from "./styles";

interface Props extends ViewProps {
  message: string;
}

const Markdown = (props: Props) => {
  return <View>{markdownToReactPDF(props.message)}</View>;
};

export default Markdown;

const markdownToReactPDF = (markdown: string) => {
  const isRoot = (node: md.Node): node is md.Root =>
    (node as md.Root).children !== undefined &&
    (node as md.Root).type === "root";

  const isParent = (node: md.Node): node is md.Parent =>
    (node as md.Parent).children !== undefined;

  const isHeading = (node: md.Node): node is md.Heading =>
    (node as md.Heading).depth !== undefined &&
    (node as md.Heading).type === "heading";

  const isParagraph = (node: md.Node): node is md.Paragraph =>
    (node as md.Paragraph).type === "paragraph";

  const isLiteral = (node: md.Node): node is md.Literal =>
    (node as md.Literal).value !== undefined;

  const isImage = (node: md.Node): node is md.Image =>
    (node as md.Image).type === "image";

  const processNode = (node: md.Node, style?: Style): JSX.Element => {
    // console.log(node);
    if (isParent(node)) {
      if (isRoot(node))
        return (
          <View
            key={node.position?.start.offset}
            style={{ fontFamily: "Times-Roman" }}
          >
            {node.children.map((child) => processNode(child))}
          </View>
        );

      if (isHeading(node)) {
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
      } else if (isParagraph(node)) {
        return (
          <View>
            <Text key={node.position?.start.offset} style={styles.paragraph}>
              {node.children.map((child) => processNode(child, style))}
            </Text>
          </View>
        );
      } else if (node.type === "emphasis") {
        return (
          <Text key={node.position?.start.offset}>
            {node.children.map((child) =>
              processNode(child, { ...styles.strong, ...style })
            )}
          </Text>
        );
      }
    } else if (isLiteral(node)) {
      return (
        <Text key={node.position?.start.offset} style={style}>
          {node.value}
        </Text>
      );
    } else if (isImage(node)) {
      return (
        <Image
          key={node.position?.start.offset}
          style={styles.imageCompanyLogo}
          // src={{
          //   uri: node.url,
          //   method: "GET",
          //   headers: {
          //     Origin: "sdo.gsfc.nasa.gov",
          //   },
          //   body: "",
          // }}
          src={() => fetch(node.url).then((res) => res.blob())}
        />
      );
    }
  };

  const tree = remark().use(parse).parse(markdown);

  const element = processNode(tree);
  console.log(element);
  return element;
};
