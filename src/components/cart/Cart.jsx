import React from 'react';
import {
  Button,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeItem } from '../redux/cart/action';
import './Cart.css';

export const Cart = () => {
  const items = useSelector((state) => state.cart.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = React.useState(0);

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  React.useEffect(() => {
    if (items) {
      let item_total_price = 0;
      for (let key = 0; key < items.length; key++) {
        item_total_price += Number(items[key].Price);
      }
      setTotalPrice(item_total_price);
    }
  }, [items]);

  if (items.length === 0) {
    return (
      <Container className="emptycart">
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <img
              src="https://www.seekpng.com/png/detail/117-1170538_404-your-cart-is-empty.png"
              alt=""
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate('/product');
              }}
            >
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
          <ImageList cols={2} rowHeight={200} className="main1">
            {items.map((e) => (
              <ImageListItem key={e.Id}>
                <img src={e.Image} alt={e.Name} style={{ width: '100%', height: '100%' }} />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="main2">
            <Typography variant="h6">Cart Details</Typography>
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

 
