import React from "react";
import ForecastCard from "./ForecastCard";

function Forecast({ forecasts = [] }) {
	return (
		<section className="forecast" aria-labelledby="forecast-title">
			<h2 id="forecast-title">5-day forecast</h2>
			{forecasts.length === 0 ? (
				<p>No forecast data available.</p>
			) : (
				<div className="forecast__list">
					{forecasts.map((forecast, index) => (
						<ForecastCard
							key={forecast.id ?? forecast.date ?? index}
							forecast={forecast}
						/>
					))}
				</div>
			)}
		</section>
	);
}

export default Forecast;
