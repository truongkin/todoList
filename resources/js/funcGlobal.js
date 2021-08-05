export const funcGlobal = {
    formatMess: data => {
        const err = data;
        let mess = "";
        if(typeof err == 'string') return data;
        for (const property in err) {
            mess += err[property] + "<br>";
        }
        return mess;
    },
};