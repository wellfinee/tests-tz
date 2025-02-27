import { FC, useState } from "react";
import searchLogo from "./../../assets/search.svg";
import Data from "./data";
import { getSortSymbol, handleSort } from "../../services";

const Dashboard: FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredTestLength, setFilteredTestLength] = useState(0);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);



    return (
        <>
            <h1 className="page__title monserrat weight-header">Dashboard</h1>
            <div className="page__search-field">
                <input 
                    type="text" 
                    placeholder="What test are you looking for?" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img src={searchLogo} />
                <span>{filteredTestLength} tests</span>
            </div>
            <div className="page__tests-container">
                <div className="tests-container__tabs">
                    <button className="tabs__item tabs__item--big" onClick={() => handleSort("name", setSortConfig)}>
                        NAME{getSortSymbol("name", sortConfig)}
                    </button>
                    <button className="tabs__item" onClick={() => handleSort("type", setSortConfig)}>
                        TYPES{getSortSymbol("type", sortConfig)}
                    </button>
                    <button className="tabs__item" onClick={() => handleSort("status", setSortConfig)}>
                        STATUS{getSortSymbol("status", sortConfig)}
                    </button>
                    <button className="tabs__item" onClick={() => handleSort("site", setSortConfig)}>
                        SITE{getSortSymbol("site", sortConfig)}
                    </button>
                </div>
                <Data 
                    searchQuery={searchQuery} 
                    setFilteredTestLength={setFilteredTestLength}
                    sortConfig={sortConfig}
                    onReset={() => setSearchQuery("")} 
                />
            </div>
        </>
    );
};

export default Dashboard;
