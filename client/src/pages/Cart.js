import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../components/AlertMessage";
import {
    Row,
    Col,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
} from "react-bootstrap";

const Cart = () => {
    const productId = useParams().id;
    let location = useLocation();
    const qty = location.search ? Number(location.search.split("=")[1]) : 1;

    const dispatch = useDispatch();

    const cartItem = useSelector((state) => state.cart);
    const { cartItems } = cartItem;
    // console.log(cartItems)

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const navigate = useNavigate();
    const checkoutHandler = () => {
        navigate("/login?redirect=shipping");
    };
   
    return (
        <Row>
            <Col md={9}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <AlertMessage>
                        Your cart is empty <Link to="/">Go Back</Link>
                    </AlertMessage>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fluid
                                            rounded
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Form>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(
                                                            item.product,
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    )
                                                }
                                            >
                                                {[
                                                    ...Array(
                                                        item.countInStock
                                                    ).keys(),
                                                ].map((x) => (
                                                    <option
                                                        key={x + 1}
                                                        value={x + 1}
                                                    >
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() =>
                                                removeFromCartHandler(
                                                    item.product
                                                )
                                            }
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Subtotal</h2>
                            <h4>
                                (
                                {cartItems.reduce(
                                    (acc, item) => acc + item.qty,
                                    0
                                )}
                                ) items
                            </h4>
                            $
                            {cartItems
                                .reduce(
                                    (acc, item) => acc + item.qty * item.price,
                                    0
                                )
                                .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type="button"
                                className="btn-block"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default Cart;
