
import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SaveEmployeeComponent from './components/SaveEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';

function App() {
    return (
        <div>
            <Router>
                <div className="">
                    <HeaderComponent />
                </div>

                <div className="container" style={{marginTop:"60px"}}>
                    <Switch>
                        <Route exact path="/" component={ListEmployeeComponent}></Route>
                        <Route path="/employees" component={ListEmployeeComponent}></Route>
                        <Route path="/save-employee/:id" component={SaveEmployeeComponent}></Route>
                        <Route path="/view-employee/:id" component={ViewEmployeeComponent}></Route>
                        
                    </Switch>
                </div>

                <div className="">
                    <FooterComponent />
                </div>

            </Router>

        </div>
    );
}

export default App;
