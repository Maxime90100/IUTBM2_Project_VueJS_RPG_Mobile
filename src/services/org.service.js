import {getRequest, patchRequest, postRequest} from "@/services/axios.service";

async function getAllOrgs() {
    let res  = await getRequest('/herocorp/orgs/get', 'ORG:getAllOrgs')
    if (res.error !== 0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else{
        let orgs = []
        res.data.forEach(o => orgs.push(o))
        return {error: 0, status: 200, data: orgs}
    }
}
async function createOrg(name,secret) {
    let res = await postRequest('/herocorp/orgs/create', {name,secret}, 'ORG:createOrg' )
    if(res.error!==0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else return {error:0,status:200,data:`A new Organisation has been created ! [${res.data._id}]`}
}

async function addTeamToOrg(TeamID) {
    let res = await patchRequest(`/herocorp/orgs/addteam`, {idTeam:TeamID} , 'ORG:addTeamToOrg' )
    if(res.error!==0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else return {error:0,status:200,data:`Team[${TeamID}] has been added to Organisation!`}
}

async function removeTeamFromOrg(TeamID) {
    let res = await patchRequest(`/herocorp/orgs/removeteam`, {idTeam:TeamID} , 'ORG:removeTeamFromOrg' )
    if(res.error!==0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else return {error:0,status:200,data:`Team[${TeamID}] has been deleted from Organisation!`}
}


async function getOrgById(id) {
    let res = await getRequest(`/herocorp/orgs/getbyid/${id}`, 'ORG:getOrgById')
    if(res.error!==0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else return {error:0,status:200,data:res.data[0]}
}

export {
    getAllOrgs,
    createOrg,
    addTeamToOrg,
    removeTeamFromOrg,
    getOrgById
}