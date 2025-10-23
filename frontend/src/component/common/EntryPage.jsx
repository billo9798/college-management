import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import welcomeImg from "../../asset/img/welcome.png";
import "./NavBar.css";

export const EntryPage = () => {
    return (
        <div className="extry-page-container h-[100vh] flex justify-center items-center">
            <div className="entry-page-content">
                <div className="entry-image flex flex-col justify-center items-center mb-10 w-auto">
                    <img
                        src={welcomeImg}
                        alt="Welcome"
                        className="block mx-auto w-[250px] h-auto sm:w-[300px] md:w-[400px] object-contain fixed-img-entry"
                    />
                    <h1 className="text-xl text-blue-600 font-bold min-[300px]:text-lg min-[300px]:text-center" style={{ textAlign: 'center' }}>
                        Welcome To Student Issue Management System
                    </h1>
                </div>
                <div className="buttons flex flex-row justify-center items-center gap-5 text-center">
                    <Link to="/login">
                        <button className="font-bold text-lg button-4" role="button">
                            <span className="text">Login</span>
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="font-bold text-lg button-4" role="button">
                            <span className="text">Sign Up</span>
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};
