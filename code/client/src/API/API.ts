import {Counter} from "../Models/counter";
import {Service} from "../Models/service";
import {Ticket} from "../Models/ticket";
import {Queue} from "../Models/queue";

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
        return countersJson.map((c: any) => new Counter(c.id, c.name));
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
        return servicesJson.map((s: any) => new Service(s.id, s.name, s.serviceTime));
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
    
}

/** ------------------- Queue APIs ------------------------ */

async function getQueue(serviceId: number, date: Date) {
    const response = await fetch(`${baseURL}queues/${serviceId}/${date}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        const queueJson = await response.json();
        return new Queue(queueJson.serviceId, queueJson.date, queueJson.length);
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function getQueuesByService(serviceId: number) {
    const response = await fetch(`${baseURL}queues/${serviceId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        const queuesJson = await response.json();
        return queuesJson.map((q: any) => new Queue(q.serviceId, q.date, q.length));
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function getQueuesByDate(date: Date) {
    const response = await fetch(`${baseURL}queues/${date}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        const queuesJson = await response.json();
        return queuesJson.map((q: any) => new Queue(q.serviceId, q.date, q.length));
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function getAllQueues() {
    const response = await fetch(`${baseURL}queues`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        const queuesJson = await response.json();
        return queuesJson.map((q: any) => new Queue(q.serviceId, q.date, q.length));
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function addQueue(serviceId: number, date: Date) {
    let response = await fetch(`${baseURL}queues`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({serviceId, date})
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

async function editQueue(serviceId: number, date: Date, length: number) {
    let response = await fetch(`${baseURL}queues/${serviceId}/${date}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({length})
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

async function deleteQueue(serviceId: number, date: Date) {
    const response = await fetch(`${baseURL}queues/${serviceId}/${date}`, {
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

async function deleteAllQueues() {
    const response = await fetch(`${baseURL}queues`, {
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

/** ------------------- Ticket APIs ------------------------ */

async function getTicket(id: number) {
    const response = await fetch(`${baseURL}tickets/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        const ticketJson = await response.json();
        return new Ticket(ticketJson.id, ticketJson.serviceId, ticketJson.counterId, ticketJson.queuePosition, ticketJson.issueDate, ticketJson.served);
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function getAllTickets() {
    const response = await fetch(`${baseURL}tickets`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        const ticketsJson = await response.json();
        return ticketsJson.map((c: any) => new Ticket(c.id, c.serviceId, c.counterId, c.queuePosition, c.issueDate, c.served));
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function addTicket(serviceId: number, date: Date) {
    let response = await fetch(`${baseURL}tickets`, {
        method: 'POST',
        /*credentials: "include",*/
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({serviceId, date})
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

async function editTicket(id: number, serviceId: number, counterId: number, position: number, date: Date, served: boolean) {
    const response = await fetch(`${baseURL}tickets/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({serviceId, counterId, position, date, served})
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

async function deleteTicket(id: number) {
    const response = await fetch(`${baseURL}tickets/${id}`, {
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

async function deleteTickets() {
    const response = await fetch(`${baseURL}tickets`, {
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

async function getNewTicket(serviceId: number) {
    const response = await fetch(`${baseURL}tickets/new`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({serviceId})
    })

    if (response.ok) {
        const ticketJson = await response.json();
        return new Ticket(ticketJson.id, ticketJson.serviceId, ticketJson.counterId, ticketJson.queuePosition, ticketJson.issueDate, ticketJson.served);
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

async function updateTicketCounter(id: number, counterId: number) {
    const response = await fetch(`${baseURL}tickets/updateCounter/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({counterId})
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

async function serveTicket(id: number) {
    const response = await fetch(`${baseURL}tickets/serve/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        }
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

/** ------------------- Waiting Time APIs ------------------------ */

async function getWaitingTime(id: number) {
    console.log(baseURL + "services/waitingtime/" + id)
    const response = await fetch(baseURL + "services/waitingtime/" + id/*, { credentials: "include" }*/)
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

/** ------------------- Full API ------------------------ */

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
    getQueue,
    getQueuesByService,
    getQueuesByDate,
    getAllQueues,
    addQueue,
    editQueue,
    deleteQueue,
    deleteAllQueues,
    getTicket,
    getAllTickets,
    addTicket,
    editTicket,
    deleteTicket,
    deleteTickets,
    getNewTicket,
    updateTicketCounter,
    serveTicket,
    getWaitingTime
}

export default API