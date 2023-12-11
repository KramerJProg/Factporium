import { useState } from "react";
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

	return (
		// JSX Syntax (Not HTML) React creates the JSX.
		<>
			<Header showForm={showForm} setShowForm={setShowForm} />

			{showForm ? <NewFactForm /> : null}

			<main className="main">
				<CategoryFilter />
				<FactList />
			</main>
		</>
	);
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

function NewFactForm() {
	const [text, setText] = useState("");
	const [source, setSource] = useState("");
	const [category, setCategory] = useState("");
	const textLength = text.length;

	function handleSubmit(e) {
		e.preventDefault();
	}

	return (
		<form className="fact-form" onSubmit={handleSubmit}>
			<input type="text" placeholder="Share a fact with the world..." value={text} onChange={(e) => setText(e.target.value)} />
			<span>{200 - textLength}</span>
			<input type="text" placeholder="Trust worthy source..." value={source} onChange={(e) => setSource(e.target.value)} />
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

function CategoryFilter() {
	return (
		<aside>
			<ul>
				<li className="cat">
					<button className="btn btn-all-cats">All</button>
				</li>
				{CATEGORIES.map((cat) => (
					<li key={cat.name} className="cat">
						<button className="btn btn-cat" style={{ backgroundColor: cat.color }}>
							{cat.name}
						</button>
					</li>
				))}
			</ul>
		</aside>
	);
}

function FactList() {
	const facts = initialFacts;

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