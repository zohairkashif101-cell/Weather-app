import React from "react";

function CurrentWeather({ weather = {} }) {
	const city = weather.city ?? weather.name ?? "Unknown location";
	const temperature = weather.temperature ?? weather.temp;
	const condition = weather.condition ?? weather.description ?? "No data";
	const feelsLike = weather.feelsLike ?? weather.feels_like;
	const icon = weather.icon ?? weather.weather?.[0]?.icon;
	const iconUrl = icon?.startsWith("http")
		? icon
		: icon
			? `https://openweathermap.org/img/wn/${icon}@2x.png`
			: null;

	return (
		<section className="current-weather" aria-label="Current weather">
			<div>
				<p className="current-weather__city">{city}</p>
				<h2 className="current-weather__temperature">
					{temperature == null ? "--" : `${Math.round(temperature)}°`}
				</h2>
				<p className="current-weather__condition">{condition}</p>
				{feelsLike != null && (
					<p className="current-weather__feels-like">
						Feels like {Math.round(feelsLike)}°
					</p>
				)}
			</div>

			{iconUrl && <img className="current-weather__icon" src={iconUrl} alt={condition} />}
		</section>
	);
}

export default CurrentWeather;
