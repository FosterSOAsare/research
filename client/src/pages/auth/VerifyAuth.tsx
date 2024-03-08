import { useEffect } from "react";
import axios from "axios";

const VerifyAuth = () => {
	// Get the user's auth

	useEffect(() => {
		(async function () {
			const { data } = await axios.get("/api/auth/verify");
			const channel = new BroadcastChannel("auth");
			channel.postMessage(data);

			window.close();
		})();
	}, []);
	return <div>VerifyAuth</div>;
};

export default VerifyAuth;
