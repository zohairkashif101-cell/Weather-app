import { Link } from "react-router-dom";

function Landing() {
	return (
		<main className="landing-page">
			<section className="landing-page__hero">
				<p className="eyebrow">Weather, simply understood</p>
				<h1>Know what the sky has planned.</h1>
				<p className="landing-page__intro">
					Search any city or use your location to see live conditions at a glance.
				</p>
				<div className="landing-page__actions">
					<Link className="button button--primary" to="/weather">Check the weather</Link>
					<Link className="button button--quiet" to="/signup">Create an account</Link>
				</div>
			</section>
			<section className="landing-page__features" aria-label="Features">
				<div><strong>Live conditions</strong><span>Current temperature and wind, fetched fresh.</span></div>
				<div><strong>Any city</strong><span>Find weather anywhere with one quick search.</span></div>
				<div><strong>Your favorites</strong><span>Keep the places you check most close at hand.</span></div>
			</section>
		</main>
	);
}

export default Landing;
