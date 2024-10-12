import { Counter } from "../Models/counter";
import { Service } from "../Models/service";

const baseURL = "http://localhost:3001/officequeue/"

/** ------------------- Service APIs ------------------------ */
async function getService(id: string) {
    const response = await fetch(baseURL + "services/" + id, { credentials: "include" })
    if (response.ok) {
        return await response.json()
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function getServices() {
    const response = await fetch(baseURL + "services/")
    if (response.ok) {
        return await response.json()
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function addService(name: string, serviceTime: number) {
    const response = await fetch(baseURL + "services/", {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            serviceTime: serviceTime
        })
    })
    if (response.ok) {
        return
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function editService(name:string, newName: string, serviceTime: number) {
    const response = await fetch(baseURL + "services/" + name, {
        method: 'PATCH',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            newName: newName,
            serviceTime: serviceTime
        })
    })
    if (response.ok) {
        return
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function deleteService(name: string) {
    const response = await fetch(baseURL + "services/" + name, {
        method: 'DELETE',
        credentials: "include"
    })
    if (response.ok) {
        return
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

/** ------------------- Counter APIs ------------------------ */

async function addCounter(name: string) {
    let response = await fetch(`${baseURL}counters`, {
        method: 'POST',
        /*credentials: "include",*/
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name})
    })
    if (response.ok) {
        return
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function getCounter(id: number) {
    const response = await fetch(`${baseURL}counters/${id}`, { 
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        const counterJson = await response.json();
        return new Counter(counterJson.id, counterJson.name);
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function getAllCounters() {
    const response = await fetch(`${baseURL}counters`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        const countersJson = await response.json();
        const counters = countersJson.map((c: any) => new Counter(c.id, c.name))
        return counters;
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function editCounter(id: number, name: string) {
    const response = await fetch(`${baseURL}counters/${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name})
    })

    if (response.ok) {
        return;
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function deleteCounter(id: number) {
    const response = await fetch(`${baseURL}counters/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (response.ok) {
        return;
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function addCounterService(counterId: number, serviceId: number) {
    const response = await fetch(`${baseURL}counters/${counterId}/services/${serviceId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        return;
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function deleteCounterService(counterId: number, serviceId: number) {
    const response = await fetch(`${baseURL}counters/${counterId}/services/${serviceId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        return;
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function viewAllServicesByCounterToday(counterId: number) {
    const response = await fetch(`${baseURL}counters/${counterId}/services`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        const servicesJson = await response.json();
        const services = servicesJson.map((s: any) => new Service(s.id, s.name, s.serviceTime));
        return services;
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
    
}

const API = {
    getService,
    getServices,
    addService,
    editService,
    deleteService,
    addCounter, 
    getCounter, 
    getAllCounters,
    editCounter, 
    deleteCounter, 
    addCounterService, 
    deleteCounterService, 
    viewAllServicesByCounterToday
}

export default API