import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";


const CATEGORIES = [
	{ name: "technology", color: "#3b82f6" },
	{ name: "science", color: "#16a34a" },
	{ name: "finance", color: "#ef4444" },
	{ name: "society", color: "#f59e0b" },
	{ name: "entertainment", color: "#db2777" },
	{ name: "health", color: "#14b8a6" },
	{ name: "history", color: "#f97316" },
	{ name: "news", color: "#8b5cf6" },
];

const initialFacts = [
	{
		id: 1,
		text: "React is being developed by Meta (formerly facebook)",
		source: "https://opensource.fb.com/",
		category: "technology",
		votesInteresting: 24,
		votesMindblowing: 9,
		votesFalse: 4,
		createdIn: 2021,
	},
	{
		id: 2,
		text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
		source:
			"https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
		category: "society",
		votesInteresting: 11,
		votesMindblowing: 2,
		votesFalse: 0,
		createdIn: 2019,
	},
	{
		id: 3,
		text: "Lisbon is the capital of Portugal",
		source: "https://en.wikipedia.org/wiki/Lisbon",
		category: "society",
		votesInteresting: 8,
		votesMindblowing: 3,
		votesFalse: 1,
		createdIn: 2015,
	},
];

function App() {
	// State (Re-render the component) DEFINE STATE VARIABLE
	const [showForm, setShowForm] = useState(false);
	const [facts, setFacts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCategory, setCurrentCategory] = useState("all");

	useEffect(function () {
		async function getFacts() {
			setIsLoading(true);

			let query = supabase
				.from('facts')
				.select('*');

			if (currentCategory !== "all")
				query = query.eq("category", currentCategory);

			const { data: facts, error } = await query
				.order('votesInteresting', { ascending: true })
				.limit(1000);

			if (!error) setFacts(facts);
			else alert("There was a problem getting data");
			setIsLoading(false);
		}
		getFacts();
	}, [currentCategory]);

	return (
		// JSX Syntax (Not HTML) React creates the JSX.
		<>
			<Header showForm={showForm} setShowForm={setShowForm} />

			{showForm ? <NewFactForm setFacts={setFacts} setShowForm={setShowForm} /> : null}

			<main className="main">
				<CategoryFilter setCurrentCategory={setCurrentCategory} />
				{isLoading ? <Loader /> : <FactList facts={facts} />}
			</main>
		</>
	);
}

function Loader() {
	return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
	const appTitle = "Factporium";

	return <header className="the-header">
		<div className="logo">
			<a href="index.html"><img src="logo.png" alt="Factporium Logo" /></a>
			<h1 id="top-heading"><a href="index.html">{appTitle}</a></h1>
		</div>
		<button className="btn btn-large btn-open"
			onClick={() => setShowForm((show) => !show)}>
			{showForm ? "Close" : "Share a Fact"}
		</button>
	</header>
}

function isValidHttpUrl(string) {
	let url;
	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}
	return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
	const [text, setText] = useState("");
	const [source, setSource] = useState("");
	const [category, setCategory] = useState("");
	const textLength = text.length;

	function handleSubmit(e) {
		// Prevent page from reloading.
		e.preventDefault();

		// Is Data Valid? If yes, create the new fact from the input.
		if (text && isValidHttpUrl(source) && category && textLength <= 200) {
			// New Fact Object.
			const newFact = {
				// ID is temporary in place of auto gen for DB.
				id: Math.round(Math.random() * 1000),
				text,
				source,
				category,
				votesInteresting: 24,
				votesMindblowing: 9,
				votesFalse: 4,
				createdIn: new Date().getFullYear(),
			}
			// Add new fact to be rendered to UI.
			setFacts((facts) => [newFact, ...facts])

			// Reset the input fields to default. Closing the form already resets the input fields, not needed to form reset.
			// setText("");
			// setSource("");
			// setCategory("");

			// Close the form upon submission.
			setShowForm(false);
		}
	}

	return (
		<form className="fact-form" onSubmit={handleSubmit}>
			<input type="text" placeholder="Share a fact with the world..." value={text} onChange={(e) => setText(e.target.value)} />
			<span>{200 - textLength}</span>

			<input type="text" placeholder="https://example.com..." value={source} onChange={(e) => setSource(e.target.value)} />

			<select value={category} onChange={(e) => setCategory(e.target.value)}>
				<option value="">Choose Category:</option>
				{CATEGORIES.map((cat) =>
					<option key={cat.name} value={cat.name}>
						{cat.name.toUpperCase()}
					</option>)}
			</select>
			<button className="btn btn-large">Post</button>
		</form>
	);
}

function CategoryFilter({ setCurrentCategory }) {
	return (
		<aside>
			<ul>
				<li className="cat">
					<button className="btn btn-all-cats"
						onClick={() => setCurrentCategory("all")}>All</button>
				</li>
				{CATEGORIES.map((cat) => (
					<li key={cat.name} className="cat">
						<button className="btn btn-cat"
							style={{ backgroundColor: cat.color }}
							onClick={() => setCurrentCategory(cat.name)}>
							{cat.name}
						</button>
					</li>
				))}
			</ul>
		</aside>
	);
}

function FactList({ facts }) {
	if (facts.length === 0)
		return <p className="message">There are no facts for this category...Be the first poster!! </p>

	return (
		<section>
			<ul className="facts-list">{
				facts.map((fact) => (
					<Fact key={fact.id} fact={fact} />
				))}
			</ul>
			<p>There are {facts.length} facts currently posted.</p>
		</section>
	);
}

function Fact({ fact }) {

	return <li className="fact">
		<p>
			{fact.text}
			<a className="source" href={fact.source} target="_blank">(Source)</a>
		</p>
		<span className="tag-tech" style={{
			backgroundColor: CATEGORIES.find(
				(cat) => cat.name === fact.category
			).color
		}}>

			{fact.category}</span>
		<div className="vote-buttons">
			<button>👍 {fact.votesInteresting}</button>
			<button>🤯 {fact.votesMindblowing}</button>
			<button>⛔️ {fact.votesFalse}</button>
		</div>
	</li>
}

export default App;