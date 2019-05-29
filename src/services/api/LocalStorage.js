import { AsyncStorage } from 'react-native';
import store from '../../../store'

const LOCAL_STORAGE_KEY = "SERIALIZED_STATE";

export const persistStateToLocalStorage = async () => {
    const serializedState = JSON.stringify(store.getState());
    await AsyncStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
}