import React, { createContext, useEffect, useState } from "react";
import { QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
// import { data } from "autoprefixer";
import { fireDB } from '../Firebase/FirebaseConfig'
import { toast } from "react-toastify";
export const Context = createContext();

const ContextApi = (props) => {
const [mode, setMode] = useState('light');
const [loading, setLoading] = useState(false);


const toggalMode = () => {
if(mode === "light"){
    setMode('dark');
    document.body.style.background = 'black';
    document.body.style.color = 'white';
}
else {
    setMode('light');
    document.body.style.background = 'white';
    document.body.style.color = 'black';
}
}

const [products, setProducts] = useState({
  title: null,
  price: null,
  imageUrl: null,
  category: null,
  description: null,
  time: Timestamp.now(),
  date: new Date().toLocaleString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric"
    }
  )
})

 const addProduct = async () => {
  if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
    return toast.error("All fields are require");
  }
  
  try {
    const productRef = collection(fireDB, "products")
     await addDoc(productRef, products);
     getProductData();
     toast.success("Add product successfully");
     setTimeout(() => {
      window.location.href = '/dashboard'
     }, 6000);

  } catch (error) {
    console.log(error)
  }
 }

 const [product, setProduct] = useState([])

 const getProductData = async () => {

  try {
    const q = query (
      collection(fireDB, 'products'),
      orderBy('time')
    );

    const data = onSnapshot(q, (QuerySnapshot) => {
      let productArry = [];
      QuerySnapshot.forEach((doc)=>{
        productArry.push({...doc.data(), id: doc.id})
      })
      setProduct(productArry)
    })
    return () => data;
  } catch (error) {
    console.log(error)
  }
 }

 useEffect(()=>{
   getProductData();
   getOrderData();
   getUserData()
 },[])

 //update product function
 const editHandle = (item)=>{
setProducts(item);
 }

 const updateProduct = async () => {
  try {
    await setDoc(doc(fireDB, "products", products.id), products);
    toast.success("product update Successfuly")
    getProductData()
    setTimeout(() => {
    window.location.href = '/dashboard'
      
    }, 800);
  } catch (error) {
    console.log(error)
  }
 }

 //delete product
 const deleteProduct = async (item) => {
  try {
    await deleteDoc(doc(fireDB, "products", item.id));
    toast.success("product delete successfully")
    getProductData()
  } catch (error) {
    console.log(error)
  }
 }

 const [order, setOrder] = useState([]);

 const getOrderData = async () => {
   setLoading(true)
   try {
     const result = await getDocs(collection(fireDB, "order"))
     const ordersArray = [];
     result.forEach((doc) => {
       ordersArray.push(doc.data());
       setLoading(false)
     });
     setOrder(ordersArray);
     console.log(ordersArray)
     setLoading(false);
   } catch (error) {
     console.log(error)
     setLoading(false)
   }
 }

 
 const [user, setUser] = useState([]);

 const getUserData = async () => {
   setLoading(true)
   try {
     const result = await getDocs(collection(fireDB, "users"))
     const usersArray = [];
     result.forEach((doc) => {
       usersArray.push(doc.data());
       setLoading(false)
     });
     setUser(usersArray);
     console.log(usersArray)
     setLoading(false);
   } catch (error) {
     console.log(error)
     setLoading(false)
   }
 }

 const [searchKey, setSearchKey] = useState('')
 const [filterType, setFilterType] = useState('')
 const [filterPrice, setFilterPrice] = useState('')


  return (
    <Context.Provider
      value={{
        mode,
        toggalMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        editHandle,
        deleteProduct,
        updateProduct,
        order,
        user,
        searchKey,
        setSearchKey,
        filterPrice,
        setFilterPrice,
        setFilterType,
        filterType
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextApi;
