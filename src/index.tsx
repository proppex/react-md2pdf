import { Styles, View, ViewProps } from "@react-pdf/renderer";
import React from "react";

import markdownToReactPDF from "./markdownToReactPDF";

interface Props extends ViewProps {
  md: string;
  styles?: Styles;
}

/**
 * Renders a Markdown message as a React PDF component.
 *
 * @param props - The component props.
 * @returns The rendered React PDF component.
 */
export function Markdown(props: Props) {
  return <View>{markdownToReactPDF(props.md)}</View>;
}
