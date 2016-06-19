export function json(url,option) {
    return fetch(url,option).then((res)=>{
        if (res.ok){
            return res.json();
        }else {
            throw new Error('fetch data error');
        }
    });
}