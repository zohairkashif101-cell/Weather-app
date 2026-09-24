import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Signup() {
	const navigate = useNavigate();
	const [form, setForm] = useState({ username: "", email: "", password: "" });
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		setIsSubmitting(true);
		try {
			await registerUser(form);
			navigate("/login", { state: { registered: true } });
		} catch (requestError) {
			setError(requestError.response?.data?.message ?? "Unable to create your account.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="auth-page">
			<form className="auth-form" onSubmit={handleSubmit}>
				<p className="eyebrow">Make it yours</p>
				<h1>Create account</h1>
				<p className="auth-form__intro">Save the cities you care about.</p>
				{error && <p className="form-error" role="alert">{error}</p>}
				<label>Username<input value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} required /></label>
				<label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
				<label>Password<input type="password" minLength="6" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required /></label>
				<button className="button button--primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create account"}</button>
				<p className="auth-form__footer">Already have an account? <Link to="/login">Log in</Link></p>
			</form>
		</main>
	);
}

export default Signup;
