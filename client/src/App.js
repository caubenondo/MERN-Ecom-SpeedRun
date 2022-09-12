import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
    Home,
    ProductDetail,
    Cart,
    Login,
    SignUp,
    UserProfile,
    Shipping,
    Payment,
    SubmitOrder,
    OrderDetails,
    AdminUserList
} from "./pages/";

function App() {
    return (
        <Router>
            <Header />
            <main className="py-4">
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/product/:id"
                            element={<ProductDetail />}
                        ></Route>
                        <Route path="/cart/:id" element={<Cart />}></Route>
                        <Route path="/cart" element={<Cart />}></Route>
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<UserProfile />} />
                        <Route path="/shipping" element={<Shipping />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/submitorder" element={<SubmitOrder />} />
                        <Route
                            path="/orders/:id"
                            element={< OrderDetails/>}
                        ></Route>
                        <Route
                            path="/admin/users"
                            element={< AdminUserList/>}
                        ></Route>
                    </Routes>
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
