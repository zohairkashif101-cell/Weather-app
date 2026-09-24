import React from "react";

function LocationButton({ onLocation, disabled = false }) {
	const handleLocation = () => {
		if (!navigator.geolocation) {
			onLocation?.(null, "Geolocation is not supported by this browser.");
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				onLocation?.({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
			},
			() => onLocation?.(null, "Unable to access your location."),
		);
	};

	return (
		<button type="button" onClick={handleLocation} disabled={disabled}>
			Use my location
		</button>
	);
}

export default LocationButton;
