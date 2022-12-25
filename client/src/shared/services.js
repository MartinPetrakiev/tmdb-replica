async function register(data) {
    const response = await fetch(`${process.env.REACT_APP_USER_API_URL}/register`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

async function login(data) {
    const response = await fetch(`${process.env.REACT_APP_USER_API_URL}/login`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

function logout() {

}

const services = {
    login,
    register,
    logout,
}

export default services;