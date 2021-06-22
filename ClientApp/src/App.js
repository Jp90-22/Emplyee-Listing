import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Components
import Home from './components/Home';
import Navigation from './components/Navigation';
import Department from './components/Department';
import Employee from './components/Employee';

export default () => (
    <BrowserRouter>
        <div className="container">
            <h1 className="m-5 d-flex justify-content-center">Employee Enviroment for list your Employees</h1>
            
            <Navigation /> {/* Nav Bar */}
            
            {/* Router */}
            <Switch>
                <Route path="/" components={Home} exact />
                <Route path="/department" components={Department} />
                <Route path="/employee" components={Employee} />
            </Switch>

        </div>
    </BrowserRouter>
);     
