import { Link } from "react-router-dom";

export function BottomWar({label,to,buttonName}){
    return <div>
        <div className="text-gray-400 text-sm">{label}</div>
        <Link className="pointer pl-1" to={to}>{buttonName}</Link>

    </div>
        
        
}
