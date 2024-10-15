import { Counter } from "../Models/counter";
import { Service } from "../Models/service";
<<<<<<< HEAD
import { Ticket } from "../Models/ticket";
=======
>>>>>>> branchStefan

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
<<<<<<< HEAD
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

async function getWaitingTime(id: number) {
    console.log(baseURL + "services/waitingtime/" + id)
    const response = await fetch(baseURL + "services/waitingtime/" + id/*, { credentials: "include" }*/)
    if (response.ok) {
       
        return await response.json()
=======
>>>>>>> branchStefan
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

<<<<<<< HEAD
/** ------------------- Queue APIs ------------------------ */

/**
 * Makes a POST request to call the next ticket for a specific counter.
 * 
 * @param {number} counterId - The ID of the counter for which to call the next ticket.
 * @returns {Promise<Ticket>} - A Promise that resolves with the next Ticket object if the request is successful.
 * 
 * @throws {Error} - Throws an error if the response is not successful. The error can be custom from the server 
 * (either from `error` or `message` fields in the JSON response), or a generic error if none is provided.
 * 
 * This function performs the following steps:
 * 1. Sends a POST request to the endpoint `/queues/:counterId` to request the next ticket.
 * 2. If the response is successful (HTTP 200), it parses the JSON and creates a new `Ticket` object.
 * 3. If the response is not successful, it throws an error with the specific message or a default error.
*/
async function callNextTicket(counterId: number) {
    const response = await fetch(`${baseURL}queues/${counterId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        const ticketJson = await response.json();
        const ticket = new Ticket(ticketJson.id, ticketJson.position_queue, ticketJson.date_issued, ticketJson.is_served);
        return ticket;
=======
async function deleteService(name: string) {
    const response = await fetch(baseURL + "services/" + name, {
        method: 'DELETE',
        credentials: "include"
    })
    if (response.ok) {
        return
>>>>>>> branchStefan
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
<<<<<<< HEAD
=======
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
>>>>>>> branchStefan
}

/**
 * Sends a POST request to reset all queues.
 * 
 * @returns {Promise<void>} - A Promise that resolves with no value if the reset is successful.
 * 
 * @throws {Error} - Throws an error if the response is not successful. The error can be custom from the server 
 * (either from `error` or `message` fields in the JSON response), or a generic error if none is provided.
 * 
 * This function performs the following steps:
 * 1. Sends a POST request to the endpoint `/queues/reset` to reset all queues.
 * 2. If the response is successful (HTTP 200), the function returns without any value.
 * 3. If the response is not successful, it throws an error with the specific message or a default error.
*/
async function resetQueues() {
    const response = await fetch(`${baseURL}queues/reset`, {
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
    viewAllServicesByCounterToday,
    getWaitingTime,
    callNextTicket,
    resetQueues
}

export default API
