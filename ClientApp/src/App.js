import * as React from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';

//Components
import Navigation from './components/Navigation';
import Home from './components/Home';
import Department from './components/Department';
import Employee from './components/Employee';

export default () => (
    <div className="container">
        <h1 className="m-5 d-flex justify-content-center">Employee Enviroment for list your Employees</h1>
                        
        {/* Router */}
        <Router>
            <Navigation /> {/* Nav Bar */}

            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/department" component={Department} />
                <Route path="/employee" component={Employee} />
            </Switch>
        </Router>

    </div>
);     
