import React from "react";

function ForecastCard({ forecast = {} }) {
	const date = forecast.date ?? forecast.dt_txt ?? "Unknown day";
	const temperature = forecast.temperature ?? forecast.temp ?? forecast.main?.temp;
	const condition = forecast.condition ?? forecast.description ?? forecast.weather?.[0]?.description ?? "No data";
	const icon = forecast.icon ?? forecast.weather?.[0]?.icon;
	const iconUrl = icon?.startsWith("http")
		? icon
		: icon
			? `https://openweathermap.org/img/wn/${icon}@2x.png`
			: null;

	return (
		<article className="forecast-card">
			<p>{date}</p>
			{iconUrl && <img src={iconUrl} alt={condition} />}
			<strong>{temperature == null ? "--" : `${Math.round(temperature)}°`}</strong>
			<p>{condition}</p>
		</article>
	);
}

export default ForecastCard;
