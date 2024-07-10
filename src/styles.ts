import { StyleSheet } from "@react-pdf/renderer";

export const defaultFontMain = 12;
export const defaultInterline = 10;
export const defaultStyles = StyleSheet.create({
  header_1: {
    fontSize: 20,
    marginBottom: defaultInterline * 1.5,
  },
  header_2: {
    fontSize: 16,
    marginBottom: defaultInterline * 1.2,
  },
  header_3: {
    fontSize: 14,
    marginBottom: defaultInterline,
  },
  paragraph: {
    fontSize: defaultFontMain,
    fontFamily: "Nunito Sans",
    marginBottom: defaultInterline,
  },
  strong: {
    textDecoration: "underline",
  },
  bold: {
    fontFamily: "Nunito Sans",
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
