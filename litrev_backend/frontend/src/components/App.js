import React, {useState, useEffect} from 'react';
import {createUseStyles} from 'react-jss';

import api from '../services/api';

const useStyles = createUseStyles({
  title: {
    fontSize: '2.5em',
  },
});

function App() {
  const classes = useStyles();
  const [session, setSession] = useState({});

  useEffect(function() {
    const fetch = async function() {
      const createSessionPromise = api.createSession();
      const sessionId = await createSessionPromise;
      const getSessionPromise = api.getSession(sessionId);
      const session = await getSessionPromise;
      setSession(session);
    };
    fetch();
  }, []);

  return (
    <div className="app">
      <h1 className={classes.title}>
        Litrev
      </h1>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}

export default App;
