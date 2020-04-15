import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: '2em auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
      border: '0.1em black solid',
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
);

function DisplayResult(props: any) {
  console.log("props.resultList = ", props.resultList);

  const classes = useStyles();

  const renderDisplayResult = () => {
    let paperViewResultList = null;

    if (props.resultList) {
      paperViewResultList = props.resultList.map((item: any, i: number) => {
        return (
          <Paper key={i} className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="" src={item.media.image_url_thumb} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {item.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.address}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        );
      });
    }

    return paperViewResultList;
  }

  return (
    <div className={classes.root}>
      {renderDisplayResult()}
    </div>
  );
}

export default DisplayResult;
