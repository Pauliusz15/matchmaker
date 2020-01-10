import React, { useState, Fragment, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid, TextField, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LOGIN_URL } from '../../../constants/urls';
import {
  IUserActivityAction,
  IActivityAction
} from '../../../types/activities';
import { useCookies } from 'react-cookie';
import {
  setLoadedOrErrorActivities,
  setUserActivities
} from '../../../actions/activities';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

interface ITextField {
  value: string;
  error: boolean;
}

interface ILoginData {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const classes = useStyles();

  const userActivityDispatch: Dispatch<IUserActivityAction> = useDispatch();
  const activityDispatch: Dispatch<IActivityAction> = useDispatch();

  const [email, setEmail] = useState<ITextField>({ value: '', error: false });
  const [password, setPassword] = useState<ITextField>({
    value: '',
    error: false
  });
  const [, setCookies] = useCookies(['loginToken']);
  const [unauthorizedSnackbarState, setUnauthorizedSnackbarState] = useState<
    boolean
  >(false);

  const handleSubmit = async () => {
    if (!email.value) setEmail({ value: email.value, error: true });
    if (!password.value) setPassword({ value: password.value, error: true });

    const loginObj: ILoginData = {
      email: email.value,
      password: password.value
    };

    if (email.value && password.value) {
      const response = await sendForm(LOGIN_URL, loginObj);
      if (response.statusText === 'OK') {
        const json = await response.json();
        const token = await json.tokenString;
        setCookies('loginToken', token, { path: '/', maxAge: 31536000 });
        userActivityDispatch(await setUserActivities(token));
        activityDispatch(await setLoadedOrErrorActivities());
      } else if (response.statusText === 'Unauthorized') {
        setUnauthorizedSnackbarState(true);
      }
    }
  };

  return (
    <Fragment>
      <div className={classes.paper}>
        <div className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={email.error}
                variant="outlined"
                fullWidth
                autoFocus
                id="email"
                label="El. paštas"
                name="email"
                autoComplete="email"
                value={email.value}
                onChange={e =>
                  setEmail({ value: e.target.value, error: false })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={password.error}
                variant="outlined"
                fullWidth
                name="password"
                label="Slaptažodis"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password.value}
                onChange={e =>
                  setPassword({ value: e.target.value, error: false })
                }
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            className={classes.submit}
            onClick={() => handleSubmit()}
          >
            Prisijungti
          </Button>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={unauthorizedSnackbarState}
        autoHideDuration={6000}
        onClose={() => setUnauthorizedSnackbarState(false)}
        message={<span>Neteisingas el. pašto adresas arba slaptažodis</span>}
      />
    </Fragment>
  );
};

const sendForm = async (url: string, obj: ILoginData): Promise<Response> => {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });
};
