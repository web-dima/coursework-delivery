import React from 'react';

import "./App.css"
import {Routes, Route} from "react-router-dom"
import MainLayout from "./Layouts/MainLayout";
import {MainRoutes} from "./router";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
          {MainRoutes.map((route)=> {
              return <Route key={route.path} path={route.path} element={<route.component/>}/>
          })}
          <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
);
}

export default App;
