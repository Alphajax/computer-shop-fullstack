const getProductFields = (productType) => {
    switch (productType) {
        case 'tablet':
            return ["ram", "memory", "screen", "screenType", "screenResolution" ];
        case 'laptop':
            return [ "cpu", "ram", "screen", "screenResolution" ];
        case 'monoblock':
            return ["cpu", "ram", "screen", "screenResolution"];
        default :
            return [];
    }
}

export default getProductFields;
