import axios from 'axios';

const BASE_URL = "https://bank-storage.herokuapp.com/api/banks";

 async function fetch (fetchType, body=null, id=null) {
    const fetchTypes = {
        allBanks: BASE_URL,
        delete: {
            method: "post",
            url: `${BASE_URL}/${id}/delete`,
        },
        addBank: {
            method: "post",
            url: BASE_URL,
            data: body
        },
        editBank: {
            method: "put",
            url: `${BASE_URL}/${id}`,
            data: body
        },
        getBank: {
            url: `${BASE_URL}/${id}`
        },
    };

     const data = await axios(fetchTypes[fetchType]);

    return data;
};

export default fetch;