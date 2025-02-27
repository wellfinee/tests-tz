import { FC, useEffect, useReducer } from "react";
import { Link } from "react-router";
import { initialState, testsReducer } from "./reducers";
import { fetchTestsThunk } from "./thunk";
import { capitalizeFirstLetter, cleanURL } from "../../services";
import { DataProps } from "./InterfacesTypes";

// 
const STATUS_ORDER_MAP: Record<string, number> = {
    "ONLINE": 0, "PAUSED": 1, "STOPPED": 2, "DRAFT": 3,
};

const Data: FC<DataProps> = ({ searchQuery, setFilteredTestLength, sortConfig, onReset }) => {
    const [state, dispatch] = useReducer(testsReducer, initialState);

    useEffect(() => {
        fetchTestsThunk(dispatch);
    }, []);

    let filteredTests = state.tests.filter((test) =>
        test.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortConfig) {
        filteredTests = [...filteredTests].sort((a, b) => {
            const { key, direction } = sortConfig;
            let compare = 0;

            if (key === "status") {
                const indexA = STATUS_ORDER_MAP[a.status as keyof typeof STATUS_ORDER_MAP] ?? Object.keys(STATUS_ORDER_MAP).length;
                const indexB = STATUS_ORDER_MAP[b.status as keyof typeof STATUS_ORDER_MAP] ?? Object.keys(STATUS_ORDER_MAP).length;
                compare = indexA - indexB;
            } else if (key === "site") {
                compare = a.site.url.localeCompare(b.site.url);
            } else if (key in a && key in b) {
                const valueA = a[key as keyof typeof a];
                const valueB = b[key as keyof typeof b];

                if (typeof valueA === "string" && typeof valueB === "string") {
                    compare = valueA.localeCompare(valueB);
                }
            }

            return direction === "asc" ? compare : -compare;
        });
    }

    useEffect(() => {
        setFilteredTestLength(filteredTests.length);
    }, [filteredTests.length, setFilteredTestLength]);

    if (filteredTests.length === 0) {
        return (
            <div className="no-results">
                <p>Your search did not match any results.</p>
                <button onClick={onReset}>Reset</button>
            </div>
        );
    }

    return (
        <div className="data__items">
            {filteredTests.map((test) => {
                const isDraft = test.status.toUpperCase() === "DRAFT";
                const buttonText = isDraft ? "Finalize" : "Results";
                const buttonLink = isDraft ? `/finalize/${test.id}` : `/results/${test.id}`;
                const buttonClass = isDraft ? "button--gray" : "button--green";

                return (
                    <div 
                        className="data__item" 
                        key={test.id}>
                        <div
                            className="item__left-border"
                            style={{
                                backgroundColor: test.site?.id
                                    ? `var(--color-id-site-${test.site.id})`
                                    : "gray"
                            }}
                        />
                        <div className="item__name">{test.name}</div>
                        <div className="item__type">{test.type}</div>
                        <div className="item__status" style={{ color: `var(--${test.status}-text-color)` }}>
                            {capitalizeFirstLetter(test.status)}
                        </div>
                        <div className="item__url">{cleanURL(test.site?.url ?? "Unknown")}</div>
                        <Link to={buttonLink} className={`status-button ${buttonClass}`}>
                            {buttonText}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default Data;
