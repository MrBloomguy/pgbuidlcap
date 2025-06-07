import React, { useEffect, useState } from "react";
import { Card, CardBody, Button, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";

const statCards = [
	{
		title: "Projects",
		icon: "lucide:layout-list",
		description: "Monitor and manage all public goods projects.",
		link: "/",
		button: "View Projects",
	},
	{
		title: "Domains",
		icon: "lucide:globe",
		description: "View and manage registered domains.",
		link: "/domains",
		button: "View Domains",
	},
	{
		title: "Leaderboard",
		icon: "lucide:trophy",
		description: "See top contributors and projects.",
		link: "/leaderboard",
		button: "View Leaderboard",
	},
];

function BuidlAIAdminSection() {
	const [openAIKey, setOpenAIKey] = useState("");
	const [model, setModel] = useState("gpt-4");
	const [saveStatus, setSaveStatus] = useState<string | null>(null);

	const handleSave = async () => {
		// TODO: Save to backend or secure storage
		setSaveStatus("Saving...");
		setTimeout(() => setSaveStatus("Saved!"), 1000);
	};

	return (
		<section className="bg-white rounded-xl shadow p-6 mb-8">
			<h2 className="text-xl font-bold mb-4 flex items-center gap-2">
				<span className="inline-block bg-primary/10 text-primary rounded-full p-2">
					<svg
						width="20"
						height="20"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.02 0l1.41-1.41M6.34 6.34L4.93 4.93"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
				Buidl AI Settings
			</h2>
			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-1">
						OpenAI API Key
					</label>
					<input
						type="password"
						value={openAIKey}
						onChange={(e) => setOpenAIKey(e.target.value)}
						className="w-full border rounded px-3 py-2 text-sm bg-default-100"
						placeholder="sk-..."
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Model</label>
					<select
						value={model}
						onChange={(e) => setModel(e.target.value)}
						className="w-full border rounded px-3 py-2 text-sm bg-default-100"
					>
						<option value="gpt-4">GPT-4</option>
						<option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
					</select>
				</div>
				<button
					onClick={handleSave}
					className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
				>
					Save Settings
				</button>
				{saveStatus && (
					<div className="text-xs text-default-500 mt-2">
						{saveStatus}
					</div>
				)}
			</div>
		</section>
	);
}

function BuidlAIStatsSection() {
	// These would be fetched from your backend in a real app
	const [stats, setStats] = useState({
		totalMessages: 1234,
		uniqueUsers: 87,
		avgResponseTime: 1.2, // seconds
		lastActive: "2025-06-06 14:00 UTC",
		apiCalls: 1022,
		errors: 3,
	});

	// TODO: Fetch real stats from backend

	return (
		<section className="bg-white rounded-xl shadow p-6 mb-8">
			<h2 className="text-xl font-bold mb-4 flex items-center gap-2">
				<span className="inline-block bg-primary/10 text-primary rounded-full p-2">
					<svg width="20" height="20" fill="none" viewBox="0 0 24 24">
						<path
							d="M13 2.05V4a1 1 0 0 1-2 0V2.05A10.003 10.003 0 0 0 2.05 11H4a1 1 0 1 1 0 2H2.05A10.003 10.003 0 0 0 11 21.95V20a1 1 0 1 1 2 0v1.95A10.003 10.003 0 0 0 21.95 13H20a1 1 0 1 1 0-2h1.95A10.003 10.003 0 0 0 13 2.05z"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
				Buidl AI Stats
			</h2>
			<div className="grid grid-cols-2 gap-4 text-sm">
				<div>
					<div className="font-semibold text-lg">{stats.totalMessages}</div>
					<div className="text-default-500">Total Messages</div>
				</div>
				<div>
					<div className="font-semibold text-lg">{stats.uniqueUsers}</div>
					<div className="text-default-500">Unique Users</div>
				</div>
				<div>
					<div className="font-semibold text-lg">
						{stats.avgResponseTime}s
					</div>
					<div className="text-default-500">Avg. Response Time</div>
				</div>
				<div>
					<div className="font-semibold text-lg">{stats.apiCalls}</div>
					<div className="text-default-500">API Calls</div>
				</div>
				<div>
					<div className="font-semibold text-lg">{stats.errors}</div>
					<div className="text-default-500">Errors</div>
				</div>
				<div>
					<div className="font-semibold text-lg">{stats.lastActive}</div>
					<div className="text-default-500">Last Active</div>
				</div>
			</div>
		</section>
	);
}

export const AdminDashboard: React.FC = () => {
	const navigate = useNavigate();
	const dataSource = "Gitcoin API, Supabase";

	const [stats, setStats] = useState({
		projects: null as number | null,
		domains: null as number | null,
		users: null as number | null,
		rounds: null as number | null,
	});
	const [activity, setActivity] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [gitcoinProjects, setGitcoinProjects] = useState<any[]>([]);
	const [loadingProjects, setLoadingProjects] = useState(true);

	useEffect(() => {
		async function fetchStats() {
			setLoading(true);
			// Fetch domains count from Supabase
			const { count: domainsCount } = await supabase
				.from("domains")
				.select("*", { count: "exact", head: true });
			// Fetch users count from Supabase
			const { count: usersCount } = await supabase
				.from("users")
				.select("*", { count: "exact", head: true });
			// Fetch projects and rounds from Gitcoin API (example endpoint)
			let projectsCount = null;
			let roundsCount = null;
			try {
				const res = await fetch("https://gitcoin.co/api/v0.1/grants/rounds/");
				if (res.ok) {
					const data = await res.json();
					roundsCount = Array.isArray(data) ? data.length : null;
					// Optionally, sum up all projects in all rounds
					projectsCount = Array.isArray(data)
						? data.reduce((acc, round) => acc + (round.projects_count || 0), 0)
						: null;
				}
			} catch (e) {
				// fallback: leave as null
			}
			setStats({
				projects: projectsCount,
				domains: domainsCount ?? null,
				users: usersCount ?? null,
				rounds: roundsCount,
			});
			// Fetch recent activity (example: last 5 domain registrations)
			let recent: string[] = [];
			try {
				const { data: recentDomains } = await supabase
					.from("domains")
					.select("name,owner,created_at")
					.order("created_at", { ascending: false })
					.limit(5);
				if (recentDomains) {
					recent = recentDomains.map(
						(d: any) => `Domain ${d.name} registered by ${d.owner}`
					);
				}
			} catch (e) {}
			setActivity(recent);
			setLoading(false);
		}
		async function fetchGitcoinProjects() {
			setLoadingProjects(true);
			try {
				const res = await fetch("https://gitcoin.co/api/v0.1/grants/");
				if (res.ok) {
					const data = await res.json();
					setGitcoinProjects(Array.isArray(data) ? data.slice(0, 10) : []);
				} else {
					setGitcoinProjects([]);
				}
			} catch (e) {
				setGitcoinProjects([]);
			}
			setLoadingProjects(false);
		}
		fetchStats();
		fetchGitcoinProjects();
	}, []);

	return (
		<div className="max-w-3xl mx-auto py-8 px-4">
			<BuidlAIStatsSection />
			<BuidlAIAdminSection />
			<h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
			<div className="mb-6 text-sm text-default-500 flex items-center gap-2">
				<Icon
					icon="mdi:api"
					width={18}
					height={18}
					className="text-primary"
				/>
				<span>
					Currently fetching from:{" "}
					<span className="font-semibold text-black">{dataSource}</span>
				</span>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				{statCards.map((card) => (
					<Card
						key={card.title}
						className="shadow border border-divider"
					>
						<CardBody className="flex flex-col items-center p-6">
							<Icon
								icon={card.icon}
								width={36}
								height={36}
								className="mb-2 text-primary"
							/>
							<h2 className="text-lg font-semibold mb-1">
								{card.title}
							</h2>
							<p className="text-sm text-default-500 mb-4 text-center">
								{card.description}
							</p>
							<Button
								size="sm"
								variant="solid"
								className="bg-[#CDEB63] text-black"
								onPress={() => navigate(card.link)}
							>
								{card.button}
							</Button>
						</CardBody>
					</Card>
				))}
			</div>
			<Divider className="my-6" />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card className="border border-divider">
					<CardBody>
						<h3 className="font-semibold mb-2">Quick Stats</h3>
						<ul className="text-sm text-default-500 space-y-1">
							<li>
								Projects:{" "}
								<span className="font-bold text-black">
									{loading ? "--" : stats.projects ?? "--"}
								</span>
							</li>
							<li>
								Domains:{" "}
								<span className="font-bold text-black">
									{loading ? "--" : stats.domains ?? "--"}
								</span>
							</li>
							<li>
								Active Users:{" "}
								<span className="font-bold text-black">
									{loading ? "--" : stats.users ?? "--"}
								</span>
							</li>
							<li>
								Rounds:{" "}
								<span className="font-bold text-black">
									{loading ? "--" : stats.rounds ?? "--"}
								</span>
							</li>
						</ul>
					</CardBody>
				</Card>
				<Card className="border border-divider">
					<CardBody>
						<h3 className="font-semibold mb-2">Recent Activity</h3>
						<ul className="text-sm text-default-500 space-y-1">
							{loading ? (
								<li>Loading...</li>
							) : activity.length === 0 ? (
								<li>No recent activity.</li>
							) : (
								activity.map((item, idx) => <li key={idx}>{item}</li>)
							)}
						</ul>
					</CardBody>
				</Card>
			</div>
			<Divider className="my-6" />
			<div>
				<h3 className="font-semibold mb-2">Latest Gitcoin Projects</h3>
				{loadingProjects ? (
					<div className="text-default-500 text-sm">
						Loading projects...
					</div>
				) : gitcoinProjects.length === 0 ? (
					<div className="text-default-500 text-sm">
						No projects found.
					</div>
				) : (
					<ul className="space-y-2">
						{gitcoinProjects.map((project, idx) => (
							<li
								key={project.id || idx}
								className="flex items-center gap-2"
							>
								<Icon
									icon="lucide:external-link"
									width={16}
									height={16}
									className="text-primary"
								/>
								<a
									href={
										project.url ||
										`https://gitcoin.co/grants/${project.id}`
									}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline text-sm truncate max-w-xs"
								>
									{project.title ||
										project.name ||
										`Project #${project.id}`}
								</a>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
