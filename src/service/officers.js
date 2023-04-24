import { authClient } from "./client"

const namespace = 'officers';

const getOfficers = async () => {
    const { data } = await authClient.get(`/${namespace}`, null);

    return data;
};

const getOfficer = async (id) => {
    const { data } = await authClient.get(`/${namespace}/${id}`, null);

    return data;
};

const removeOfficer = async (id) => {
    const { data } = await authClient.delete(`/${namespace}/${id}`, null);

    return data;
};

const createOfficer = async (payload) => {
    const { data } = await authClient.post(`/${namespace}`, payload);

    return data;
};

const editOfficer = async (payload) => {
    const { data } = await authClient.put(`/${namespace}/${payload.id}`, payload);

    return data;
};

export {
    getOfficers,
    getOfficer,
    removeOfficer,
    createOfficer,
    editOfficer
}