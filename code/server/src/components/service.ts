class Service{
    id: string;
    name: string;
    serviceTime: number;

    constructor(id: string, name: string, serviceTime: number) {
        this.id = id;
        this.name = name;
        this.serviceTime = serviceTime;
    }
}

export { Service }