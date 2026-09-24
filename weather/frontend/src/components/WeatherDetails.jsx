import React from "react";

function WeatherDetails({ weather = {} }) {
	const humidity = weather.humidity ?? weather.main?.humidity;
	const windSpeed = weather.windSpeed ?? weather.wind?.speed;
	const pressure = weather.pressure ?? weather.main?.pressure;
	const visibility = weather.visibility;
	const visibilityInKilometers = visibility == null
		? null
		: visibility > 100
			? visibility / 1000
			: visibility;

	const details = [
		["Humidity", humidity == null ? "--" : `${humidity}%`],
		["Wind speed", windSpeed == null ? "--" : `${windSpeed} m/s`],
		["Pressure", pressure == null ? "--" : `${pressure} hPa`],
		[
			"Visibility",
			visibilityInKilometers == null
				? "--"
				: `${visibilityInKilometers.toFixed(1)} km`,
		],
	];

	return (
		<section className="weather-details" aria-labelledby="weather-details-title">
			<h2 id="weather-details-title">Weather details</h2>
			<dl>
				{details.map(([label, value]) => (
					<div className="weather-details__item" key={label}>
						<dt>{label}</dt>
						<dd>{value}</dd>
					</div>
				))}
			</dl>
		</section>
	);
}

export default WeatherDetails;
