import React from "react";
import HourlyForecastCard from "./HourlyForecastCard";

function HourlyForecast({ forecasts = [] }) {
	return (
		<section className="hourly-forecast" aria-labelledby="hourly-forecast-title">
			<h2 id="hourly-forecast-title">Hourly forecast</h2>
			{forecasts.length === 0 ? (
				<p>No hourly forecast data available.</p>
			) : (
				<div className="hourly-forecast__list">
					{forecasts.map((forecast, index) => (
						<HourlyForecastCard
							key={forecast.id ?? forecast.time ?? index}
							forecast={forecast}
						/>
					))}
				</div>
			)}
		</section>
	);
}

export default HourlyForecast;
