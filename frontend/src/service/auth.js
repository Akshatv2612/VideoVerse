import conf from "../conf/conf"

export class AuthService {
    async registerUser(username, fullname, avatar, coverimage, email, password) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('fullname', fullname);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('avatar', avatar);
        formData.append('coverimage', coverimage);

        try {
            const res = await fetch(`${conf.serverUrl}${conf.type}/${conf.version}/users/register`, {
                method: "POST",
                body: formData
            })
            return await res.json()
        } catch (error) {
            console.log('Error::service/auth.js::Error while registering user', error)
        }
    }

    async loginUser(username, email, password) {
        try {
            const res = await fetch(`${conf.serverUrl}${conf.type}/${conf.version}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, email, password})
            })
            return await res.json()
        } catch (error) {
            console.log('Error::service/auth.js::Error while logging in user', error)
        }
    }

    async logoutUser() {
        const response = await fetch(`${conf.serverUrl}${conf.type}/${conf.version}/users/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        return response.json()
    }

    async getCurrentUser(){
        const response = await fetch(`${conf.serverUrl}${conf.type}/${conf.version}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        return response.json()
    }
}

const authService = new AuthService()
export default authService