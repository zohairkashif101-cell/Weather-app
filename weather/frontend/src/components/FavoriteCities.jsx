import React from "react";

function FavoriteCities({ favorites = [], onCitySelect, onDeleteFavorite }) {
	if (!favorites || favorites.length === 0) {
		return null;
	}

	return (
		<section className="favorite-cities" aria-label="Favorite cities">
			<h2>Favorite Cities</h2>
			<div className="favorite-cities__list">
				{favorites.map((favorite) => {
					const cityName = typeof favorite === "string" ? favorite : favorite.name || favorite.city;
					const favoriteId = favorite._id || favorite.id;

					return (
						<div key={favoriteId || cityName} className="favorite-city-card">
							<button
								type="button"
								className="button button--secondary"
								onClick={() => onCitySelect(cityName)}
							>
								{cityName}
							</button>

							{onDeleteFavorite && favoriteId && (
								<button
									type="button"
									className="button button--quiet button--delete"
									onClick={() => onDeleteFavorite(favoriteId)}
									title="Remove from favorites"
								>
									✕
								</button>
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
}

export default FavoriteCities;