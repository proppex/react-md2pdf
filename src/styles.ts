import { StyleSheet } from "@react-pdf/renderer";

export const fontMain = 12;
export const interline = 10;
export const styles = StyleSheet.create({
  header_1: {
    fontSize: 20,
    marginBottom: interline * 1.5,
  },
  header_2: {
    fontSize: 16,
    marginBottom: interline * 1.2,
  },
  header_3: {
    fontSize: 14,
    marginBottom: interline,
  },
  paragraph: {
    fontSize: fontMain,
    fontFamily: "Times-Roman",
    marginBottom: interline,
  },
  strong: {
    fontSize: fontMain,
    textDecoration: "underline",
  },
  imageCompanyLogo: {
    width: 23,
    height: 23,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
  },
});
