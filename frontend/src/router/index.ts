import React from "react";
import Main from "../pages/Main";
import Restaurant from "../pages/Restaurant";

interface IRoute {
    path: string
    component: React.ComponentType
}

export enum RoutesName {
    MAIN = "/",
    RESTAURANT = "/rest/:id",
}

export const MainRoutes: IRoute[] = [
    {path: RoutesName.MAIN, component: Main},
    {path: RoutesName.RESTAURANT, component: Restaurant},
]