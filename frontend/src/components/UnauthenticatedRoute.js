import React, { cloneElement } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";
import { querystring } from "../lib/queryString";

export default function UnauthenticatedRoute(props) {
    const { children, ...rest } = props;
    const { isAuthenticated } = useAppContext();
    const redirect = querystring("redirect");

    return (
        <Route {...rest}>
            {!isAuthenticated ? (
                cloneElement(children, props)
            ) : (
                <Redirect to={redirect ? redirect : "/"} />
            )}
        </Route>
    );
}