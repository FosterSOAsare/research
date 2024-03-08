import { useEffect } from "react";

const SocialSignOn = () => {
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
				console.log(e.data);
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
			<div className="w-[460px] h-[70vh] rounded-[5px] flex items-center flex-col p-10 shadow-2xl bg-white">
				<h3 className="font-black text-2xl mb-24">Social Sign Ons</h3>

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
		</main>
	);
};

export default SocialSignOn;
