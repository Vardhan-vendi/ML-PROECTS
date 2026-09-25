"use client";

import { useState } from "react";

interface HouseData {
  longitude: number;
  latitude: number;
  housing_median_age: number;
  total_rooms: number;
  total_bedrooms: number;
  population: number;
  households: number;
  median_income: number;
  ocean_proximity: string;
}

export default function Home() {
  const [formData, setFormData] = useState<HouseData>({
    longitude: -122.23,
    latitude: 37.88,
    housing_median_age: 41,
    total_rooms: 880,
    total_bedrooms: 129,
    population: 322,
    households: 126,
    median_income: 8.3252,
    ocean_proximity: "NEAR BAY",
  });

  const [prediction, setPrediction] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // Handle all input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "ocean_proximity" ? value : Number(value),
    }));
  };

  // Submit form and call FastAPI
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setPrediction(null);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const data = await response.json();

      setPrediction(data.predicted_house_value);
    } catch (error) {
      console.error(error);

      setError("Unable to connect to the prediction server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">
      {/* Prediction Error */}

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Prediction Result */}

      {prediction !== null && (
        <div className="mb-8 rounded-xl bg-green-50 p-6 text-center">
          <p className="text-sm font-medium text-green-700">
            Predicted House Value
          </p>

          <p className="mt-2 text-4xl font-bold text-green-800">
            $
            {prediction.toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      )}

      {/* Form */}

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        {/* Longitude */}

        <div>
          <label
            htmlFor="longitude"
            className="mb-2 block font-medium text-slate-700"
          >
            Longitude
          </label>

          <input
            id="longitude"
            name="longitude"
            type="number"
            step="any"
            placeholder="Enter longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Latitude */}

        <div>
          <label
            htmlFor="latitude"
            className="mb-2 block font-medium text-slate-700"
          >
            Latitude
          </label>

          <input
            id="latitude"
            name="latitude"
            type="number"
            step="any"
            placeholder="Enter latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Housing Median Age */}

        <div>
          <label
            htmlFor="housing_median_age"
            className="mb-2 block font-medium text-slate-700"
          >
            Housing Median Age
          </label>

          <input
            id="housing_median_age"
            name="housing_median_age"
            type="number"
            placeholder="Enter housing median age"
            value={formData.housing_median_age}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Total Rooms */}

        <div>
          <label
            htmlFor="total_rooms"
            className="mb-2 block font-medium text-slate-700"
          >
            Total Rooms
          </label>

          <input
            id="total_rooms"
            name="total_rooms"
            type="number"
            placeholder="Enter total rooms"
            value={formData.total_rooms}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Total Bedrooms */}

        <div>
          <label
            htmlFor="total_bedrooms"
            className="mb-2 block font-medium text-slate-700"
          >
            Total Bedrooms
          </label>

          <input
            id="total_bedrooms"
            name="total_bedrooms"
            type="number"
            placeholder="Enter total bedrooms"
            value={formData.total_bedrooms}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Population */}

        <div>
          <label
            htmlFor="population"
            className="mb-2 block font-medium text-slate-700"
          >
            Population
          </label>

          <input
            id="population"
            name="population"
            type="number"
            placeholder="Enter population"
            value={formData.population}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Households */}

        <div>
          <label
            htmlFor="households"
            className="mb-2 block font-medium text-slate-700"
          >
            Households
          </label>

          <input
            id="households"
            name="households"
            type="number"
            placeholder="Enter households"
            value={formData.households}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Median Income */}

        <div>
          <label
            htmlFor="median_income"
            className="mb-2 block font-medium text-slate-700"
          >
            Median Income
          </label>

          <input
            id="median_income"
            name="median_income"
            type="number"
            step="0.0001"
            placeholder="Enter median income"
            value={formData.median_income}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Ocean Proximity */}

        <div className="md:col-span-2">
          <label
            htmlFor="ocean_proximity"
            className="mb-2 block font-medium text-slate-700"
          >
            Ocean Proximity
          </label>

          <select
            id="ocean_proximity"
            name="ocean_proximity"
            value={formData.ocean_proximity}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="NEAR BAY">NEAR BAY</option>

            <option value="<1H OCEAN">&lt;1H OCEAN</option>

            <option value="INLAND">INLAND</option>

            <option value="NEAR OCEAN">NEAR OCEAN</option>

            <option value="ISLAND">ISLAND</option>
          </select>
        </div>

        {/* Submit Button */}

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Predicting..." : "Predict House Price"}
        </button>
      </form>
    </div>
  );
}
