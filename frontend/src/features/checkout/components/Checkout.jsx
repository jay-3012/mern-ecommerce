import { Stack, TextField, Typography ,Button, Menu, MenuItem, Select, Grid, FormControl, Radio, Paper, IconButton, Box, useTheme, useMediaQuery} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import React, { useEffect, useState } from 'react'
import { Cart } from '../../cart/components/Cart'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addAddressAsync, selectAddressStatus, selectAddresses } from '../../address/AddressSlice'
import { selectLoggedInUser } from '../../auth/AuthSlice'
import { Link, useNavigate } from 'react-router-dom'
import { createOrderAsync, selectCurrentOrder, selectOrderStatus } from '../../order/OrderSlice'
import { resetCartByUserIdAsync, selectCartItems } from '../../cart/CartSlice'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SHIPPING, TAXES } from '../../../constants'
import {motion} from 'framer-motion'


export const Checkout = () => {

    const status=''
    const addresses=useSelector(selectAddresses)
    const [selectedAddress,setSelectedAddress]=useState(addresses[0])
    const [selectedPaymentMethod,setSelectedPaymentMethod]=useState('cash')
    const { register, handleSubmit, watch, reset,formState: { errors }} = useForm()
    const dispatch=useDispatch()
    const loggedInUser=useSelector(selectLoggedInUser)
    const addressStatus=useSelector(selectAddressStatus)
    const navigate=useNavigate()
    const cartItems=useSelector(selectCartItems)
    const orderStatus=useSelector(selectOrderStatus)
    const currentOrder=useSelector(selectCurrentOrder)
    const orderTotal=cartItems.reduce((acc,item)=>(item.product.price*item.quantity)+acc,0)
    const theme=useTheme()
    const is900=useMediaQuery(theme.breakpoints.down(900))
    const is480=useMediaQuery(theme.breakpoints.down(480))
    
    useEffect(()=>{
        if(addressStatus==='fulfilled'){
            reset()
        }
        else if(addressStatus==='rejected'){
            alert('Error adding your address')
        }
    },[addressStatus])

    useEffect(()=>{
        if(currentOrder && currentOrder?._id){
            dispatch(resetCartByUserIdAsync(loggedInUser?._id))
            navigate(`/order-success/${currentOrder?._id}`)
        }
    },[currentOrder])
    
    const handleAddAddress=(data)=>{
        const address={...data,user:loggedInUser._id}
        dispatch(addAddressAsync(address))
    }

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleCreateOrder=async()=>{
        const order={user:loggedInUser._id,item:cartItems,address:selectedAddress,paymentMode:selectedPaymentMethod,total:orderTotal+SHIPPING+TAXES}
        
        if (selectedPaymentMethod === 'CARD') {
            const res = await loadRazorpayScript();
            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }

            try {
                // Create order on backend
                const result = await fetch(`${process.env.REACT_APP_BASE_URL}/payment/create-order`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount: order.total }),
                });

                if (!result.ok) {
                    alert("Failed to create order. Please try again.");
                    return;
                }

                const data = await result.json();

                const options = {
                    key: "rzp_test_SJGYXUI1DnpYvE", 
                    amount: data.amount,
                    currency: data.currency,
                    name: "LuxeCart",
                    description: "Payment for order",
                    order_id: data.id,
                    handler: async function (response) {
                        try {
                            const verificationRes = await fetch(`${process.env.REACT_APP_BASE_URL}/payment/verify-payment`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_signature: response.razorpay_signature,
                                }),
                            });

                            if (verificationRes.ok) {
                                dispatch(createOrderAsync(order));
                            } else {
                                alert("Payment verification failed!");
                            }
                        } catch (error) {
                            console.error(error);
                            alert("Payment verification error");
                        }
                    },
                    prefill: {
                        name: loggedInUser?.name || "Customer",
                        email: loggedInUser?.email || "customer@example.com",
                        contact: selectedAddress?.phoneNumber || "9999999999"
                    },
                    theme: {
                        color: "#A3B18A"
                    }
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();

            } catch (error) {
                console.error(error);
                alert("Server error. Please try again.");
            }
            
        } else {
            dispatch(createOrderAsync(order))
        }
    }

  return (
    <Stack flexDirection={'row'} p={2} rowGap={10} justifyContent={'center'} flexWrap={'wrap'} mb={'5rem'} mt={2} columnGap={4} alignItems={'flex-start'}>

        {/* left box */}
        <Stack rowGap={4}>

            {/* heading */}
            <Stack flexDirection={'row'} columnGap={is480?0.3:1} alignItems={'center'}>
                <motion.div  whileHover={{x:-5}}>
                    <IconButton component={Link} to={"/cart"}><ArrowBackIcon fontSize={is480?"medium":'large'}/></IconButton>
                </motion.div>
                <Typography variant='h4'>Shipping Information</Typography>
            </Stack>

            {/* address form */}
            <Stack component={'form'} noValidate rowGap={2} onSubmit={handleSubmit(handleAddAddress)}>
                    <Stack>
                        <Typography  gutterBottom>Type</Typography>
                        <TextField placeholder='Eg. Home, Buisness' {...register("type",{required:true})}/>
                    </Stack>


                    <Stack>
                        <Typography gutterBottom>Street</Typography>
                        <TextField {...register("street",{required:true})}/>
                    </Stack>

                    <Stack>
                        <Typography gutterBottom>Country</Typography>
                        <TextField {...register("country",{required:true})}/>
                    </Stack>

                    <Stack>
                        <Typography  gutterBottom>Phone Number</Typography>
                        <TextField type='number' {...register("phoneNumber",{required:true})}/>
                    </Stack>

                    <Stack flexDirection={'row'}>
                        <Stack width={'100%'}>
                            <Typography gutterBottom>City</Typography>
                            <TextField  {...register("city",{required:true})}/>
                        </Stack>
                        <Stack width={'100%'}>
                            <Typography gutterBottom>State</Typography>
                            <TextField  {...register("state",{required:true})}/>
                        </Stack>
                        <Stack width={'100%'}>
                            <Typography gutterBottom>Postal Code</Typography>
                            <TextField type='number' {...register("postalCode",{required:true})}/>
                        </Stack>
                    </Stack>

                    <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={1}>
                        <LoadingButton loading={status==='pending'} type='submit' variant='contained' sx={{backgroundColor: "#A3B18A", "&:hover":{backgroundColor:"#588157"}}}>Add Address</LoadingButton>
                        <Button color='error' variant='text' onClick={()=>reset()}>Reset</Button>
                    </Stack>
            </Stack>

            {/* existing address */}
            <Stack rowGap={3}>

                <Stack>
                    <Typography variant='h6'>Address</Typography>
                    <Typography variant='body2' color={'text.secondary'}>Choose from existing Addresses</Typography>
                </Stack>

                <Grid container gap={2} width={is900?"auto":'50rem'} justifyContent={'flex-start'} alignContent={'flex-start'}>
                        {
                            addresses.map((address,index)=>(
                                <FormControl item >
                                    <Stack key={address._id} p={is480?2:2} width={is480?'100%':'20rem'} height={is480?'auto':'15rem'}  rowGap={2} component={"div"} sx={{border: selectedAddress===address ? "2px solid #A3B18A": "1px solid #EAEAEA", borderRadius:"8px", backgroundColor:"white", cursor:'pointer', transition:'all 0.2s', '&:hover':{boxShadow:'0 4px 12px rgba(0,0,0,0.05)'}}} onClick={()=>setSelectedAddress(addresses[index])}>

                                        <Stack flexDirection={'row'} alignItems={'center'}>
                                            <Radio checked={selectedAddress===address} name='addressRadioGroup' value={selectedAddress} sx={{color:"#A3B18A", '&.Mui-checked':{color:"#A3B18A"}}} onChange={(e)=>setSelectedAddress(addresses[index])}/>
                                            <Typography fontWeight={500} sx={{color:"#3A5A40"}}>{address.type}</Typography>
                                        </Stack>

                                        {/* details */}
                                        <Stack>
                                            <Typography>{address.street}</Typography>
                                            <Typography>{address.state}, {address.city}, {address.country}, {address.postalCode}</Typography>
                                            <Typography>{address.phoneNumber}</Typography>
                                        </Stack>
                                    </Stack>
                                </FormControl>
                            ))
                        }
                </Grid>

            </Stack>
            
            {/* payment methods */}
            <Stack rowGap={3}>

                    <Stack>
                        <Typography variant='h6'>Payment Methods</Typography>
                        <Typography variant='body2' color={'text.secondary'}>Please select a payment method</Typography>
                    </Stack>
                    
                    <Stack rowGap={2}>

                        <Stack flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                            <Radio value={selectedPaymentMethod} name='paymentMethod' checked={selectedPaymentMethod==='COD'} sx={{color:"#A3B18A", '&.Mui-checked':{color:"#A3B18A"}}} onChange={()=>setSelectedPaymentMethod('COD')}/>
                            <Typography>Cash on Delivery</Typography>
                        </Stack>

                        <Stack flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                            <Radio value={selectedPaymentMethod} name='paymentMethod' checked={selectedPaymentMethod==='CARD'} sx={{color:"#A3B18A", '&.Mui-checked':{color:"#A3B18A"}}} onChange={()=>setSelectedPaymentMethod('CARD')}/>
                            <Typography>Credit/Debit Card</Typography>
                        </Stack>

                    </Stack>


            </Stack>
        </Stack>

        {/* right box */}
        <Stack  width={is900?'100%':'auto'} alignItems={is900?'flex-start':''}>
            <Typography variant='h4'>Order summary</Typography>
            <Cart checkout={true}/>
            <LoadingButton fullWidth loading={orderStatus==='pending'} variant='contained' onClick={handleCreateOrder} size='large' sx={{mt: 2, borderRadius:"24px", backgroundColor: "#A3B18A", "&:hover":{backgroundColor:"#588157"}}}>Pay and order</LoadingButton>
        </Stack>

    </Stack>
  )
}
