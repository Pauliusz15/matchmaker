import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Grid, Typography, Container, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '../Toolbar';
import { LoginForm } from './LoginForm';
import { ROUTES } from '../../../constants/routes';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles(theme => ({
  linkToRegister: {
    color: theme.palette.secondary.main,
    textDecorationColor: theme.palette.secondary.main
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(3, 0, 0, 0)
  }
}));

export const Login: React.FC = () => {
  const classes = useStyles();
  const [cookie] = useCookies(['user']);
  return (
    <Fragment>
      {cookie.user && <Redirect to={ROUTES.Main} />}
      <Toolbar title="Prisijungimas" />
      <Container maxWidth="xs">
        <Paper className={classes.paper}>
          <LoginForm />
          <Grid container justify="flex-end">
            <Grid item>
              <Link className={classes.linkToRegister} to={ROUTES.SignUp}>
                <Typography variant="body2">
                  Neturi paskyros? Registruokis
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
};
