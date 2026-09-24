import { useState } from "react";
import CurrentWeather from "../components/CurrentWeather";
import ErrorMessage from "../components/ErrorMessage";
import FavoriteCities from "../components/FavoriteCities";
import Loading from "../components/Loading";
import LocationButton from "../components/LocationButton";
import SearchBar from "../components/SearchBar";
import WeatherDetails from "../components/WeatherDetails";
import { getWeather, getWeatherByLocation, addFavoriteCity } from "../services/api"; // <-- addFavoriteCity IMPORT HUA

function Weather() {
	const [weatherResult, setWeatherResult] = useState(null);
	const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favoriteCities") ?? "[]"));
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const loadWeather = async (request) => {
		setIsLoading(true);
		setError("");
		try {
			const result = await request();
			setWeatherResult(result);
		} catch (requestError) {
			setError(requestError.response?.data?.message ?? "Could not load weather right now.");
		} finally {
			setIsLoading(false);
		}
	};

	const searchCity = (city) => loadWeather(() => getWeather(city));
	const useLocation = (location, locationError) => {
		if (locationError) {
			setError(locationError);
			return;
		}
		loadWeather(() => getWeatherByLocation(location.latitude, location.longitude));
	};

	// ------------------ MONGODB SAVING LOGIC FIX ------------------
	const saveFavorite = async () => {
		if (!weatherResult?.city) return;

		try {
			// Backend MongoDB Schema Payload
			const payload = {
				city: weatherResult.city,
				temperature: weatherResult.weather?.temperature,
				feelsLike: weatherResult.weather?.feelsLike,
				humidity: weatherResult.weather?.humidity,
				windSpeed: weatherResult.weather?.windSpeed,
				description: weatherResult.weather?.condition,
			};

			// 1. Backend Express API call (MongoDB Save)
			await addFavoriteCity(payload);

			// 2. React UI & LocalStorage Update
			if (!favorites.some((favorite) => favorite.name === weatherResult.city)) {
				const nextFavorites = [...favorites, { name: weatherResult.city, id: weatherResult.city }];
				setFavorites(nextFavorites);
				localStorage.setItem("favoriteCities", JSON.stringify(nextFavorites));
			}

			alert(`${weatherResult.city} successfully saved to MongoDB!`);
		} catch (err) {
			console.error("Save Favorite Failed:", err);
			setError(err.response?.data?.message ?? "Failed to save favorite city to Database. Please log in first.");
		}
	};

	return (
		<main className="weather-page">
			<section className="weather-page__header">
				<div><p className="eyebrow">Your forecast</p><h1>Weather today</h1></div>
				<div className="weather-page__tools"><SearchBar onSearch={searchCity} /><LocationButton onLocation={useLocation} disabled={isLoading} /></div>
			</section>
			{error && <ErrorMessage message={error} />}
			{isLoading && <Loading />}
			{weatherResult && !isLoading && (
				<section className="weather-page__result">
					<div className="weather-page__result-heading">
						<p>{weatherResult.country ? `${weatherResult.city}, ${weatherResult.country}` : weatherResult.city ?? "Your location"}</p>
						<button className="button button--quiet" type="button" onClick={saveFavorite}>Save favorite</button>
					</div>
					<CurrentWeather weather={{ ...weatherResult.weather, city: weatherResult.city }} />
					<WeatherDetails weather={weatherResult.weather} />
				</section>
			)}
			{!weatherResult && !isLoading && !error && <p className="weather-page__empty">Search for a city to see its current conditions.</p>}
			<FavoriteCities favorites={favorites} onCitySelect={(city) => searchCity(typeof city === "string" ? city : city.name)} />
		</main>
	);
}

export default Weather;