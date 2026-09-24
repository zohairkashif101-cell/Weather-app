import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login({ onLogin }) {
	const navigate = useNavigate();
	const [form, setForm] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		setIsSubmitting(true);
		try {
			const result = await loginUser(form);
			onLogin?.(result.user);
			navigate("/weather");
		} catch (requestError) {
			setError(requestError.response?.data?.message ?? "Unable to log in. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="auth-page">
			<form className="auth-form" onSubmit={handleSubmit}>
				<p className="eyebrow">Welcome back</p>
				<h1>Log in</h1>
				<p className="auth-form__intro">Pick up where you left off.</p>
				{error && <p className="form-error" role="alert">{error}</p>}
				<label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
				<label>Password<input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required /></label>
				<button className="button button--primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Logging in..." : "Log in"}</button>
				<p className="auth-form__footer">New here? <Link to="/signup">Create an account</Link></p>
			</form>
		</main>
	);
}

export default Login;
