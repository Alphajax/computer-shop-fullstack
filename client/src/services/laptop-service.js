const data = [

    {
        url: 'https://static.1k.by/images/products/ip/250/pp3/0/3715181/i6c8ea9b55.jpg',
        name: 'ASUS VivoBook 15 X505ZA-BQ037T',
        price: 2132,
        cpu: 'AMD Ryzen 7',
        ram : 12,
        screen: 15.6,
        screenResolution: '1920x1080'
    },

];
class LaptopService {

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
        let res = await this.getResource('/laptops');
        return res;
    }

}

export default LaptopService;

