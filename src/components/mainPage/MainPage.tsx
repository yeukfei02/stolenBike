import React, { useState } from 'react';
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

const ROOT_URL = "https://bikewise.org/api/v2";

async function getIncidents(caseDescription: string, fromDate: number, toDate: number, page: number) {
  const response = await axios.get(`${ROOT_URL}/incidents`,
    {
      params: {
        page: page || 1,
        per_page: 10,
        occurred_after: fromDate,
        occurred_before: toDate,
        query: caseDescription
      }
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

    const result = await getIncidents(caseDescription, formDateNum, toDateNum, 1);
    console.log("result = ", result);
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
    </div>
  );
}

export default MainPage;
