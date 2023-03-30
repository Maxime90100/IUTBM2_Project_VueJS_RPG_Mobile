import {getRequest, patchRequest, postRequest} from "@/services/axios.service";

async function getAllTeams() {
    let res  = await getRequest('/herocorp/teams/get', 'TEAM:getAllTeams')
    if (res.error !== 0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else{
        let teams = []
        res.data.forEach(t => teams.push(t))
        return {error: 0, status: 200, data: teams}
    }
}
async function createTeam(name) {
    let res = await postRequest('/herocorp/teams/create', {name:name}, 'TEAM:createTeam' )
    if(res.error!==0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else return {error:0,status:200,data:`A new Team has been created ! [${res.data._id}]`}
}

async function addHeroesToTeam(HeroesID,TeamID) {
    let res = await patchRequest('/herocorp/teams/addheroes', { idHeroes: HeroesID, idTeam: TeamID}, 'TEAM:addHeroesToTeam' )
    if(res.error!==0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else return {error:0,status:200,data:`Heroes ${HeroesID} have been added to Team[${TeamID}]!`}
}

async function removeHeroesFromTeam(HeroesID,TeamID) {
    let res = await patchRequest('/herocorp/teams/removeheroes', { idHeroes: HeroesID, idTeam: TeamID}, 'TEAM:removeHeroesFromTeam' )
    if(res.error!==0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else return {error:0,status:200,data:`Heroes ${HeroesID} have been deleted from Team[${TeamID}]!`}
}
async function getTeamById(TeamID){
    let res = await getRequest('/herocorp/teams/get', 'TEAM:getAllTeams')
    if(res.error !== 0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else{
        let data =  res.data.filter(t=>{return t._id === TeamID})[0]
        return {error:0,status:200,data:data}
    }
}

export {
    getAllTeams,
    createTeam,
    addHeroesToTeam,
    removeHeroesFromTeam,
    getTeamById
}