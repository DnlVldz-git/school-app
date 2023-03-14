const getIcon = (route: String) => {
  switch (route) {
    case "calendario":
      return "calendar";
    case "primera clase":
      return "bookmark";
    case "mi perfil":
      return "user_circle";
    case "login":
      return "user";
    case "registro":
      return "sign_up";
    default:
      return "house";
  }
};

export default getIcon;
