import {getRequest, postRequest} from "@/services/axios.service";

async function signIn(login,password) {
    let res = await postRequest('/authapi/auth/signin', {login:login,password:password}, 'AUTH:signIn')
    if (res.error) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else return {error: 0, status: 200, data: res.data}
}

async function login(login) {
    let res = await getRequest(`/authapi/user/getuser/${login}`, null, 'AUTH:signIn')
    if (res.error) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else return {error: 0, status: 200, data: res.data}
}

export {
    signIn,
    login
}