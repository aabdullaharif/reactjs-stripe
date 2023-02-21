import { createContext, useState } from "react";
import { productsArray, getProductData } from "./storeProducts";

export const CartContext = createContext({
    items: [],
    getProductQuantity: ()=>{},
    addOneToCart: ()=>{},
    removeOneFromCart: ()=>{},
    deleteFromCart: ()=>{},
    getTotalCost: ()=>{}
});

export function CartProvider({children}){

    const [cartProducts, setCartProducts] = useState([]);

    function getProductQuantity(id){
        let quantity = cartProducts.find(product=>product.id === id)?.quantity;

        if( quantity === undefined){
            return 0;
        }

        return quantity;
    }

    function addOneToCart(id){
        let quantity = getProductQuantity(id);

        if(quantity === 0){ // if item is not already in cart
            setCartProducts([...cartProducts, {id: id, quantity: 1 }]);
        }else{
            setCartProducts(cartProducts.map(
                product => product.id === id ? {...product, quantity: product.quantity + 1} : product
            ))
        }
    }

    function removeOneFromCart(id){
        let quantity = getProductQuantity(id);

        if(quantity === 1){
            deleteFromCart(id);
        }else{
            setCartProducts(cartProducts.map(
                product => product.id === id ? {...product, quantity: product.quantity -1 } : product
            ))
            
        }
    }

    function deleteFromCart(id){
        setCartProducts(
            cartProducts.filter( product => {
                return product.id !== id 
            })
        )
    }

    function getTotalCost(){
        const totalCosts = cartProducts.map((cartItem) =>{
            const productData = getProductData(cartItem.id);
            return productData.price * cartItem.quantity;
        })

        const totalCost = totalCosts.reduce((acc, cur)=> acc + cur, 0);
        
        return totalCost;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    }

    return(
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;