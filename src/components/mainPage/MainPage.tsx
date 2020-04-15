import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

import DisplayResult from '../displayResult/DisplayResult';

const ROOT_URL = "https://bikewise.org/api/v2";

async function getIncidents(queryData: any) {
  const response = await axios.get(`${ROOT_URL}/incidents`,
    {
      params: queryData
    }
  );
  return response;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
    },
  }),
);

function MainPage() {
  const classes = useStyles();

  const [caseDescription, setCaseDescription] = useState<string | ''>('');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const [resultList, setResultList] = useState<any[]>([]);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    if (resultList)
      setStatus('');
  }, [resultList]);

  const handleSearchCaseDescriptionChange = (e: any) => {
    setCaseDescription(e.target.value);
  }

  const handleFromDateChange = (date: Date | null) => {
    setFromDate(date);
  };

  const handleToDateChange = (date: Date | null) => {
    setToDate(date);
  };

  const handleFindCasesClick = async () => {
    setStatus('loading');

    let formDateNum = 0;
    let toDateNum = 0;

    if (fromDate) {
      const formattedFormDate = moment(fromDate).format("X");
      formDateNum = parseInt(formattedFormDate, 10);
    }
    if (toDate) {
      const formattedToDate = moment(toDate).format("X");
      toDateNum = parseInt(formattedToDate, 10);
    }

    let queryData = {
      page: 1,
      per_page: 10,
    };
    if (caseDescription) {
      let obj = {
        query: ''
      };
      obj.query = caseDescription;
      queryData = Object.assign(queryData, obj);
    }
    if (formDateNum) {
      let obj = {
        occurred_after: 0,
      };
      obj.occurred_after = formDateNum;
      queryData = Object.assign(queryData, obj);
    }
    if (toDateNum) {
      let obj = {
        occurred_before: 0,
      };
      obj.occurred_before = toDateNum;
      queryData = Object.assign(queryData, obj);
    }

    try {
      const result = await getIncidents(queryData);
      setResultList(result.data.incidents);
    } catch (e) {
      console.log("error = ", e.message);
      setStatus('error');
    }
  }

  const renderResultDiv = () => {
    let resultDiv = null;

    if (!_.isEmpty(status)) {
      if (_.isEqual(status, 'loading')) {
        resultDiv = (
          <div className={classes.root}>
            <div className="d-flex justify-content-center">
              <Paper className={`${classes.root} w-75 mx-4`}>
                <div className="h5">Loading...</div>
              </Paper>
            </div>
          </div>
        );
      } else if (_.isEqual(status, 'error')) {
        resultDiv = (
          <div className={classes.root}>
            <div className="d-flex justify-content-center">
              <Paper className={`${classes.root} w-75 mx-4`}>
                <div className="h5" style={{ color: 'red' }}>Oops, something went wrong</div>
              </Paper>
            </div>
          </div>
        );
      }
    } else {
      if (!_.isEmpty(resultList)) {
        resultDiv = (
          <DisplayResult resultList={resultList} />
        );
      } else {
        resultDiv = (
          <div className={classes.root}>
            <div className="d-flex justify-content-center">
              <Paper className={`${classes.root} w-75 mx-4`}>
                <div className="h5">No reuslts</div>
              </Paper>
            </div>
          </div>
        );
      }
    }

    return resultDiv;
  }

  return (
    <div className={classes.root}>
      <div className="mt-5 mb-3 d-flex justify-content-center">
        <Paper className={`${classes.root} w-75 mx-4`}>
          <div className="h2"><b>Police Department</b></div>
          <div className="h4">Stolen Bike</div>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <TextField
                id="outlined-full-width"
                label="Search case descriptions"
                placeholder="Search case descriptions"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={caseDescription}
                onChange={handleSearchCaseDescriptionChange}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="from"
                  label="from"
                  format="yyyy/MM/dd"
                  value={fromDate}
                  onChange={handleFromDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'from date',
                  }}
                  autoOk={true}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6} sm={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="to"
                  label="to"
                  format="yyyy/MM/dd"
                  value={toDate}
                  onChange={handleToDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'to date',
                  }}
                  autoOk={true}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button className="mt-2 w-100 h-75" variant="contained" color="primary" size="large" onClick={handleFindCasesClick}>
                Find cases
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
      {renderResultDiv()}
    </div>
  );
}

export default MainPage;
