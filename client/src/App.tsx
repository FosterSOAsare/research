import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import SocialSignOn from "./pages/auth/SocialSignOn";
import VerifyAuth from "./pages/auth/VerifyAuth";
import Stripe from "./pages/Stripe";
import StripeSuccess from "./pages/StripeSuccess";

function App() {
	return (
		<div className="">
			<Routes>
				<Route path="/sign-on" element={<SocialSignOn />}></Route>
				<Route path="/verify-auth" element={<VerifyAuth />}></Route>
				<Route path="/stripe" element={<Stripe />}></Route>
				<Route path="/stripe/success" element={<StripeSuccess />}></Route>
			</Routes>
			<ToastContainer />
		</div>
	);
}

export default App;
