import { Dimensions } from "react-native";

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

//devicewidth
export const wp = percentage => {
    const width = deviceWidth;
    return (percentage*width)/100;
}
// deviceheight
export const hp = percentage => {
    const height = deviceHeight;
    return (percentage*height)/100;
}