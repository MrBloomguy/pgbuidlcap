import React from "react";
import { Button, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

// Grants ecosystems organized by L1s, L2s, and infrastructure
const networksList = [
	// Layer 1 Ecosystems
	{
		icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
		label: "Ethereum ESP",
		type: "L1",
		color: "text-blue-500",
		desc: "Ecosystem Support Program & Protocol Guild"
	},
	{
		icon: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png",
		label: "W3F Grants",
		type: "L1",
		color: "text-pink-600",
		desc: "Web3 Foundation Open Grants Program"
	},
	{
		icon: "https://assets.coingecko.com/coins/images/10365/small/near.jpg",
		label: "NEAR DabDAO",
		type: "L1",
		color: "text-black dark:text-white",
		desc: "DevDAO & Proximity Labs Grants"
	},
	// Layer 2 Solutions
	{
		icon: "https://assets.coingecko.com/coins/images/25244/small/Optimism.png",
		label: "RetroPGF",
		type: "L2",
		color: "text-red-500",
		desc: "Optimism Collective RetroPGF Rounds"
	},
	{
		icon: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg",
		label: "Arbitrum Grants",
		type: "L2",
		color: "text-blue-400",
		desc: "Arbitrum Foundation Grants Program"
	},
	{
		icon: "https://assets.coingecko.com/coins/images/31891/small/base.png",
		label: "Base ESG",
		type: "L2",
		color: "text-blue-600",
		desc: "Base Ecosystem Support Grants"
	},
	{
		icon: "https://assets.coingecko.com/coins/images/25459/small/270.png",
		label: "zkSync GG",
		type: "L2",
		color: "text-blue-300",
		desc: "zkSync Grants for Greatness"
	},
	{
		icon: "https://assets.coingecko.com/coins/images/11090/small/icon-white.png",
		label: "OnlyDust",
		type: "L2",
		color: "text-gray-600",
		desc: "Starknet Ecosystem Grants via OnlyDust"
	},
	// Specialized L2s & Application Chains
	{
		icon: "https://assets.coingecko.com/coins/images/17233/small/immutableX-symbol-BLK-RGB.png",
		label: "Immutable Grants",
		type: "L2",
		color: "text-pink-600",
		desc: "Developer & Ecosystem Grants Program"
	},
	{
		icon: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
		label: "Polygon Village",
		type: "L2",
		color: "text-purple-600",
		desc: "PolygonDAO Ecosystem Funding"
	},
	// Infrastructure & Tools
	{
		icon: "https://assets.coingecko.com/coins/images/13397/small/Graph_Token.png",
		label: "Graph Grants",
		type: "Infrastructure",
		color: "text-pink-500",
		desc: "The Graph Grants Program (TGP)"
	},
	{
		icon: "https://assets.coingecko.com/coins/images/11085/small/hexagon.png",
		label: "Chainlink SCALE",
		type: "Infrastructure",
		color: "text-blue-400",
		desc: "Sustainable Chainlink Access for Layer 1/2"
	},
	// Emerging L1s
	{
		icon: "https://assets.coingecko.com/coins/images/28205/small/Sui.png",
		label: "Sui Builder House",
		type: "L1",
		color: "text-cyan-500",
		desc: "Sui Foundation Builder Grants"
	},
	{
		icon: "https://assets.coingecko.com/coins/images/24383/small/aptos_logo.jpg",
		label: "Aptos Grant Wave",
		type: "L1",
		color: "text-indigo-500",
		desc: "Aptos Foundation Grant Waves"
	},
	// Major Public Goods Programs
	{
		icon: "https://assets.coingecko.com/coins/images/11022/small/gitcoin.png",
		label: "Gitcoin Grants",
		type: "Public Goods",
		color: "text-purple-500",
		desc: "Quadratic Funding for Public Goods"
	},
	{
		icon: "https://assets.coingecko.com/coins/images/24488/small/gno.png",
		label: "GG18 Program",
		type: "Public Goods",
		color: "text-orange-500",
		desc: "Gnosis Guild Public Goods"
	},
	{
		icon: "https://assets.coingecko.com/coins/images/13469/small/1inch-token.png",
		label: "1inch DAO",
		type: "Public Goods",
		color: "text-blue-500",
		desc: "1inch Foundation Grants Program"
	},
	{
		icon: "https://assets.coingecko.com/coins/images/15628/small/JM4_vxXm_400x400.png",
		label: "Aave Grants",
		type: "Public Goods",
		color: "text-purple-400",
		desc: "Aave Grants DAO (AGD)"
	},
	{
		icon: "https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png",
		label: "Uniswap Grants",
		type: "Public Goods",
		color: "text-pink-500",
		desc: "Uniswap Foundation Grants"
	},
];

export const Sidebar = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) => {
	const [visibleNetworks, setVisibleNetworks] = React.useState(5);
	const [isLoadingMore, setIsLoadingMore] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [isSearchOpen, setIsSearchOpen] = React.useState(false);

	const loadMoreNetworks = () => {
		setIsLoadingMore(true);
		setTimeout(() => {
			setVisibleNetworks((prev) => Math.min(prev + 5, filteredNetworks.length));
			setIsLoadingMore(false);
		}, 500);
	};

	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		e.currentTarget.src = "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/generic.png";
	};

	const filteredNetworks = React.useMemo(() => {
		return networksList.filter(network => 
			network.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
			network.desc.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [searchQuery]);

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const bottom =
			e.currentTarget.scrollHeight -
				e.currentTarget.scrollTop ===
			e.currentTarget.clientHeight;
		if (bottom && !isLoadingMore) {
			loadMoreNetworks();
		}
	};

	const handleNavigation = (route: string) => {
		const event = new CustomEvent("mobileNavChange", {
			detail: { tab: route.toLowerCase() },
		});
		window.dispatchEvent(event);
	};

	const NetworksSection = () => {
		return (
			<div className="space-y-4">
				{isSearchOpen && (
					<div className="relative mb-2">
						<input
							type="text"
							placeholder="Search grant programs..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full h-7 px-2 text-xs border rounded-sm focus:outline-none focus:ring-1 focus:ring-default-400 bg-default-100"
						/>
					</div>
				)}
				<div className="overflow-y-auto">
					{filteredNetworks
						.slice(0, visibleNetworks)
						.map((network, index) => (
							<Button
								key={index}
								variant="light"
								className="w-full justify-start text-xs h-8 px-2 hover:bg-default-100 mb-[2px]"
							>
								<div className="flex items-center w-full gap-2">
									<img
										src={network.icon}
										alt={network.label}
										className="w-4 h-4 rounded-full"
										loading="lazy"
										onError={handleImageError}
									/>
									<span className={`font-medium truncate ${network.color}`}>
										{network.label}
									</span>
								</div>
							</Button>
						))}

					{visibleNetworks < filteredNetworks.length && (
						<Button
							variant="light"
							className="w-full justify-center text-xs h-8 px-2 hover:bg-default-100 text-default-500"
							onClick={loadMoreNetworks}
							disabled={isLoadingMore}
							startContent={isLoadingMore && 
								<Icon
									icon="eos-icons:loading"
									className="w-3 h-3 animate-spin"
								/>
							}
						>
							{isLoadingMore ? "Loading..." : "Show More"}
						</Button>
					)}
				</div>
			</div>
		);
	};

	return (
		<aside
			className={`w-48 bg-content1 border-r border-divider h-full overflow-y-auto flex flex-col transition-all duration-300 ${
				isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
			}`}
		>

			{/* Networks Section */}
			<div className="p-3">
				<div className="flex items-center justify-between mb-3">
					<h2 className="text-xs font-bold tracking-wide text-default-700">
						PUBLIC GOODS
					</h2>
					<div className="flex gap-1">
						<Button
							isIconOnly
							size="sm"
							variant="light"
							aria-label="Search"
							className="h-6 w-6 min-w-6"
							onClick={() => setIsSearchOpen(!isSearchOpen)}
						>
							<Icon
								icon="lucide:search"
								className="text-default-500"
								width={12}
								height={12}
							/>
						</Button>
						<Button
							isIconOnly
							size="sm"
							variant="light"
							aria-label="Expand"
							className="h-6 w-6 min-w-6"
						>
							<Icon
								icon="lucide:chevron-down"
								className="text-default-500"
								width={12}
								height={12}
							/>
						</Button>
					</div>
				</div>

				<NetworksSection />
			</div>

			{/* Footer Section */}
			<div className="mt-auto p-2 border-t border-divider">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<span className="text-xs text-default-500">YouBuidl</span>
						<span className="text-xs text-default-400">v1.0.0</span>
					</div>
					<div className="flex items-center gap-2">
						<Button isIconOnly size="sm" variant="light" aria-label="Help">
							<Icon
								icon="lucide:help-circle"
								className="text-default-500"
								width={14}
								height={14}
							/>
						</Button>
						<Button isIconOnly size="sm" variant="light" aria-label="GitHub">
							<Icon
								icon="lucide:github"
								className="text-default-500"
								width={14}
								height={14}
							/>
						</Button>
						<Button isIconOnly size="sm" variant="light" aria-label="Discord">
							<Icon
								icon="lucide:message-circle"
								className="text-default-500"
								width={14}
								height={14}
							/>
						</Button>
					</div>
					<div className="text-xs text-default-400 text-center">
						© 2025 YouBuidl
					</div>
				</div>
			</div>
		</aside>
	);
};
