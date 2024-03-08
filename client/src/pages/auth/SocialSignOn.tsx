/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { IoCheckmark } from "react-icons/io5";

const SocialSignOn = () => {
	const [userData, setUserData] = useState<any>({
		email: "",
		id: "",
		image: "",
		name: "",
		provider: "",
	});
	const urls = {
		google: "/google",
		twitter: "/twitter",
		github: "/github",
	};
	const openWindow = (url: string) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const left = window.innerWidth / 2 - 200; // (window width - pop-up width) / 2
		const top = window.innerHeight / 2 - 200;

		url = `/api/auth${url}`;
		window.open(url, "popup", `width=400,height=400,left=${left},top=${top}`);
	};

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const getData = (e: any) => {
			if (e.origin === "http://localhost:5173") {
				setUserData(e.data);
			}
		};
		const channel = new BroadcastChannel("auth");
		channel.addEventListener("message", getData);

		return () => {
			channel.removeEventListener("message", getData);
		};
	}, []);

	return (
		<main className="w-full h-screen bg-slate-200 flex items-center justify-center">
			<div className="w-[460px] h-auto min-h-[70vh] rounded-[5px] flex items-center flex-col p-10 shadow-2xl bg-white">
				<h3 className="font-black text-2xl mb-4">Social Sign Ons</h3>

				{!userData?.id && (
					<div className="flex flex-col items-center justify-center mt-12">
						<button className="w-[250px] bg-green-500 text-white mb-4 rounded-[5px] py-2" onClick={() => openWindow(urls.google)}>
							Sign In With Google
						</button>
						<button className="w-[250px] bg-blue-400 text-white mb-4 rounded-[5px] py-2" onClick={() => openWindow(urls?.twitter as string)}>
							Sign In With Twitter
						</button>
						<button className="w-[250px] bg-black text-white mb-4 rounded-[5px] py-2" onClick={() => openWindow(urls?.github as string)}>
							Sign In With Github
						</button>
					</div>
				)}
				{userData?.id && (
					<>
						<div className="w-24 h-24 flex items-center justify-center bg-green-200 rounded-full mb-10">
							<IoCheckmark className="text-4xl" />
						</div>
						<p className="font-bold text-xl mb-3">Log in was successful</p>
						<p>Logged In as </p>
						<p>
							<span className="font-bold mr-[2px]">Id:</span> {userData?.id}
						</p>
						<p>
							<span className="font-bold mr-[2px]">Provider:</span> {userData?.provider}
						</p>
						<p>
							<span className="font-bold mr-[2px]">Name:</span>
							{userData?.name}
						</p>
						{userData?.email && (
							<p>
								<span className="font-bold mr-[2px]">Email:</span>
								{userData?.email}
							</p>
						)}
					</>
				)}
			</div>
		</main>
	);
};

export default SocialSignOn;
