import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Model from "../../Components/Model/Model";
import { useDispatch, useSelector } from "react-redux";
import { deleteForItem } from "../../Redux/CartSlice";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../Firebase/FirebaseConfig";


const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  const dispatch = useDispatch();

  const deleteCart = (item) => {
    dispatch(deleteForItem(item));
    toast.success("delete cart")
  }

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cartItems));
},[cartItems])

const [totleAmount, setTotleAmount] = useState(0);

useEffect(()=>{
  let temp = 0;
  cartItems.forEach((cartItem) => {
    temp = temp + parseInt(cartItem.price);
  });
  setTotleAmount(temp)
  console.log(temp)
},[cartItems])

const shipping = parseInt(100)
let granTotle = shipping + totleAmount;


const [name, setName] = useState("")
const [address, setAddress] = useState("")
const [pincode, setPincode] = useState("")
const [phoneNumber, setPhoneNumber] = useState("")

const buyNow = async () => {
  if(name == "" || address == "" || pincode == "" || phoneNumber == ""){
    toast.error("all fields are require");
  }
  const addressInfo = {
    name, 
    address,
    pincode,
    phoneNumber,
    date: new Date().toLocaleDateString(
      "en-us",
      {
        month: "short",
        day: "2-digit",
        year: "2-digit"
      }
    ) 
    }
    var options = {
      key: "rzp_test_hVlpV0V3uQMyvM",
      key_secret: "V0P2W5XDK57UOG4qcouNzHAt",
      amount: parseInt(granTotle * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "AHI GARMENTS",
      description: "for testing purpose",
      handler: function (response) {
          console.log(response)
          toast.success('Payment Successful')
          //  window.location.href = '/cart'
          const paymentId = response.razorpay_payment_id

          const orderInfo = {
            cartItems,
            addressInfo,
            date: new Date().toLocaleDateString(
              "en-us",
              {
                month: "short",
                day: "2-digit",
                year: "2-digit"
              }
            ),
            email: JSON.parse(localStorage.getItem('user')).user.email,
            userid: JSON.parse(localStorage.getItem('user')).user.uid,
            paymentId 
          }
          try {
             const orderRef = collection(fireDB, 'order');
              addDoc(orderRef, orderInfo)
          } catch (error) {
            console.log(error);
          }
      },
  
      theme: {
          color: "#3399cc"
      }
  };
  
  var pay = new window.Razorpay(options);
  pay.open();
  console.log(pay)
}



  return (
    <div className="flex mb-[30%]   flex-wrap h-[80vh]  items-center">

     {cartItems.map((item , index)=>{
      const {title, price, descriptiion, imageUrl} = item;
      return (
        <div key={index} className=" flex flex-wrap mb-10   py-6 px-2 m-10 rounded-md   items-start shadow-[1px_2px_3px_2px_rgba(0,0,0,0.2)]">
        <div className="">
          <img
            className="bg-black   h-[150px] w-full"
            src={imageUrl}
            alt=""
          />
        </div>

        <div className="ml-4">
          <p className="text-black font-bold  text-[23px]">{title}</p>
          {/* <p>decs</p> */}
          <p>{price}</p>
          <button className=" font-bold  ml-16" onClick={()=> deleteCart(item)}>
          <MdDelete size={24} />
        </button>
        </div>

      
      </div>
      )
     })}
      <div className="  rounded-md shadow-[1px_2px_3px_2px_rgba(0,0,0,0.2)] py-4 px-6 flex flex-col ">
        <div className="flex gap-28 ">
          <div className="">
            <p>subtotle</p>
            <p>shipping</p>
            <p className="text-black font-bold mt-3">totle</p>
          </div>
          <div className="">
            <p>{totleAmount}</p>
            <p>{shipping}</p>
            <p className="text-black font-bold mt-3">{granTotle}</p>
          </div>
        </div>
        <Model 
        name={name}
        address={address}
        pincode= {pincode}
        phoneNumber = {phoneNumber}
        setName = {setName}
        setAddress = {setAddress}
        setPincode = {setPincode}
        setPhoneNumber = {setPhoneNumber}
        buyNow = {buyNow}
        />
      </div>
    </div>
  );
};

export default Cart;
