import axios from "axios";
import { useEffect, useState } from "react";

import Loading from "./Loading";
import { toast } from "react-toastify";

const RecurringPayments = ({ setType }: { setType: React.Dispatch<React.SetStateAction<string>> }) => {
	// User information
	const [user, setUser] = useState<{ plan: string; customerId: string }>({ plan: "", customerId: "" });
	const [plans, setPlans] = useState("");
	const [loading, setLoading] = useState(true);
	const [fetching, setFetching] = useState(false);

	useEffect(() => {
		(async function () {
			try {
				const promises = [await axios.get("/api/stripe/customer-details"), await axios.get("/api/stripe")];
				const data = await Promise.all(promises);
				setUser(data[0]?.data);
				setPlans(data[1]?.data);

				setLoading(false);
			} catch (e) {
				setLoading(false);
				toast.error("An error occurred while fetching details. Please reload page", { autoClose: 1000 });
				setTimeout(() => {
					setType("");
				}, 1500);
			}
		})();
	}, [setType]);

	const createBillingPortal = async (id: string) => {
		try {
			setFetching(true);
			const { data } = await axios.get(`/api/stripe/create-subscription-session?priceId=${id}`);
			window.location.href = data?.url;
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<div className=" w-full flex items-center flex-col">
			<h3 className="text-xl font-medium mb-5">Recurring Payments</h3>
			{!loading && user?.plan && (
				<>
					<p>Click on a plan to select it</p>
					<div className="w-full mt-7 flex items-center justify-between gap-2">
						<div className={`border-[1px] py-6 shadow-2xl w-full rounded-[5px] flex flex-col items-center justify-center p-4`} onClick={() => createBillingPortal(plans[0])}>
							<h3 className="font-medium">Premium Plan</h3>
							<p className="mb-2 font-light opacity-80">$99.99</p>
							<button
								disabled={fetching}
								className={`${fetching ? "bg-opacity-60" : ""} w-full py-2 ${user?.plan === "premium" ? "bg-green-500" : "bg-blue-500"} rounded-[5px] font-medium text-white`}>
								{user?.plan === "premium" ? "Manage" : "Subscribe"}
							</button>
						</div>
						<div className={`border-[1px] py-6 shadow-2xl w-full rounded-[5px] flex flex-col items-center justify-center p-4`} onClick={() => createBillingPortal(plans[1])}>
							<h3 className="font-medium">Premium Pro Plan</h3>
							<p className="mb-2 font-light opacity-80">$199.99</p>
							<button
								disabled={fetching}
								className={`${fetching ? "bg-opacity-60" : ""} w-full py-2 ${user?.plan === "pro" ? "bg-green-500" : "bg-blue-500"} rounded-[5px] font-medium text-white`}>
								{user?.plan === "pro" ? "Manage" : "Subscribe"}
							</button>
						</div>
					</div>
					<button disabled={fetching} className="w-full flex items-center justify-center mt-6 bg-black font-medium text-white py-2 rounded-[5px]" onClick={() => setType("")}>
						Cancel
					</button>
				</>
			)}

			{loading && (
				<div className="min-h-[35vh] flex items-center justify-center">
					<Loading />
				</div>
			)}
		</div>
	);
};

export default RecurringPayments;
