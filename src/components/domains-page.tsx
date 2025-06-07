import React from "react";
import { Card } from "@heroui/react";
import { Icon } from "@iconify/react";

// Example data, replace with real data fetching logic
const domains = [
	{
		name: "buidl.eth",
		description: "Main ENS for the Buidl project.",
		owner: "0x1234...abcd",
		expires: "2026-01-01",
		avatar: "https://metadata.ens.domains/mainnet/avatar/buidl.eth",
	},
	{
		name: "publicgoods.eth",
		description: "ENS for the Public Goods DAO.",
		owner: "0xabcd...1234",
		expires: "2025-09-15",
		avatar: "https://metadata.ens.domains/mainnet/avatar/publicgoods.eth",
	},
];

function DomainsPage() {
	return (
		<div className="max-w-3xl mx-auto py-8 px-4">
			<h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
				<Icon
					icon="lucide:grid"
					className="text-primary"
					width={28}
					height={28}
				/>
				Domains
			</h1>
			<div className="grid gap-6">
				{domains.map((domain) => (
					<Card
						key={domain.name}
						className="flex items-center gap-4 p-4 shadow-md"
					>
						<img
							src={domain.avatar}
							alt={domain.name}
							className="w-14 h-14 rounded-full border border-default-200 bg-default-100 object-cover"
							onError={(e) =>
								(e.currentTarget.src = "/youbuidlsocial-logo.png")
							}
						/>
						<div className="flex-1">
							<div className="flex items-center gap-2">
								<span className="font-semibold text-lg">{domain.name}</span>
								<span className="text-xs text-default-400">
									({domain.owner})
								</span>
							</div>
							<div className="text-default-600 text-sm mb-1">
								{domain.description}
							</div>
							<div className="text-xs text-default-500">
								Expires: {domain.expires}
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}

export { DomainsPage };
export default DomainsPage;