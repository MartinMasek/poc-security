// This abstraction autmatically handles passing auth tokens 
// and resolving issues when they are not valid
export class Network {
    static async fetch(input, init = null) {
        const result = await fetch(input, init);
        return result;
    }
}