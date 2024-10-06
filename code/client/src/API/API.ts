const baseURL = "http://localhost:3001/officequeue/"

/** ------------------- Item APIs ------------------------ */

async function addItem(id: string) {
    let response = await fetch(baseURL + "items/" + id, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
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

async function getItem(id: string) {
    const response = await fetch(baseURL + "items/" + id, { credentials: "include" })
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

const API = {
    addItem, getItem
}

export default API