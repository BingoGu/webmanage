import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes,
    useRoutes

} from "react-router-dom";
import MainPageRender from './login';
import RegisterMessge from './register';
import UserManagePage from './usermanage';

//react-router v6.0
function MainRouter() {
    return (
        <Router>
      <Routes>
        <Route path="/" element={<MainPageRender />} />
        <Route path="userregister" element={<RegisterMessge />} />
        <Route path="usermanage" element={<UserManagePage />} />
      </Routes>
    </Router>
    );
}



export default MainRouter;