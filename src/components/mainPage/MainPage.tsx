import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

import DisplayResult from '../displayResult/DisplayResult';

const ROOT_URL = 'https://bikewise.org/api/v2';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
    },
  }),
);

function MainPage(): JSX.Element {
  const classes = useStyles();

  const [caseDescription, setCaseDescription] = useState<string | ''>('');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const [resultList, setResultList] = useState<any[]>([]);
  const [resultListPerPage, setResultListPerPage] = useState<any[]>([]);
  const [status, setStatus] = useState<string>('');
  const [clicked, setClicked] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (resultList) {
      setStatus('');
    }
  }, [resultList]);

  const handleSearchCaseDescriptionChange = (e: any): void => {
    setCaseDescription(e.target.value);
  };

  const handleFromDateChange = (date: Date | null): void => {
    setFromDate(date);
  };

  const handleToDateChange = (date: Date | null): void => {
    setToDate(date);
  };

  const getQueryData = () => {
    let formDateNum = 0;
    let toDateNum = 0;

    if (fromDate) {
      const formattedFormDate = moment(fromDate).format('X');
      formDateNum = parseInt(formattedFormDate, 10);
    }
    if (toDate) {
      const formattedToDate = moment(toDate).format('X');
      toDateNum = parseInt(formattedToDate, 10);
    }

    let queryData = {
      page: page,
      per_page: 10,
    };
    if (caseDescription) {
      const obj = {
        query: caseDescription,
      };
      queryData = Object.assign(queryData, obj);
    }
    if (formDateNum) {
      const obj = {
        occurred_after: formDateNum,
      };
      queryData = Object.assign(queryData, obj);
    }
    if (toDateNum) {
      const obj = {
        occurred_before: toDateNum,
      };
      queryData = Object.assign(queryData, obj);
    }

    return queryData;
  };

  const handleFindCasesClick = async (): Promise<void> => {
    setStatus('loading');
    setClicked(true);

    const queryData = getQueryData();

    try {
      const resultPerPage = await axios.get(`${ROOT_URL}/incidents`, {
        params: queryData,
      });
      if (resultPerPage) {
        setResultListPerPage(resultPerPage.data.incidents);
      }

      delete queryData.page;
      delete queryData.per_page;
      const result = await axios.get(`${ROOT_URL}/incidents`, {
        params: queryData,
      });
      setResultList(result.data.incidents);
    } catch (e) {
      console.log('error = ', e.message);
      setStatus('error');
    }
  };

  const handlePageChange = async (event: any, value: number): Promise<void> => {
    setPage(value);

    const queryData = getQueryData();
    queryData.page = value;
    const resultPerPage = await axios.get(`${ROOT_URL}/incidents`, {
      params: queryData,
    });
    if (resultPerPage) {
      setResultListPerPage(resultPerPage.data.incidents);
    }
  };

  const renderResultDiv = (): JSX.Element | null => {
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
                <div className="h5" style={{ color: 'red' }}>
                  Oops, something went wrong
                </div>
              </Paper>
            </div>
          </div>
        );
      }
    } else {
      if (!_.isEmpty(resultList)) {
        resultDiv = (
          <div>
            <div className="d-flex justify-content-center">
              <div className={`w-75 mx-4`}>
                <div className="mt-3 d-flex justify-content-end h5">Total: {resultList.length}</div>
              </div>
            </div>
            <DisplayResult resultList={resultListPerPage} />
            <div className="d-flex justify-content-center">
              <Pagination
                count={Math.round(resultList.length / 10)}
                color="secondary"
                showFirstButton
                showLastButton
                onChange={handlePageChange}
              />
            </div>
          </div>
        );
      } else {
        if (clicked) {
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
    }

    return resultDiv;
  };

  return (
    <div className={classes.root}>
      <div className="mt-5 mb-3 d-flex justify-content-center">
        <Paper className={`${classes.root} w-75 mx-4`}>
          <div className="h2">
            <b>Police Department</b>
          </div>
          <div className="my-3 h3">Stolen Bike</div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className="w-100"
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
            <Grid item xs={12} sm={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className="w-100"
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
            <Grid item xs={12} sm={3}>
              <Button
                className="mt-4 w-100"
                variant="contained"
                color="primary"
                size="large"
                onClick={handleFindCasesClick}
              >
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
