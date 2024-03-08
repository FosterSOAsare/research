import { Routes, Route } from "react-router-dom";
import SocialSignOn from "./pages/auth/SocialSignOn";
import VerifyAuth from "./pages/auth/VerifyAuth";

function App() {
	return (
		<div className="">
			<Routes>
				<Route path="/sign-on" element={<SocialSignOn />}></Route>
				<Route path="/verify-auth" element={<VerifyAuth />}></Route>
			</Routes>
		</div>
	);
}

export default App;
