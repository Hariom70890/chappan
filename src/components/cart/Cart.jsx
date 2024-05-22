import React from 'react';
import { Button, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeItem, updateQuantity } from '../redux/cart/action';
import './Cart.css';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const Cart = () => {
  const items = useSelector( ( state ) => state.cart.todos );
  console.log(items)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = React.useState(0);

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id, operation) => {
    dispatch(updateQuantity(id, operation));
  };

  React.useEffect(() => {
    if (items) {
      let item_total_price = 0;
      for (let key = 0; key < items.length; key++) {
        item_total_price += Number(items[key].Price) * items[key].Quantity;
      }
      setTotalPrice(item_total_price);
    }
  }, [items]);

  if (items.length === 0) {
    return (
      <Container className="emptycart">
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <img src="https://www.seekpng.com/png/detail/117-1170538_404-your-cart-is-empty.png" alt="" />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => { navigate('/product'); }}>
              Go Shopping
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container className="main">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <div className="cart-items">
            {items.map((e) => (
              <div className="cart-item" key={e.Id}>
                <img src={e.Image} alt={e.Name} />
                <div className="item-details">
                  <h3>{e.Name}</h3>
                  <p>Price: {(e.Price / 100).toFixed(2)} ₹</p>
                  <div className="quantity-controls">
                    <IconButton  color="primary" onClick={() => handleQuantityChange(e.Id, 'decrement')} disabled={e.Quantity === 1}>
                      <RemoveIcon />
                    </IconButton>
                    <span>{e.Quantity}</span>
                    <IconButton color="primary" onClick={() => handleQuantityChange(e.Id, 'increment')}>
                      <AddIcon />
                    </IconButton>
                  </div>
                  <IconButton color="error" onClick={() => handleDelete(e.Id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="cart-summary">
            <Typography variant="h6">Cart Summary</Typography>
            <div>
              <Typography>Total Items in the cart:</Typography>
              <Typography variant="subtitle1">{items.length}</Typography>
            </div>
            <div>
              <Typography>Total Items cost:</Typography>
              <Typography variant="subtitle1">{(totalPrice / 100).toFixed(2)} ₹</Typography>
            </div>
            <div>
              <Typography>Discount:</Typography>
              <Typography variant="subtitle1">20%</Typography>
            </div>
            <div>
              <Typography>GST:</Typography>
              <Typography variant="subtitle1">18%</Typography>
            </div>
            <hr />
            <div>
              <Typography>Total Price:</Typography>
              <Typography variant="subtitle1">
                {((totalPrice / 100) * (80 / 100) * (118 / 100)).toFixed(2)} ₹
              </Typography>
            </div>
            <Button variant="contained" color="primary">
              <Link className="checkdiv" to="/checkout">
                Checkout
              </Link>
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};