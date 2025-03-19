import React from "react";
import { Link } from "react-router-dom";
import { Config } from "../configs";
import { Github } from "lucide-react";

export default function GitLinks() {
    return (
        <div className="bg-slate-950 text-white">
            <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:justify-normal md:gap-x-10 justify-between lg:gap-x-20 py-3">
                <Link to={Config.FE_GITHUB_URL} className="hover:text-blue-500 flex">
                    Frontend code<Github size={25} />
                </Link>
                <Link to={Config.BE_GITHUB_URL} className="hover:text-blue-500 flex">
                    Backend code<Github size={25} />
                </Link>
            </div>
        </div>
    )
}