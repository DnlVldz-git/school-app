import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  white: "#fff",
  black: "#000",
  golden: "#00ace6",
  gray: "#626262",
  lightGray: "#C4C6CF",
  carrot: "#FE724E",
  green: "#00824B",

  goldenTransparent_01: "rgba(0, 172, 230, 0.1)",
  goldenTransparent_03: "rgba(0, 172, 230, 0.3)",
  goldenTransparent_04: "rgba(0, 172, 230, 0.4)",
  goldenTransparent_05: "rgba(0, 172, 230, 0.5)",

  golden_01: "rgba(172, 230, 0.1)",
  golden_03: "rgba( 172, 230, 0.3)",
  golden_04: "rgba( 172, 230, 0.4)",
  golden_05: "rgba( 172, 230, 0.5)",

  transparent: "transparent",
};
export const SIZES = {
  h1: 30,
  h2: 22,

  width,
  height,

  paddingTop: height * 0.12,
};
export const FONTS = {
  H1: {
    fontSize: 32,
  },
  H2: {
    fontSize: 22,
  },
  H6: {
    fontSize: 10,
  },
  P: {
    fontSize: 2,
  },
  Mulish_400Regular: { fontFamily: "Mulish_400Regular" },
  Mulish_600SemiBold: { fontFamily: "Mulish_600SemiBold" },
  Mulish_700Bold: { fontFamily: "Mulish_700Bold" },
};
