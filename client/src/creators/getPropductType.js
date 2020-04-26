const getProductType = (p) => {
    if(p.tablet) {
        return 'tablet'
    }
    if(p.laptop){
        return 'laptop';
    }
    if(p.monoblock){
        return 'monoblock';
    }
    return null;
}

export default getProductType;
