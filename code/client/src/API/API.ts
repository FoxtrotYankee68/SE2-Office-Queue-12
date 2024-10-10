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

const API = {
    getService,
    getServices,
    addService,
    editService,
    deleteService,
}

export default API