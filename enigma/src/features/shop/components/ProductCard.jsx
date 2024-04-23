import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { LuSquareDot } from "react-icons/lu";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import {
  addToCartAsync,
  // deleteItemFromCartAsync,
  deleteItemFromProductIdAsync,
  fetchItemsByUserIdAsync,
  // selectCartLoaded,
  // selectCartStatus,
  selectCartItems,
  // updateCartAsync,
} from "../../cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { addToWishlistAsync, deleteWishlistItemFromProductIdAsync, selectWishlistItems } from "../../wishlist/wishlistSlice";

const ProductCard = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // const [addToCart, setAddToCart] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const wishlistItems = useSelector(selectWishlistItems)
  // const status = useSelector(selectCartStatus);
  // const cartLoaded = useSelector(selectCartLoaded);

  const user = useSelector(selectLoggedInUser)

  useEffect(() => {
    if (user) {
      console.log(user);
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user]);

  const handleCart = (e, product) => {
    e.preventDefault();
    if (user) {
      if (cartItems.findIndex((item) => item.productId === product.id) < 0) {
        let newItem = { ...product };
        delete newItem.id;
  
        newItem = {
          ...newItem,
          productId: product.id,
          userId: user.id,
          quantity: 1,
        };
  
        dispatch(addToCartAsync(newItem));
      }
    } else {
      navigate('/login')
    }
  };

  const handleDeleteItemFromCart = (e, product) => {
    e.preventDefault()
    if (user) {
    var res = window.confirm(
      `Do you want to delete "${product.name}" from cart`
    );
    const userId = user.id
    console.log(user.id)
    if (res) {
      dispatch(deleteItemFromProductIdAsync( {userId, productId : product.id} ));
    }
  } else {
    navigate('/login')
  }
  };

  const handleAddToWishlist = (e, product) => {
    e.preventDefault();
    if (user) {
    if (wishlistItems.findIndex((item) => item.productId === product.id) < 0) {
      let newItem = { ...product };
      delete newItem.id;

      newItem = {
        ...newItem,
        productId: product.id,
        userId: user.id,
        quantity: 1,
      };

      dispatch(addToWishlistAsync(newItem));
    }
  } else {
    navigate('/login')
  }
  };

  const handleDeleteItemFromWishlist = (e, product) => {
    e.preventDefault()
    if (user) {
    var res = window.confirm(
      `Do you want to delete "${product.name}" from wishlist`
    );
    const userId = user.id
    console.log(user.id)
    if (res) {
      dispatch(deleteWishlistItemFromProductIdAsync( {userId, productId : product.id} ));
    }
  } else {
    navigate('/login')
  }
  };

  return (
    <Container>
      {products &&
        products.map((product, index) => (
          <div key={product.id} className="card">
            <div>
              {/* <div className="name">{product.name}</div> */}
              <div className="productDetails">
                <Link
                  to={`/shop/${product.shopId}/product/${product.id}`}
                  className="image"
                >
                  <img src={product.productImage} alt="productLogo" />
                </Link>
                <div className="productDetailsRight">
                  <div className="icons">
                    {/* <div className="veg">
                      <GoDotFill size={20} />
                    </div> */}
                    {wishlistItems.findIndex((item) => item.productId === product.id) < 0 && <div
                      className="fav"
                      onClick={(e) => {
                        handleAddToWishlist(e, product);
                      }}
                    >
                      <FaRegHeart size={30} />
                    </div>}
                    {wishlistItems.findIndex((item) => item.productId === product.id) >= 0 && <div
                      className="fav"
                      onClick={(e) => {
                              handleDeleteItemFromWishlist(e, product);
                            }}
                    >
                      <FaHeart size={30} />
                    </div>}
                  </div>
                  <div className="productName">{product.name}</div>
                  <div className="rating">
                    {product.productRating}({product.productRatingCount})
                  </div>
                  <div className="order">
                    <div className="price">{product.price}</div>
                    {cartItems.findIndex((item) => item.productId === product.id) < 0 && <div
                      className="btn"
                      onClick={(e) => {
                        handleCart(e, product);
                      }}
                    >
                      Add to Cart
                    </div>}
                    {cartItems.findIndex((item) => item.productId === product.id) >= 0 && <div
                      className="btn-danger"
                      onClick={(e) => {
                              handleDeleteItemFromCart(e, product);
                            }}
                    >
                      Remove from Cart
                    </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 16px;
  padding: 10px 0;
  justify-items: center;
  align-content: center;
  a {
    text-decoration: none;
    color: #f2e3e3;
  }
  .card {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 0 10px;

    .name {
      background-color: #000000;
      color: #f2e3e3;
      border-radius: 10px 10px 0 0;
    }
  }

  .btn {
    cursor: pointer;
    user-select: none;
    background-color: #6933d3;
    color: #ffffff;
    padding: 6px;
    margin: 3px;
    border-radius: 10px;
    text-align: center;
    span {
      padding: 0 10px;
      text-align: center;
    }
    .addQuantity {
      border-left: 3px solid green;
      border-right: 3px solid green;
    }
  }
  .btn-danger{
      cursor: pointer;
    user-select: none;
    background-color: #dc3545;
    color: #ffffff;
    padding: 6px;
    margin: 3px;
    border-radius: 10px;
    text-align: center;
    }
  .veg {
    border: 3px solid green;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: green;
  }
  .fav {
    color: #e74f4f;
    height: 30px;
    width: 30px;
  }

  .productDetails {
    display: flex;
    flex-direction: row;
    background-color: white;
    color: black;

    .image {
      width: 30%;
      overflow: hidden;
      border-radius: 10px;
      img {
        max-width: 100%;
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        margin: 0 auto;
      }
    }

    .productDetailsRight {
      outline: 1px black solid;
      border-radius: 10px;
      margin-left: 10px;
      width: 70%;
      .icons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px;
      }
      .productName,
      .rating {
        text-align: left;
        margin: 10px;
      }
      .order {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 10px;
      }
    }
  }
`;
export default ProductCard;
