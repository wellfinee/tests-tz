import { FC } from "react";
import { Link } from "react-router";
import arrowIcon from "./../assets/arrow.svg"; // Подключаем иконку

const ResultsPage: FC = () => {
    return (
        <div className="results-page">
            <h1 className="results-title">Results</h1>
            <p className="results-subtitle">Order basket redesign</p>

            <Link to="/" className="back-button">
                <img src={arrowIcon} alt="Back" className="back-icon" />
                Back
            </Link>
        </div>
    );
};

export default ResultsPage;
