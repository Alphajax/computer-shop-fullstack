class TabletService {

    getResource = async (url) => {
        const resp = await fetch(url,);
        let body;
        if (resp.ok) {
            body = await resp.json();
        } else {
            body = [
                {
                    url: 'https://static.1k.by/images/products/ip/250/pp5/9/3650141/ic1768bed7.jpg',
                    name: 'Samsung Galaxy Tab S5e 10.5 SM-T725 64Gb\n',
                    price: 1100,
                    ram : 4,
                    memory: 64,
                    screen: 10.5,
                    screenType: 'Super AMOLED',
                    screenResolution: '2560x1600'
                },
            ];
        }
        return body;
    };

    getAll = async () =>{
        return await this.getResource('/tablets');
    }

}
export default TabletService;
