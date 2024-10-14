import React from 'react';

const WeatherSearch = ({ citySearch, setCitySearch, fetchCity, handleSelectCity, citySelected }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Entrez une ville"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
            />
            {fetchCity.length > 0 && (
                <div>
                    <p>Il y a {fetchCity.length} résultat(s), sélectionnez la ville correspondante :</p>
                    <select value={citySelected.value || ''} onChange={handleSelectCity}>
                        <option value="" disabled>Sélectionnez une ville</option>
                        {fetchCity.map((city, index) => (
                            <option key={index} value={`${city.name},${city.latitude},${city.longitude}`}>
                                {city.name} - {city.postcodes ? city.postcodes[0] : 'code postal non disponible'}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default WeatherSearch;
