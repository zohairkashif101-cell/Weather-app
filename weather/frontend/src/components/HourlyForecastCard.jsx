import React from "react";

function HourlyForecastCard({ forecast = {} }) {
	const time = forecast.time ?? forecast.dt_txt ?? "--:--";
	const temperature = forecast.temperature ?? forecast.temp ?? forecast.main?.temp;
	const condition = forecast.condition ?? forecast.description ?? forecast.weather?.[0]?.description ?? "No data";
	const icon = forecast.icon ?? forecast.weather?.[0]?.icon;
	const iconUrl = icon?.startsWith("http")
		? icon
		: icon
			? `https://openweathermap.org/img/wn/${icon}.png`
			: null;

	return (
		<article className="hourly-forecast-card">
			<strong>{time}</strong>
			{iconUrl && <img src={iconUrl} alt={condition} />}
			<span>{temperature == null ? "--" : `${Math.round(temperature)}°`}</span>
		</article>
	);
}

export default HourlyForecastCard;
