import React from "react"

export default function Spinner({ size = 8 }) {
    return (
        <div className="flex items-center justify-center py-8">
        <div className={`animate-spin rounded-full h-${size} w-${size} border-b-2 border-gray-900`}></div>
      </div>
    )
}