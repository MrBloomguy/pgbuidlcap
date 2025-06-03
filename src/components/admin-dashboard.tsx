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
		<div className="max-w-5xl mx-auto py-8 px-4">
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
					<div className="text-default-500 text-sm">Loading projects...</div>
				) : gitcoinProjects.length === 0 ? (
					<div className="text-default-500 text-sm">No projects found.</div>
				) : (
					<ul className="space-y-2">
						{gitcoinProjects.map((project, idx) => (
							<li key={project.id || idx} className="flex items-center gap-2">
								<Icon
									icon="lucide:external-link"
									width={16}
									height={16}
									className="text-primary"
								/>
								<a
									href={project.url || `https://gitcoin.co/grants/${project.id}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline text-sm truncate max-w-xs"
								>
									{project.title || project.name || `Project #${project.id}`}
								</a>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
