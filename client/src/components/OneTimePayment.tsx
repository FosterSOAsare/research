import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const OneTimePayment = ({ setType }: { setType: React.Dispatch<React.SetStateAction<string>> }) => {
	const [amount, setAmount] = useState("");
	const [loading, setLoading] = useState(false);

	const createCheckoutSession = async () => {
		try {
			if (!amount) return;
			setLoading(true);
			if (isNaN(+amount)) {
				toast.error("Please provide a valid amount", { autoClose: 1500 });
			}

			const { data } = await axios.get(`/api/stripe/create-checkout-session?amount=${amount}`);
			toast.success("Payment session created successfully . Redirecting...", { autoClose: 1500 });
			setTimeout(() => {
				setLoading(false);
				window.location.href = data.url;
			}, 1000);
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<>
			<h3 className="text-xl font-medium mb-12">One Time Payment</h3>
			<div className="w-full">
				<label htmlFor="amount" className="font-light opacity-80">
					Enter checkout amount
				</label>
				<input type="text" className="w-full border-[1px]  px-2 py-2 rounded-[5px]" id="amount" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />

				<div className="mt-6">
					<button
						disabled={loading}
						className={`${loading ? "bg-opacity-60" : ""} w-full flex items-center justify-center mb-2 bg-green-600 font-medium py-2 rounded-[5px]`}
						onClick={createCheckoutSession}>
						Proceed
					</button>
					<button disabled={loading} className="w-full flex items-center justify-center mb-2 bg-slate-600 font-medium text-white py-2 rounded-[5px]" onClick={() => setType("")}>
						Cancel
					</button>
				</div>
			</div>
		</>
	);
};

export default OneTimePayment;
