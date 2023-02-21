const getIcon = (route: String) => {
  switch (route) {
    case "home":
      return "house";
    case "settings":
      return "chart_line";
    default:
      return "house";
  }
};

export default getIcon;
