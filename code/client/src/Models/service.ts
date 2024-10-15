class Service{
<<<<<<< HEAD
    id: number;
    name: string;
    serviceTime: number;

    constructor(id: number, name: string = "", serviceTime: number = 0) {
=======
    id: string;
    name: string;
    serviceTime: number;

    constructor(id: string, name: string = "", serviceTime: number = 0) {
>>>>>>> branchStefan
        /* The id of the service */
        this.id = id;

        /* The name of the service */
        this.name = name;

        /* The time the service takes to complete */
        this.serviceTime = serviceTime;
    }
}

export { Service }