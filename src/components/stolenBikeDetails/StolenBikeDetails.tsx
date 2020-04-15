import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ROOT_URL = 'https://bikewise.org/api/v2';

async function getIncidentById(id: string) {
  const response = await axios.get(`${ROOT_URL}/incidents/${id}`);
  return response;
}

async function getLocations() {
  const response = await axios.get(`${ROOT_URL}/locations`);
  return response;
}

async function getLocationsMarkers() {
  const response = await axios.get(`${ROOT_URL}/locations/markers`);
  return response;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
    },
  }),
);

function StolenBikeDetails(props: any) {
  const classes = useStyles();
  const history = useHistory();

  const [stolenBikeDetails, setStolenBikeDetails] = useState<any>(null);

  const id = props.match.params.id;

  useEffect(() => {
    if (id) {
      const result = getIncidentById(id);
      result
        .then((response) => {
          if (response && response.data) setStolenBikeDetails(response.data.incident);
        })
        .catch((e) => {
          console.log('error = ', e.message);
        });
    }
  }, [id]);

  const handleBack = () => {
    history.push(`/`);
  };

  const renderStolenBikeDetailsDiv = () => {
    let stolenBikeDetailsDiv = null;

    if (stolenBikeDetails) {
      stolenBikeDetailsDiv = (
        <div className="my-3">
          <div className="h5">
            <b>{stolenBikeDetails.title}</b>
          </div>
          <div className="h6">{stolenBikeDetails.address}</div>
          <div className="mt-5">
            <div className="h5">
              <b>DESCRIPTION OF INCIDENT</b>
            </div>
            <div className="h6">{stolenBikeDetails.description}</div>
          </div>
          <Button className="mt-2" variant="contained" color="primary" size="large" onClick={handleBack}>
            Back
          </Button>
        </div>
      );
    }

    return stolenBikeDetailsDiv;
  };

  return (
    <div className={classes.root}>
      <div className="mt-5 mb-3 d-flex justify-content-center">
        <Paper className={`${classes.root} w-75 mx-4`}>
          <div className="h2">
            <b>Police Department</b>
          </div>
          <div className="my-3 h4">Stolen Bike</div>
          {renderStolenBikeDetailsDiv()}
        </Paper>
      </div>
    </div>
  );
}

export default withRouter(StolenBikeDetails);
