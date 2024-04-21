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


export const getColumnCount = ()=> {
    if (deviceWidth >= 1024) {
        // desktop
        return 4;        
    }else if (deviceWidth >= 768) {
        // tabelette
        return 3;
    }else {
        // phone
        return 2;
    }
}

export const getImageSize = (height, width)=> {
    if (width>height) {
        //landscape image
        return 250;        
    }else if (width<height) {
        // portrait image
        return 300;
    }else {
        //square image
        return 200;
    }
}