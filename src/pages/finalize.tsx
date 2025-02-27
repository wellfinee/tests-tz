import { FC } from "react";
import { Link } from "react-router";
import arrowIcon from "./../assets/arrow.svg"; // Подключаем иконку

const FinalizePage: FC = () => {
    return (
        <div className="results-page">
            <h1 className="results-title">Finalize</h1>
            <p className="results-subtitle">Spring promotion</p>

            <Link to="/" className="back-button">
                <img src={arrowIcon} alt="Back" className="back-icon" />
                Back
            </Link>
        </div>
    );
};

export default FinalizePage;
