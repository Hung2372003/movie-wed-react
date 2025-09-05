import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import "./admin-dashboard.scss";

export default function AdminDashboardPage() {
  const stats = {
    movies: 12,
    episodes: 45,
    users: 1200,
    favorites: 350,
  };

  const moviesByYear = [
    { year: "2019", count: 3 },
    { year: "2020", count: 2 },
    { year: "2021", count: 4 },
    { year: "2022", count: 1 },
    { year: "2023", count: 2 },
  ];

  const moviesByType = [
    { name: "Action", value: 5 },
    { name: "Drama", value: 3 },
    { name: "Sci-Fi", value: 2 },
    { name: "Comedy", value: 2 },
  ];

  // fake data nhiều năm
  const favoritesByYear: Record<string, { month: string; favorites: number }[]> = {
    "2022": [
      { month: "Jan", favorites: 25 },
      { month: "Feb", favorites: 40 },
      { month: "Mar", favorites: 35 },
      { month: "Apr", favorites: 55 },
      { month: "May", favorites: 65 },
      { month: "Jun", favorites: 80 },
      { month: "Jul", favorites: 70 },
      { month: "Aug", favorites: 85 },
      { month: "Sep", favorites: 50 },
      { month: "Oct", favorites: 75 },
      { month: "Nov", favorites: 60 },
      { month: "Dec", favorites: 90 },
    ],
    "2023": [
      { month: "Jan", favorites: 30 },
      { month: "Feb", favorites: 50 },
      { month: "Mar", favorites: 40 },
      { month: "Apr", favorites: 70 },
      { month: "May", favorites: 90 },
      { month: "Jun", favorites: 120 },
      { month: "Jul", favorites: 80 },
      { month: "Aug", favorites: 100 },
      { month: "Sep", favorites: 60 },
      { month: "Oct", favorites: 110 },
      { month: "Nov", favorites: 95 },
      { month: "Dec", favorites: 130 },
    ],
  };

  const [selectedYear, setSelectedYear] = useState<string>("2023");

  const colors = ["#3498db", "#9b59b6", "#2ecc71", "#e67e22"];

  return (
      <div className="dashboard">
        <h1>📊 Admin Dashboard</h1>

        <div className="stats-grid">
          <div className="card movies">
            <h2>{stats.movies}</h2>
            <p>Movies</p>
          </div>
          <div className="card episodes">
            <h2>{stats.episodes}</h2>
            <p>Episodes</p>
          </div>
          <div className="card users">
            <h2>{stats.users}</h2>
            <p>Users</p>
          </div>
          <div className="card favorites">
            <h2>{stats.favorites}</h2>
            <p>Favorites</p>
          </div>
        </div>

        <div className="charts">
          <div className="chart-card">
            <h3>Movies by Year</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={moviesByYear}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3498db" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Movies by Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={moviesByType}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {moviesByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card wide">
            <div className="chart-header">
              <h3>Favorites by Month</h3>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {Object.keys(favoritesByYear).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={favoritesByYear[selectedYear]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="favorites"
                  stroke="#e67e22"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
  );
}
