import React from 'react';
import {Link} from "react-router-dom";
import {RoutesName} from "../router";

const NotFound: React.FC = () => {
    return (
        <div className="container tac">
            <Link to={RoutesName.MAIN}>Страница не найдена перейти на главную</Link>
        </div>
    );
};

export default NotFound;