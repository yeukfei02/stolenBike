import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: '2em auto',
      maxWidth: 1000,
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
  const classes = useStyles();
  const history = useHistory();

  const handlePaperViewTitleClick = (id: string) => {
    history.push(`/case/${id}`);
  };

  const renderDisplayResult = () => {
    let paperViewResultList = null;

    if (props.resultList) {
      paperViewResultList = props.resultList.map((item: any, i: number) => {
        const occurredDate = moment(item.occurred_at).format("ddd MMM DD YYYY");

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
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                      onClick={() => handlePaperViewTitleClick(item.id)}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {item.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {occurredDate} - {item.address}
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
  };

  return <div className={classes.root}>{renderDisplayResult()}</div>;
}

export default DisplayResult;
