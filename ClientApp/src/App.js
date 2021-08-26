import * as React from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';

// Components
import Navigation from './app/Navigation';
import Home from './app/Home';
import Department from './features/department/Department';
import Employee from './features/employee/Employee';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas) // Add fab and fas icon types

export default () => (
    <div className="container">
        <h1 className="m-5 d-flex justify-content-center">Employee Enviroment for list your Employees</h1>
                        
        {/* Router */}
        <Router>
            <Navigation /> {/* Nav Bar */}

            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/department" component={Department} exact />
                <Route path="/employee" component={Employee} exact />
            </Switch>
        </Router>

    </div>
);     
