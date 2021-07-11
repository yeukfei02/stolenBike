import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route } from 'react-router-dom';

import MainPage from './mainPage/MainPage';
import StolenBikeDetails from './stolenBikeDetails/StolenBikeDetails';

// use default theme
// const theme = createMuiTheme();

// create own theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00c1e7',
    },
    secondary: {
      main: '#009bce',
    },
    background: {
      default: '#ffb554',
    },
  },
  typography: {
    fontFamily: 'Hind, sans-serif',
  },
});

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/case/:id">
          <StolenBikeDetails />
        </Route>
      </Switch>
    </MuiThemeProvider>
  );
}

export default App;
