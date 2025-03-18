import React from "react";
import { Config } from "../configs";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between">
        <Link to={'/'}>
          <h1 className="text-2xl font-bold text-gray-900">{Config.appName}</h1>
        </Link>
        <Link to={'/admin/dashboard'} className="underline">Admin Dashboard</Link>
      </div>
    </nav>
  );
}
