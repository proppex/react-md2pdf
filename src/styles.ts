import { StyleSheet } from "@react-pdf/renderer";

export const defaultFontMain = 14;
export const defaultInterline = 10;
export const defaultStyles = StyleSheet.create({
  body: {
    marginLeft: 56,
    marginRight: 37,
    marginBottom: 37,
  },
  header_1: {
    fontSize: 22,
    marginBottom: defaultInterline * 1.5,
  },
  header_2: {
    fontSize: 18,
    marginBottom: defaultInterline * 1.2,
  },
  header_3: {
    fontSize: 16,
    marginBottom: defaultInterline,
  },
  paragraph: {
    fontSize: defaultFontMain,
    marginBottom: defaultInterline,
  },
  strong: {
    textDecoration: "underline",
  },
  bold: {
    fontWeight: 700,
    fontStyle: "bold",
  },
  imageCompanyLogo: {
    width: 23,
    height: 23,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
  },
});
