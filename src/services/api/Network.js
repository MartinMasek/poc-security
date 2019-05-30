import { NetInfo } from 'react-native'

// This abstraction autmatically handles passing auth tokens 
// and resolving issues when they are not valid
export class Network {
    static async fetch(input, init = null) {
        const result = await fetch(input, init);
        return result;
    }

    // TODO: This uses NetInfo which is depricated in the new version
    // we have to switch to linking => no seamless Expo
    static async isDeviceOfflineAsync() {
        // We assume online device when we have depricated version
        if (!NetInfo) return false;
        const info = await NetInfo.getConnectionInfo();
        if (info.type == 'none' || info.type == "unknown") return true;
        return false;
    }
}