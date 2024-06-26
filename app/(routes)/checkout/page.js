'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import '@/app/globals.css'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import { CartUpdateContext } from '@/app/_context/CartUpdateContext'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const Checkout = () => {
  const [Name, setName] = useState()
  const [Address, setAddress] = useState()
  const [Phone, setPhone] = useState()
  const [Zip, setZip] = useState()
  const { user, isSignedIn } = useUser()
  const [cart, setCart] = useState([])
  const { UpdateCart, setUpdateCart } = useContext(CartUpdateContext)
  const [isComplete, setIsComplete] = useState(false)
  const [Total, setTotal] = useState(0)
  const cartRef = useRef([]);
  const nameRef = useRef([]);
  const addressRef = useRef([]);
  const phoneRef = useRef([]);
  const zipRef = useRef([]);
  const emailRef = useRef([]);
  const totalRef = useRef([]);
  const router = useRouter()


  useEffect(() => {
    GetUserCartItem()

  }, [user, UpdateCart])


  useEffect(() => {
    setUpdateCart(!UpdateCart);
  }, [isComplete])




  const GetUserCartItem = async () => {
    try {
      const res = await GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress);
      console.log(res);
      setCart(res?.userCarts);
    } catch (error) {
      console.error('Error fetching user cart items:', error);
    }
  };

  useEffect(() => {
    // Initialize cartRef with fetched cart data
    cartRef.current = cart;
    nameRef.current = Name;
    addressRef.current = Address;
    phoneRef.current = Phone;
    zipRef.current = Zip;
    emailRef.current = user?.primaryEmailAddress?.emailAddress;
  }, [cart, Name, Phone, Address, Zip, user]);


  const subTotal = async (cart) => {
    let total = 20;
    if (cart && cart.length > 0) {
      for (const item of cart) {
        total += item.price;
      }
    }
    const calculatedTotal = parseFloat(total.toFixed(2));
    setTotal(calculatedTotal);
    // console.log('Updated state total:', Total, 'Calculated total:', total);
  };


  useEffect(() => {
    subTotal(cart)
  }, [cart])





  const getTotal = () => {
    let total = 0;
    cart?.forEach(item => {
      total = item?.price + total
    })

    return total.toFixed(2)
  }

  const getTotalWithFees = () => {
    const total = parseFloat(getTotal())
    const delivery = 5
    const taxesAndFees = 15
    totalRef.current = (total + 20).toFixed(2)
    return (total + delivery + taxesAndFees).toFixed(2)
  }



  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const UploadOrderDetails = async () => {
    console.log('Starting order upload...');

    try {
      if (cartRef.current.length === 0) {
        console.log('Cart is empty, nothing to upload.');
        return;
      }

      for (const item of cartRef.current) {
        console.log('Uploading item:', item);
        const data = {
          userName: nameRef.current,
          address: addressRef.current,
          zip: zipRef.current,
          email: emailRef.current,
          phone: phoneRef.current,
          ItemImageUrl: item?.productImage,
          itemName: item?.productName,
          price: item?.price,
          restroName: item?.restaurant?.name
        };

        try {
          const uploadRes = await GlobalApi.UploadOrder(data);
          console.log('Order upload response:', uploadRes);
          await RemoveItem(item?.id);
          await delay(500); // Delay for 500ms between each request to avoid hitting rate limits
        } catch (error) {
          console.error('Error uploading order:', error);
        }
      }

      setIsComplete(!isComplete);
      console.log('Order upload complete.');

      await delay(10000)
      toast('Payment Successfully')
      await delay(5000)
      toast('Order placed Successfully')
      await delay(1000)
      router.back()
      setUpdateCart(!UpdateCart);

    } catch (error) {
      console.error('Error fetching user cart items:', error);
    }
  };

  const RemoveItem = async (id) => {
    console.log('Removing item with id:', id);
    try {
      const res = await GlobalApi.RemoveConnection(id);
      console.log('Remove connection response:', res);
      if (res) {
        const resp = await GlobalApi.DeleteCartItem(id);
        console.log('Delete cart item response:', resp);
        await delay(500); // Optional: Delay between removal and next action
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };





  return (
    <div className='mt-20 w-full'>
      <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 '>
        <div className='col-span-2 flex flex-col justify-center items-center order-2 md:order-1 lg:order-1'>
          <form className='w-[90%] flex flex-col justify-center items-center p-6 gap-10'>
            <input type="text" name="name" id="name" placeholder='Enter Your Full Name' className='w-full h-[50px] text-center rounded-lg outline-none border-2 border-orange-500 hover:border-orange-700' onChange={(e) => setName(e.target.value)} />
            <input type="text" name="address" id="address" placeholder='Enter Your Address' className='w-full h-[50px] text-center rounded-lg outline-none border-2 border-orange-500 hover:border-orange-700' onChange={(e) => setAddress(e.target.value)} />

            <div className='flex justify-center items-center gap-4 w-full'>
              <input type="number" name="phone" id="phone" placeholder='Phone Number' className='w-full h-[50px] text-center rounded-lg outline-none border-2 border-orange-500 hover:border-orange-700' onChange={(e) => setPhone(e.target.value)} />
              <input type="number" name="zip" id="zip" placeholder='Zip Code' className='w-full h-[50px] text-center rounded-lg outline-none border-2 border-orange-500 hover:border-orange-700' onChange={(e) => setZip(e.target.value)} />
            </div>

            {/* <button className='w-full h-[50px] text-center rounded-lg outline-none bg-orange-500 hover:bg-orange-700 text-white font-bold tracking-wider' type='submit'>Make Payment</button> */}
            <div className='w-full justify-center items-center '>
              <div className='m-auto max-w-[750px]'>
                <PayPalButtons className='max-w-[750px]' style={{ layout: "horizontal" }} disabled={!(Name && Address && Phone && Zip)}
                  onApprove={async (data, actions) => {
                    console.log('Order approved by PayPal')
                    await UploadOrderDetails()
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: totalRef.current,
                            currency_code: 'USD'
                          }
                        }
                      ]
                    })
                  }}
                />
              </div>
            </div>

          </form>
        </div>


        <div className='order-1 md:order-2 lg:order-2 flex justify-center items-center col-span-2 md:col-span-1 lg:col-span-1'>
          <div className='w-[80%] border-2 shadow-xl rounded-lg flex flex-col justify-between items-center gap-2'>
            <div className='text-center w-full bg-slate-300 py-3 font-bold mb-2 rounded-t-lg'>Total Items: {cart?.length}</div>
            <div className='flex justify-between items-center w-[70%] my-3 font-semibold'>
              <span>Subtotal:</span>
              <span>₹{getTotal()}</span>
            </div>
            <hr className='border-slate-800 w-[80%]' />
            <div className='flex justify-between items-center w-[70%] my-3'>
              <div >Delivery:</div>
              <div >₹5</div>
            </div>
            <div className='flex justify-between items-center w-[70%] my-3'>
              <div>Taxes and Other Fees:</div>
              <div>₹15</div>
            </div>
            <hr className='border-slate-800 w-[80%]' />
            <div className='flex justify-between items-center w-[70%] my-5 font-semibold'>
              <div>Total:</div>
              <div>₹{getTotalWithFees()}</div>
            </div>


          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout
