import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const ShopContext=createContext();

const getDefaultCart=()=>{
    let cart={};
    for(let i=0;i<300+1;++i){
        cart[i]=0;
    }
    return cart;
}

const ShopContextProvider=(props)=>{
    const [all_product,setAll_product]=useState([])
    const [cartItems, setCartItems]=useState(getDefaultCart());

    const fetchData = async() =>{
        await fetch('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>setAll_product(data))

        if(localStorage.getItem('auth-token')){
            // fetch('http://localhost:4000/getcart',{
            //     method:'POST',
            //     headers:{
            //         Accept:'application/form-data',
            //         'auth-token':`${localStorage.getItem('auth-token')}`,
            //         'Content-Type':'application/json',
            //     },
            //     body: JSON.stringify({}),
            // })
            await axios.get('http://localhost:4000/getcart',{
                headers:{
                    // Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
            })
            // .then((res)=>res.json())
            .then((data)=>setCartItems(data))
            .catch(error => console.error('Error fetching cart:', error));
        }
    }
    useEffect(()=>{
         fetchData();
    },[])
    
    const addTocart=async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log("add to  cart",itemId)
        if(localStorage.getItem('auth-token')){
            //  const res=await fetch('http://localhost:4000/addtocart',{
            //     method:'POST',
            //     headers:{
            //         Accept:'application/form-data',
            //         'auth-token':`${localStorage.getItem('auth-token')}`,
            //         'Content-Type':'Application/json',
            //     },
            //     body:JSON.stringify({"itemId":itemId}),
            // })
            // console.log('data',res);
            const res= await axios.post('http://localhost:4000/addTocart',{
                itemId:itemId,
            },{
                method:'POST',
                headers:{
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'Application/json',
                }
            })
            console.log('res',res.data.cart);
            // .then((res=>console.log(res)))
            // .catch(error => console.error('Error adding to cart:', error));
        }
    }
    
    const removeFromcart=async(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            await fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'Application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data))
            .catch((error) => console.error('Error removefromcart:', error));
        }
    }
    
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=all_product.find((product)=>product.id===Number(item))
                totalAmount+=itemInfo.new_price*cartItems[item]
            }
        }
        return  totalAmount;
    }

    const getTotalCartItem=()=>{
        let totalitem=0;
        for(const item in cartItems){
           if(cartItems[item]>0){
             totalitem+=cartItems[item];
           }
        }
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