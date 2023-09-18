import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const flattenData = (data) => {
	let flatData = [];

	const flatten = (obj, parentKey = "") => {
		if (typeof obj !== "object") {
			return;
		}

		for (const key in obj) {
			if (typeof obj[key] === "object") {
				flatten(obj[key], parentKey + key + ".");
			} else {
				flatData.push({ key: parentKey + key, value: obj[key] });
			}
		}
	};

	flatten(data);
	return flatData;
};

const renderFlatData = (flatData) => {
	return flatData.map((item) => (
		<div key={item.key} className="seo-card">
			<h2 className="seo-card-title">{item.key}</h2>
			<p className="seo-card-text">{item.value}</p>
		</div>
	));
};

function App() {
	const [url, setUrl] = useState("");
	const [result, setResult] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			// const response = await axios.post("http://localhost:3001/check-seo", {
			const response = await axios.post(
				"https://statuesque-lolly-6d0b80.netlify.app/.netlify/functions/check",
				{
					url: url,
				},
			);
			setResult(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="app">
			<div className="container">
				<h1 className="title font-weight-bolder">
					<em>SEO Checker</em>
				</h1>
				<form className="input-form" onSubmit={handleSubmit}>
					<input
						type="text"
						className="input"
						placeholder="Enter any desired URL"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>
					<button className="btn" type="submit">
						Check SEO
					</button>
				</form>

				{isLoading ? (
					<div className="loader">
						<ClipLoader size={50} color={"#123abc"} loading={isLoading} />
					</div>
				) : null}

				{result && (
					<div className="results">
						<h2 className="results-title font-weight-bolder">
							<em>SEO Results</em>
						</h2>
						<hr className="divider" />
						<div className="seo-card-container">
							{renderFlatData(flattenData(result))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

export default App;
