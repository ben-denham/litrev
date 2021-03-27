import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Paper from './pages/Paper';
import Home from './pages/Home';

const useStyles = makeStyles({
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  pageWrapper: {
    flexGrow: 1,
    minHeight: 0,
  },
});

function App() {
  const classes = useStyles();

  return (
    <Router>
      <CssBaseline />
      <div className={classes.appWrapper}>
        <AppBar position="static">
          <Toolbar>
            <Link component={RouterLink} to="/" color="inherit" underline="none">
              <Typography variant="h6" component="h2">
                LitRev
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <div className={classes.pageWrapper}>
          <Switch>
            <Route path="/paper/:paperId+">
              <Paper />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
