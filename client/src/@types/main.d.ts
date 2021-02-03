interface WoSensorTH {
    id: string;
    address: string;
    rssi: number;
    serviceData: {
        model: string;
        modelName: string;
        temperature: {
            c: number;
            f: number;
        }
        humidity: number;
        fahrenheit: boolean;
        battery: number;
    }
}

interface Device {
    nickname: string;
}

interface DeviceState {
    status: string;
}