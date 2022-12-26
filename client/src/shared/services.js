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

async function searchData(searchValue) {
    const url = process.env.REACT_APP_TMDB_API_URL + "/search/movie?api_key=" + process.env.REACT_APP_TMDB_API_KEY + "&language=en-US&query=" + searchValue
    const response = await fetch(url);
    return response;
}

async function getTrending() {
    const url = process.env.REACT_APP_TMDB_API_URL + "/trending/movie/day?api_key=" + process.env.REACT_APP_TMDB_API_KEY
    const response = await fetch(url);
    return response;
}

async function getPopular() {
    const url = process.env.REACT_APP_TMDB_API_URL + "/movie/popular?api_key=" + process.env.REACT_APP_TMDB_API_KEY
    const response = await fetch(url);
    return response;
}

const services = {
    login,
    register,
    logout,
    searchData,
    getTrending,
    getPopular
}

export default services;