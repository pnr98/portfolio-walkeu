import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// RTK Query
export const forecastApi = createApi({
	reducerPath: "forecastApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/forecast" }),
	endpoints: (builder) => ({
		fetchNowWeather: builder.query({
			query: ({ lat, lng, addr }) => `now?lat=${lat}&lng=${lng}&addr=${addr}`,
			transformResponse: (response) => {
				return {
					precipitationForm: response.precipitation || [],
					precipitation: response.precipitation || [],
					temperature: response.temperature || [],
					humidity: response.humidity || [],
					windSpeed: response.windSpeed || [],
					airQuality: {
						khaiValue: response.airQuality.khaiValue || null,
						khaiGrade: response.airQuality.khaiGrade || null,
					},
				};
			},
		}),
		fetchShortWeather: builder.query({
			query: ({ lat, lng }) => `short?lat=${lat}&lng=${lng}`,
			transformResponse: (response) => {
				return {
					precipitationForm: response.precipitation || [],
					precipitation: response.precipitation || [],
					temperature: response.temperature || [],
					humidity: response.humidity || [],
					windSpeed: response.windSpeed || [],
					skyState: response.skyState || [],
				};
			},
		}),
		fetchLongWeather: builder.query({
			query: ({ lat, lng }) => `long?lat=${lat}&lng=${lng}`,
			transformResponse: (response) => {
				return {
					prcpProbability: response.prcpProbability || [],
					thermoMinimum: response.thermoMinimum || [],
					thermoMaximum: response.thermoMaximum || [],
				};
			},
		}),
	}),
});

export const { useFetchNowWeatherQuery, useFetchShortWeatherQuery, useFetchLongWeatherQuery } = forecastApi;
