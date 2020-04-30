
const {Router} = require('express');
const jwt = require('jsonwebtoken');
const config = require('config')
const Monoblock = require('../models/Monoblock');
const Tablet = require('../models/Tablet');
const Laptop = require('../models/Laptop')
const Item = require('../models/Item');
const Cart = require('../models/Cart');
const router = Router();

router.post('/add/:id/:type/:amount',async (req, res) => {
    try {
        const userToken = req.headers.authorisation;
        const decoded = jwt.verify(userToken,config.get('jwtSecret'));
        const userId = decoded.userId;
        const productId = req.params.id;
        const amount  = +req.params.amount;
        const type = req.params.type;
        const cartId = await getCartId(userId);

        try{
            const existingItem = await Item.findOne({cartId, productId});

            let existingAmount = existingItem.amount + amount;
            await Item.remove({_id: existingItem._id})

            const updatedItem = new Item({
                cartId,
                type,
                productId,
                amount: existingAmount,
            });
            updatedItem.save();
        } catch (e) {
            const newItem = new Item({
                cartId,
                type,
                productId,
                amount
            })
            await newItem.save();
        }
        return res.status(200).json({message: 'Success'});
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Sorry something wrong' })
    }
})

router.get('/get/:id', async (req,res) => {
   try{
        const cartId = await getCartId(req.params.id);
        const items = await Item.find({cartId});
        const [monoblocks, tablets, laptops] = await createThreeLists(items);
        const fullCart = createFullCart(monoblocks, tablets, laptops);
        res.status(200).json({fullCart});
   } catch (e) {
       console.log(e);
       res.status(500).json({message:'Sorry something wrong'})
   }
});

router.post('/delete/:id', async (req, res) =>{
    const id = req.params.id;
    try {
        const itemToDelete = await Item.findOne({productId: id});
        if(itemToDelete) {
            itemToDelete.remove();
        }
        res.status(200).json({message: 'Successfully deleted'})
    } catch (e) {
        res.status(500).json({message: 'Error during deleting'})
    }


});





const createFullCart = (...args) => {
    let fullPrice = 0;
    let fullArr = [];
    try{
        for (let pta of args){
            fullArr = [...fullArr, ...pta];
        }
        for(let e of fullArr) {
            let price = (e.tablet || e.monoblock || e.laptop).price;
            fullPrice += price*e.amount;
        }
    } catch (e) {}
    return {
        fullArr,
        fullPrice
    };
}

const createThreeLists = async (items) => {
    let monoblocks =[];
    let tablets = [];
    let laptops = [];
    for(let i of items){
       if(i.type === 'tablet'){
           let tablet = await Tablet.findById(i.productId);
           tablets.push({
               itemId: i._id,
               tablet,
               amount : i.amount
           })
       }
        if(i.type === 'monoblock'){
            let monoblock = await Monoblock.findById(i.productId);
            tablets.push({
                itemId: i._id,
                monoblock,
                amount : i.amount
            })
        }
        if(i.type === 'laptop'){
            let laptop = await Laptop.findById(i.productId);
            tablets.push({
                itemId: i._id,
                laptop,
                amount : i.amount
            })
        }
    }
    return [monoblocks, tablets, laptops];
}




const getCartId = async (userId) =>  {
    const cart = await Cart.findOne({userId: userId, isActive: true});
    if(!cart) {
        const newCart = Cart({
            userId:userId,
            isActive: true
        });
        await newCart.save();
    }
    const newCart = await Cart.findOne({userId: userId, isActive: true});
    return newCart._id;
}

module.exports = router;
