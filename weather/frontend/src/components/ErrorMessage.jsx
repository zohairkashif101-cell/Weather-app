import React from "react";

function ErrorMessage({ message = "Something went wrong. Please try again." }) {
	return (
		<p className="error-message" role="alert">
			{message}
		</p>
	);
}

export default ErrorMessage;