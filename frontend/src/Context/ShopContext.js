import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const ShopContext=createContext();

const getDefaultCart=()=>{
    let cart={};
    return cart;
}

const ShopContextProvider=(props)=>{
    const [all_product,setAll_product]=useState([])
    const [cartItems, setCartItems]=useState(getDefaultCart());

    const fetchData = async() =>{
        await fetch('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setAll_product(data)})

        if(localStorage.getItem('auth-token')){
            await axios.get('http://localhost:4000/getcart',{
                headers:{
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },

            })
            .then((res)=>{
                // console.log("cart-data",res.data);
                setCartItems(res.data)})
            .catch(error => console.error('Error fetching cart:', error));
        }
    }
    useEffect(()=>{
        // console.log("hii")
         fetchData();
    },[])
    
    const addTocart=async (item)=>{
        if(localStorage.getItem('auth-token')){
            const res= await axios.post('http://localhost:4000/addtocart',{
                item:item,
            },{
              
                headers:{
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'Application/json',
                }
            })
            // console.log('res',res.data.cart);
            const data=res.data.cart
            setCartItems(data)
            
            // .then((res=>console.log(res)))
            // .catch(error => console.error('Error adding to cart:', error));
        }
    }
    

    const removeFromcart = async (item) => {
        // console.log("item for removing", item);
        if (localStorage.getItem('auth-token')) {
            try {
                const res = await axios.patch('http://localhost:4000/removefromcart',
                    { item }, // This is the data payload
                    {
                        headers: {
                            'auth-token': `${localStorage.getItem('auth-token')}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                // console.log('res after remove', res.data.cart);
                const data = res.data.cart;
                setCartItems(data);
            } catch (error) {
                console.error('Error removefromcart:', error);
            }
        }
    };
    
    
    // const getTotalCartAmount=()=>{
    //     let totalAmount=0;
    //     // for(const item in cartItems){
    //     //     if(cartItems[item]>0){
    //     //         let itemInfo=all_product.find((product)=>product.id===Number(item))
    //     //         totalAmount+=itemInfo?.new_price*cartItems[item]
    //     //     }
    //     // }
    //     return  totalAmount;
    // }
    const getTotalCartAmount = () => {
        if (!cartItems?.items) {
          return 0;
        }
      
        return cartItems.items.reduce((total, product) => {
          return total + (product?.item?.new_price * product?.quantity || 0);
        }, 0);
      };

    const getTotalCartItem=()=>{
        let totalitem=0;
        totalitem=cartItems?.items?.length;
        console.log(totalitem)
        return totalitem;
    }


    const contextValue={getTotalCartItem,getTotalCartAmount, all_product,cartItems,addTocart,removeFromcart};
    


    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}

        </ShopContext.Provider>
    )
}

export default ShopContextProvider;