import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return(
        <div>
            Dashboard
            <div className="fixed-action-btn">
                <Link to="/surveys/new" className="btn-floating btn-left red">
                    <i className="material-icons">apps</i>
                </Link>
            </div>
        </div>    

    );
};

export default Dashboard;