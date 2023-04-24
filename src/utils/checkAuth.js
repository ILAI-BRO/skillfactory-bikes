import { getToken } from "../service/tokenService";

export const checkAuth = (userData, userStatus) => {
    if(userData && userStatus === 'fulfilled'){
        return true
    }else if(!userData && userStatus === 'pending' && getToken()){
        return true
    }else if(!userData && userStatus === 'rejected'){
        return false
    }else if(!userData && userStatus === 'idle'){
        return false
    }
};