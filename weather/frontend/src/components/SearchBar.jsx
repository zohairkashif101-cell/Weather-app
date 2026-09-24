import React, { useState } from "react";

function SearchBar({ onSearch, initialValue = "", placeholder = "Search for a city" }) {
	const [query, setQuery] = useState(initialValue);

	const handleSubmit = (event) => {
		event.preventDefault();
		const trimmedQuery = query.trim();

		if (trimmedQuery) {
			onSearch?.(trimmedQuery);
		}
	};

	return (
		<form className="search-bar" onSubmit={handleSubmit}>
			<label htmlFor="city-search">Search city</label>
			<input
				id="city-search"
				type="search"
				value={query}
				onChange={(event) => setQuery(event.target.value)}
				placeholder={placeholder}
			/>
			<button type="submit">Search</button>
		</form>
	);
}

export default SearchBar;
