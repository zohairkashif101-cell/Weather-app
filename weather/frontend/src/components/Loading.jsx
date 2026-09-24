import React from "react";

function Loading({ message = "Loading weather..." }) {
	return (
		<div className="loading" role="status" aria-live="polite">
			<span className="loading__spinner" aria-hidden="true" />
			<span>{message}</span>
		</div>
	);
}

export default Loading;
