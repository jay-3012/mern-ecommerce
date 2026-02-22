import { FormHelperText, Paper, Stack, Typography, useMediaQuery, useTheme} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { addToCartAsync,selectCartItems } from '../../cart/CartSlice';
import {motion} from 'framer-motion'

export const ProductCard = ({id,title,price,thumbnail,brand,stockQuantity,handleAddRemoveFromWishlist,isWishlistCard,isAdminCard}) => {


    const navigate=useNavigate()
    const wishlistItems=useSelector(selectWishlistItems)
    const loggedInUser=useSelector(selectLoggedInUser)
    const cartItems=useSelector(selectCartItems)
    const dispatch=useDispatch()
    let isProductAlreadyinWishlist=-1


    const theme=useTheme()
    const is1410=useMediaQuery(theme.breakpoints.down(1410))
    const is932=useMediaQuery(theme.breakpoints.down(932))
    const is752=useMediaQuery(theme.breakpoints.down(752))
    const is500=useMediaQuery(theme.breakpoints.down(500))
    const is608=useMediaQuery(theme.breakpoints.down(608))
    const is488=useMediaQuery(theme.breakpoints.down(488))
    const is408=useMediaQuery(theme.breakpoints.down(408))

    isProductAlreadyinWishlist=wishlistItems.some((item)=>item.product._id===id)

    const isProductAlreadyInCart=cartItems.some((item)=>item.product._id===id)

    const handleAddToCart=async(e)=>{
        e.stopPropagation()
        const data={user:loggedInUser?._id,product:id}
        dispatch(addToCartAsync(data))
    }


  return (
    <>

    {

    isProductAlreadyinWishlist!==-1 ?
    <Stack component={isAdminCard?"":isWishlistCard?"":is408?'':"div"} mt={is408?2:0} p={2} width={is408?'auto':is488?"200px":is608?"240px":is752?"300px":is932?'240px':is1410?'300px':'340px'} sx={{cursor:"pointer", border:"1px solid #EAEAEA", borderRadius:"8px", backgroundColor:"white", transition: "transform 0.2s, box-shadow 0.2s", '&:hover': {transform: 'translateY(-4px)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}} onClick={()=>navigate(`/product-details/${id}`)}>

        {/* image display */}
        <Stack>
            <img width={'100%'} style={{aspectRatio:1/1,objectFit:"contain"}} height={'100%'}  src={thumbnail} alt={`${title} photo unavailable`} />
        </Stack>

        {/* lower section */}
        <Stack flex={2} justifyContent={'flex-end'} spacing={1} rowGap={2}>

            <Stack>
                <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant='body1' fontWeight={500} sx={{color:"#3A5A40"}}>{title}</Typography>
                    {
                    !isAdminCard && 
                    <motion.div whileHover={{scale:1.3,y:-10,zIndex:100}} whileTap={{scale:1}} transition={{duration:.4,type:"spring"}}>
                        <Checkbox onClick={(e)=>e.stopPropagation()} checked={isProductAlreadyinWishlist} onChange={(e)=>handleAddRemoveFromWishlist(e,id)} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:'red'}} />} />
                    </motion.div>
                    }
                </Stack>
                <Typography color={"text.secondary"}>{brand}</Typography>
            </Stack>

            <Stack sx={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Typography fontWeight={600} sx={{color:"#A3B18A"}}>${price}</Typography>
                {
                    !isWishlistCard? isProductAlreadyInCart?
                    'Added to cart'
                    :
                    <motion.button  whileHover={{scale:1.030}} whileTap={{scale:1}} onClick={(e)=>handleAddToCart(e)} style={{padding:"8px 16px",borderRadius:"24px",outline:"none",border:"none",cursor:"pointer",backgroundColor:"#A3B18A",color:"white",fontWeight:500,fontSize:is408?'.9rem':is488?'.7rem':is500?'.8rem':'.9rem'}}>
                        <div style={{display:"flex",alignItems:"center",columnGap:".5rem"}}>
                            <span>Add To Cart</span>
                        </div>
                    </motion.button>
                    :''
                }
                
            </Stack>
            {
                stockQuantity<=20 && (
                    <FormHelperText sx={{fontSize:".9rem"}} error>{stockQuantity===1?"Only 1 stock is left":"Only few are left"}</FormHelperText>
                )
            }
        </Stack>
    </Stack> 
    :''
    
    
    }
    
    </>
  )
}
