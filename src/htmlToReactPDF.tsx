import { Text, View, Image } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import DOMPurify from "dompurify";
import React from "react";
import { rehype } from "rehype";
import parse from "rehype-parse";
import * as html from "hast";
import { defaultStyles } from "./styles";

export default function htmlToReactPDF(
  html: string,
  customStyles?: Style
): JSX.Element {
  const styles = { ...defaultStyles, ...customStyles };
  const isRoot = (node: html.Node): node is html.Root =>
    (node as html.Root).children !== undefined &&
    (node as html.Root).type === "root";

  const isElement = (node: html.Node): node is html.Element =>
    (node as html.Element).type === "element";

  const isText = (node: html.Node): node is html.Text =>
    (node as html.Text).type === "text";

  const processRoot = (node: html.Root): JSX.Element => (
    <View key={node.position?.start.offset}>
      {node.children.map((child) => processNode(child))}
    </View>
  );

  const processParagraph = (node: html.Element): JSX.Element => {
    const css = css2JSON(node.properties?.style as string | undefined);
    return (
      <View key={node.position?.start.offset} style={css}>
        {node.children.map((child) => processNode(child))}
      </View>
    );
  };

  const processUnderline = (node: html.Element): JSX.Element => {
    console.log("IN UNDERLINE", node);
    const css = css2JSON(node.properties?.style as string | undefined);
    const underlineStyle = styles.strong;
    return (
      <View
        key={node.position?.start.offset}
        style={{ ...underlineStyle, ...css }}
      >
        {node.children.map((child) => processNode(child))}
      </View>
    );
  };

  const processHeader = (node: html.Element): JSX.Element => {
    console.log("IN HEADER", node);
    const headerStyle =
      node.tagName === "h1"
        ? styles.header_1
        : node.tagName === "h2"
        ? styles.header_2
        : styles.header_3;
    const css = css2JSON(node.properties?.style as string | undefined);
    return (
      <View
        key={node.position?.start.offset}
        style={{ ...headerStyle, ...css }}
      >
        {node.children.map((child) => processNode(child))}
      </View>
    );
  };

  const processImage = (node: html.Element): JSX.Element => {
    const css = css2JSON(node.properties?.style as string | undefined);
    return (
      <Image
        key={node.position?.start.offset}
        src={node.properties?.src as string}
        style={css}
      />
    );
  };

  const processElement = (node: html.Element): JSX.Element => {
    console.log("processing node -", node.tagName);
    if (node.tagName === "u") return processUnderline(node);
    if (node.tagName === "p") return processParagraph(node);
    if (node.tagName === "h1" || node.tagName === "h2" || node.tagName === "h3")
      return processHeader(node);
    if (node.tagName === "img") return processImage(node);

    console.log("UNPARSED ELEMENT", node.tagName, node.properties?.style, node);
    const css = css2JSON(node.properties?.style as string | undefined);
    return (
      <View key={node.position?.start.offset} style={css}>
        {node.children.map((child) => processNode(child))}
      </View>
    );
  };

  const processText = (node: html.Text): JSX.Element => (
    <Text key={node.position?.start.offset}>{node.value}</Text>
  );

  const processNode = (node: html.Node, style?: Style): JSX.Element => {
    console.log("raw nodes to parse", node);
    if (isRoot(node)) return processRoot(node);
    if (isElement(node)) return processElement(node);
    if (isText(node)) return processText(node);
    console.log("UNPARSED NODE", node);
  };

  const tree = rehype().use(parse).parse(DOMPurify.sanitize(html));

  return processNode(tree);
}
function css2JSON(style: string | undefined): any {
  return JSON.parse(
    style
      ? "{" +
          `${style}`
            .split(";") // array "color: red", "text-align: center"
            .filter((s) => s.trim() !== "") // remove empty strings
            .map((s) => s.split(":").map((s) => s.trim())) // array ["color", "red"], ["text-align", "center"]
            .map((s) => [spineCase2CamelCase(s[0]), s[1]]) // array ["color", "red"], ["textAlign", "center"]
            .map((s) => `"${s[0]}": "${s[1]}"`) // array '"color": "red"', '"text-align": "center"'
            .join(",") +
          "}"
      : "{}"
  );
}

function spineCase2CamelCase(spineCase: string): string {
  return spineCase
    .split("-")
    .map((s, i) => (i === 0 ? s : s[0].toUpperCase() + s.slice(1)))
    .join("");
}
