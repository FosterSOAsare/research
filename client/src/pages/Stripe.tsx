/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import OneTimePayment from "../components/OneTimePayment";
import RecurringPayments from "../components/RecurringPayments";

const Stripe = () => {
	const [type, setType] = useState("");
	return (
		<main className="w-full h-screen bg-blue-50 flex items-center justify-center">
			<div className="w-[460px] h-auto min-h-[70vh] rounded-[5px] flex items-center flex-col p-10 shadow-2xl bg-white">
				<h3 className="font-black text-2xl">Stripe Integration</h3>
				{type === "" && (
					<>
						<p className="text-center opacity-80">This contains stripe integrations, select one to continue</p>
						<div className="flex items-center justify-center flex-col mt-24">
							<button className="w-[250px] bg-blue-400 text-white mb-4 rounded-[5px] py-2" onClick={() => setType("once")}>
								One Time Payment
							</button>
							<button className="w-[250px] bg-black text-white mb-4 rounded-[5px] py-2" onClick={() => setType("recur")}>
								Subscription
							</button>
						</div>
					</>
				)}

				{type === "once" && <OneTimePayment setType={setType} />}
				{type === "recur" && <RecurringPayments setType={setType} />}
			</div>
		</main>
	);
};

export default Stripe;
