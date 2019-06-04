import React from 'react';
import { View, Image } from 'react-native';

export default class AvatarImage extends React.Component {

    render() {
        const uri = this.props.imageUri;
        if (this.props.id == 1)
            return (
                <View style={{ width: 46, height: 46 }}>
                    <Image
                        style={{ width: 46, height: 46, borderRadius: 23 }}
                        source={require("../../../assets/images/rachel.png")}
                        mode="cover"
                    />
                </View>
            );

        return (
            <View style={{ width: 46, height: 46 }}>
                <Image
                    style={{ width: 46, height: 46, borderRadius: 23 }}
                    source={require("../../../assets/images/anonym.jpg")}
                    mode="cover"
                />
            </View>
        );
    }
}