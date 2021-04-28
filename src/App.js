import Navbar from './components/Navbar';
import Home from './components/Home';
import NewBlog from './components/NewBlog';
import Blog from './components/Blog';
import Discussions from './components/Discussions';
import BlogList from './components/BlogList';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>

            <Route exact path="/" >
              <Home />
            </Route>

            <Route path='/create'>
              <NewBlog />
            </Route>

            <Route path='/blogs'>
              <BlogList />
            </Route>

            <Route exact path='/blog:id'>
              <Blog />
            </Route>

            <Route exact path='/blog:id/discussion'>
              <Discussions />
            </Route>

            <Route path='*'>
              <NotFound />
            </Route>

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
