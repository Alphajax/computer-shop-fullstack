const data = [
    {
        url: 'https://static.1k.by/images/products/ip/250/ppd/0/3580907/i7a63c5529.jpeg',
        name: 'Apple iMac 27" Retina 5K (MRR12)',
        price: 5790,
        cpu: 'Intel Core i5',
        ram : 8,
        screen: 27,
        screenResolution: '5120x2880'
    },

];
class MonoblockService {

    getResource = async (url) => {
        const resp = await fetch(url);
        let body;
        if (resp.ok) {
            body = await resp.json();
        } else {
            body = data;
        }
        return body;
    };
    getAll = async () =>{
        let res = await this.getResource('/monoblocks');
        return res;
    }

}

export default MonoblockService;
