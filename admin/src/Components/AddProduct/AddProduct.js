import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/admin_assets/upload_area.svg'

const AddProduct=()=>{

  const [image,setImage]=useState(false)
  const [productDetail,setProductDetail]=useState({
    name:"",
    image:"",
    category:"",
    new_price:"",
    old_price:""
  })

  const imageHandler=(e)=>{
    setImage(e.target.files[0]);

  }


  const changeHandler = (e) => {
    setProductDetail((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }));
  };

  const add_Product = async () => {
    let responseData;
    let product = productDetail;
   const formdata=new FormData();
   formdata.append('product',image);
  //  console.log(formdata)
  
    try {
      // Uploading the image to the server
      const response = await fetch('http://localhost:4000/public', {
        method: 'POST',
        headers: {
          accept: 'application/json',
        },
        body:formdata,
      });
      responseData = await response.json();
  
      if (responseData?.success) {
        if (responseData?.image_url) {
          product.image = responseData.image_url;
          // Sending the updated product details to the server
          await fetch('http://localhost:4000/addproduct', {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
          }).then((res) => res.json()).then((data) => {
            // console.log("Data",data)
            data.success ? alert("Product Added") : alert("Failed");
          });
        } else {
          console.error('Response data does not contain image URL');
        }
      } else {
        console.error('Upload failed:', responseData.message);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };



  




  return (
    <div className='addproduct'>
      <div className='addproduct-itemfield'>
        <p>Product title</p>
        <input 
           value={productDetail.name} 
           onChange={changeHandler} 
           type='text' 
           name='name' 
           placeholder='Type here '/>
      </div>
      <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
        <p>Price</p>
        <input 
          value={productDetail.old_price} 
          onChange={changeHandler} 
          type='text' 
          name='old_price' 
          placeholder='Type here'/> 
        </div>
        <div className='addproduct-itemfield'>
        <p>Offer Price</p>
        <input 
           value={productDetail.new_price} 
           onChange={changeHandler} 
           type='text' 
           name='new_price' 
           placeholder='Type here'/> 
        </div>
      </div>
      <div className='addproduct-itemfield'>
        <p>Product Category</p>
        <select 
           value={productDetail.category} 
           onChange={changeHandler} 
           name='category' 
           className='addproduct-selector'> 
          <option value='women'>Women</option>
          <option value='men'>Men</option>
          <option value='kid'>Kid</option>
        </select>
      </div>
        <div className='addproduct-itemfield'>
            <label htmlFor='file-input'>
              <img src={image?URL.createObjectURL(image):upload_area} alt='' className='addproduct-thumbnail-img'/>
            </label>
            <input 
               onChange={imageHandler} 
               type='file' 
               name='image' 
               id='file-input' hidden/>
        </div>
        <button onClick={()=>{add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct