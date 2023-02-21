import * as React from "react";
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import { IconPack, IconProvider } from "@ui-kitten/components";
import { SvgProps } from "react-native-svg";
import { Icons } from "./icons";

const createIcon = (source: ImageSourcePropType): IconProvider<ImageProps> => {
  return {
    toReactElement: (props) => (
      <Image
        style={styles.icon}
        {...props}
        source={source}
        resizeMode="cover"
      />
    ),
  };
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const AssetsIconsPack: IconPack<ImageProps | SvgProps> = {
  name: "assets",
  icons: {
    arrow_circle_left: createIcon(Icons.arrow_circle_left),
    arrow_circle_right: createIcon(Icons.arrow_circle_right),
    caret_left: createIcon(Icons.caret_left),
    caret_right: createIcon(Icons.caret_right),
    arrow_right: createIcon(Icons.arrow_right),
    arrow_left: createIcon(Icons.arrow_left),
    eye: createIcon(Icons.eye),
    eye_close: createIcon(Icons.eye_close),
    headphones: createIcon(Icons.headphones),
    messenger: createIcon(Icons.messenger),
    smiley: createIcon(Icons.smiley),
    gg: createIcon(Icons.gg),
    fb: createIcon(Icons.fb),
    lock: createIcon(Icons.lock),
    user: createIcon(Icons.user),
    envelope: createIcon(Icons.envelope),
    email: createIcon(Icons.email),
    phone: createIcon(Icons.phone),
    xcircle: createIcon(Icons.xcircle),
    refresh: createIcon(Icons.refresh),
    heart: createIcon(Icons.heart),
    chat: createIcon(Icons.chat),
    bookmark: createIcon(Icons.bookmark),
    circles_four: createIcon(Icons.circles_four),
    add_new: createIcon(Icons.add_new),
    search16: createIcon(Icons.search16),
    clock: createIcon(Icons.clock),
    image: createIcon(Icons.image),
    menu: createIcon(Icons.menu),
    message: createIcon(Icons.message),
    notification: createIcon(Icons.notification),
    upload: createIcon(Icons.upload),
    money: createIcon(Icons.money),
    link: createIcon(Icons.link),
    eye_glass: createIcon(Icons.eye_glass),
    bell_ring: createIcon(Icons.bell_ring),
    pencil: createIcon(Icons.pencil),
    search: createIcon(Icons.search),
    house: createIcon(Icons.house),
    star: createIcon(Icons.star),
    phone_out: createIcon(Icons.phone_out),
    music_note: createIcon(Icons.music_note),
    call: createIcon(Icons.call),
    crown: createIcon(Icons.crown),
    global: createIcon(Icons.global),
    moon: createIcon(Icons.moon),
    switch: createIcon(Icons.switch),
    target: createIcon(Icons.target),
    calendar: createIcon(Icons.calendar),
    timer: createIcon(Icons.timer),
    question: createIcon(Icons.question),
    shopping_bag: createIcon(Icons.shopping_bag),
    setting: createIcon(Icons.setting),
    credit_card: createIcon(Icons.credit_card),
    insurance: createIcon(Icons.insurance),
    truck: createIcon(Icons.truck),
    user_plus: createIcon(Icons.user_plus),
    chat_circle: createIcon(Icons.chat_circle),
    twitter: createIcon(Icons.twitter),
    dot_vertical: createIcon(Icons.dot_vertical),
    shape_checked: createIcon(Icons.shape_checked),
    arrow_down: createIcon(Icons.arrow_down),
    shield: createIcon(Icons.shield),
    bandaids: createIcon(Icons.bandaids),
    cake: createIcon(Icons.cake),
    angular: createIcon(Icons.angular),
    medal: createIcon(Icons.medal),
    bird: createIcon(Icons.bird),
    location: createIcon(Icons.location),
    video_camera: createIcon(Icons.video_camera),
    chat_dot: createIcon(Icons.chat_dot),
    headphone: createIcon(Icons.headphone),
    eye_closed: createIcon(Icons.eye_closed),
    download: createIcon(Icons.download),
    plus: createIcon(Icons.plus),
    dot_six: createIcon(Icons.dot_six),
    circles_three: createIcon(Icons.circles_three),
    chart_line: createIcon(Icons.chart_line),
    coins: createIcon(Icons.coins),
    card_holder: createIcon(Icons.card_holder),
    user_circle: createIcon(Icons.user_circle),
    line_up: createIcon(Icons.line_up),
    life: createIcon(Icons.life),
    shopping: createIcon(Icons.shopping),
    education: createIcon(Icons.education),
    entertainment: createIcon(Icons.entertainment),
    browsers: createIcon(Icons.browsers),
    waves: createIcon(Icons.waves),
    grow: createIcon(Icons.grow),
    bag_simple: createIcon(Icons.bag_simple),
    qr_code: createIcon(Icons.qr_code),
    list: createIcon(Icons.list),
    shopping_cart: createIcon(Icons.shopping_cart),
    filter: createIcon(Icons.filter),
    grid: createIcon(Icons.grid),
    rated: createIcon(Icons.rated),
    rate: createIcon(Icons.rate),
    radio_active: createIcon(Icons.radio_active),
  },
};
export default AssetsIconsPack;
