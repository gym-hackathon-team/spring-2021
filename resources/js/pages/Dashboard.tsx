import React from "react";
import { useHistory } from "react-router-dom";
import { DefaultButton } from "@fluentui/react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Dashboard: React.FunctionComponent = () => {
    const history = useHistory();
    return <>
        <Header/>
        <Navbar/>
        <div className="container">
            <h1>Homepage</h1>
            <DefaultButton onClick={() => history.push('/')}>Back to auth</DefaultButton>
        </div>
    </>;
}

export default Dashboard;
