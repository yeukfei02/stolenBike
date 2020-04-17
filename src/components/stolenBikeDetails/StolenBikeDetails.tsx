import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';

import CustomMap from '../customMap/CustomMap';

const ROOT_URL = 'https://bikewise.org/api/v2';

async function getLocationsMarkers() {
  const response = await axios.get(`${ROOT_URL}/locations/markers`);
  return response;
}

async function getIncidentById(id: string) {
  const response = await axios.get(`${ROOT_URL}/incidents/${id}`);
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

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const [stolenBikeDetails, setStolenBikeDetails] = useState<any>(null);

  const id = props.match.params.id;

  useEffect(() => {
    if (id) {
      const locationsMarkersResponse = getLocationsMarkers();
      locationsMarkersResponse
        .then((response) => {
          if (response && response.data) {
            response.data.features.forEach((item: any, i: number) => {
              if (_.isEqual(item.properties.id.toString(), id) && item.geometry && item.geometry.coordinates) {
                const latitude = item.geometry.coordinates[1];
                const longitude = item.geometry.coordinates[0];
                setLatitude(latitude);
                setLongitude(longitude);
              }
            });
          }
        })
        .catch((e) => {
          console.log('error = ', e.message);
        });

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
      const occurredDate = moment.unix(stolenBikeDetails.occurred_at).format('MMM Do, ka');

      stolenBikeDetailsDiv = (
        <div className="my-3">
          <div className="h5">
            <b>{stolenBikeDetails.title}</b>
          </div>
          <div className="h6">
            <span>
              <b>Stolen</b>
            </span>{' '}
            {occurredDate}
            <span>
              {' '}
              <b>at</b> {stolenBikeDetails.address}
            </span>
          </div>
          <CustomMap
            latitude={latitude}
            longitude={longitude}
            name={stolenBikeDetails.title}
            address={stolenBikeDetails.address}
          />
          <div className="mt-3">
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
          <div className="my-3 h3">Stolen Bike</div>
          {renderStolenBikeDetailsDiv()}
        </Paper>
      </div>
    </div>
  );
}

export default withRouter(StolenBikeDetails);
