import React from 'react';
import { Box, Typography, Avatar, Stack, ButtonGroup, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { IconMinus, IconPlus } from '@tabler/icons';
import { useSelector, useDispatch } from 'src/store/Store';
import emptyCart from 'src/assets/images/products/empty-shopping-bag.gif';
import { increment, decrement } from 'src/store/eCommerce/ECommerceSlice';
import { AppState } from 'src/store/Store';

const CartItems = () => {
  const dispatch = useDispatch();

  // Get Products
  // const Cartproduct = useSelector((state: AppState) => state.ecommerceReducer.cart);

  const Increase = (productId: string) => {
    dispatch(increment(productId));
  };

  const Decrease = (productId: string) => {
    dispatch(decrement(productId));
  };

  return (
    <Box px={3}>
      <Box textAlign="center" mb={3}>
        <img src={emptyCart} alt="cart" width="200px" />
        <Typography variant="h5" mb={2}>
          Cart is Empty
        </Typography>
        <Button component={Link} to="/apps/ecommerce/shop" variant="contained">
          Go back to Shopping
        </Button>
      </Box>
    </Box>
  );
};

export default CartItems;
