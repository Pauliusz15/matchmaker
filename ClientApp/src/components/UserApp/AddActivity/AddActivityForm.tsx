﻿import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Button,
  TextField,
  Grid,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
  Slider,
  MenuItem
} from '@material-ui/core';
import { Toolbar } from '../Toolbar';
import { ICategory } from '../../../types/categories';
import { IPlayground } from '../../../types/playgrounds';
import { useCookies } from 'react-cookie';
import { ROUTES } from '../../../constants/routes';
import { Redirect } from 'react-router-dom';
//import { Formik } from "formik";
//import * as yup from "yup";

/* unfinished yup validation
let FormSchema = yup.object().shape({
  category: yup.string().required("Pasirinkite kategoriją"),
  date: yup.string().required("Pasirinkite datą."),
*/

const useStyles = makeStyles((theme) => ({
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
  formControl: {
    margin: theme.spacing(2, 2, 1, 2),
    width: '100%'
  },
  radioGroup: {
    margin: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link: {
    color: theme.palette.secondary.main,
    textDecorationColor: theme.palette.secondary.main
  }
}));

interface IPlayerLevel {
  value: number | number[],
  error: string
}

export const AddActivityForm: React.FC = () => {
  const classes = useStyles();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [playgrounds, setPlaygrounds] = useState<IPlayground[]>([]);
  const [category, setCategory] = useState({
    value: '',
    error: ''
  });
  const [date, setDate] = useState({
    value: '',
    error: ''
  });
  const [gender, setGender] = useState({
    value: '',
    error: ''
  });
  const [playground, setPlayground] = useState({
    value: '',
    error: ''
  });
  const [playerLevel, setPlayerLevel] = useState<IPlayerLevel>({
    value: 2,
    error: ''
  });
  const [numberOfParticipants, setNumberOfParticipants] = useState({
    value: '',
    error: ''
  });
  const [cookies] = useCookies(['loginToken']);

  const adjustSpellingOfPlace = (size: number): string => {
    if (size === 1) {
      return ' vieta';
    }
    else if (size > 1 && size < 10) {
      return ' vietos';
    }
    return ' vietų';
  }

  async function fetchData() {
    try {
      const resCategories = await fetch("https://sportmatchmaker.azurewebsites.net/api/categories");
      const categories = await resCategories.json();
      setCategories(categories);
    }
    catch (error) {
      console.error(error);
    }
    try {
      const resPlaygrounds = await fetch("https://sportmatchmaker.azurewebsites.net/api/playgrounds");
      const playgrounds = await resPlaygrounds.json();
      setPlaygrounds(playgrounds);
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (category.value === '' || category.error !== '') {
      setCategory({ value: '', error: 'Įveskite kategoriją' });
      return;
    }
    if (date.value === '' || date.error !== '') {
      setDate({ value: '', error: 'Pateikite datą' });
      return;
    }
    if (gender.value === '' || gender.error !== '') {
      setGender({ value: '', error: 'Pasirinkite lytį' });
      return;
    }
    if (playground.value === '' || playground.error !== '') {
      setPlayground({ value: '', error: 'Pasirinkite aikštelę' });
      return;
    }
    if (!playerLevel.value || playerLevel.error !== '') {
      setPlayerLevel({ value: 2, error: 'Pasirinkite žaidėjų lygį' });
      return;
    }
    if (numberOfParticipants.value === '' || parseInt(numberOfParticipants.value) <= 0 || numberOfParticipants.error !== '') {
      setNumberOfParticipants({ value: '0', error: 'Įveskite žaidėjų skaičių' });
      return;
    }
    const activity = {
      category: category.value,
      date: date.value,
      gender: gender.value,
      playground: playground.value,
      playerLevel: playerLevel.value,
      numberOfParticipants: parseInt(numberOfParticipants.value),
      price: 0
    };
    console.log("Activity: ", activity);
    try {
      const response = await fetch('https://sportmatchmaker.azurewebsites.net/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cookies.loginToken },
        body: JSON.stringify(activity),
      })
      console.log(response);
    }
    catch (error) {
      console.error(error);
    }
  };

  return ( 
    <Fragment>
      {cookies.loginToken === '' && <Redirect to={ROUTES.Main} />}
      <Toolbar title="Pridėti naują veiklą" />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={() => handleSubmit()}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={category.error.length > 0}
                  fullWidth
                  select
                  id="select-category"
                  label="Kategorija"
                  name="category"
                  value={category.value}
                  onChange={e =>
                    setCategory({ value: e.target.value, error: '' })
                  }
                  helperText={category.error}
                >
                  {categories.map((category) => (
                    <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
                  ))}
                </TextField>

              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={playground.error.length > 0}
                  fullWidth
                  select
                  id="playground"
                  label="Vieta"
                  name="playground"
                  value={playground.value}
                  onChange={e =>
                    setPlayground({ value: e.target.value, error: '' })
                  }
                  helperText={playground.error}
                >
                  {playgrounds && playgrounds.map((playground) => (
                    <MenuItem value={playground.id} key={playground.id}>{playground.name + ' ' + playground.size + adjustSpellingOfPlace(playground.size)}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={date.error.length > 0}
                  fullWidth
                  variant="outlined"
                  id="date"
                  label="Data"
                  name="date"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={date.value}
                  onChange={e =>
                    setDate({ value: e.target.value, error: '' })
                  }
                  helperText={date.error}
                />

              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={numberOfParticipants.error.length > 0}
                  variant="outlined"
                  fullWidth
                  value={numberOfParticipants.value}
                  onChange={e =>
                    setNumberOfParticipants({ value: e.target.value, error: '' })
                  }
                  name="numberOfParticipants"
                  label="Žaidėjų kiekis"
                  type="number"
                  id="numberOfParticipants"
                  helperText={numberOfParticipants.error}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Žaidėjų lytis</FormLabel>
                <RadioGroup 
                  aria-label="Žaidėjų lytis" 
                  name="gender" 
                  onChange={e => setGender({ value: e.target.value, error: '' })}
                >
                  <FormControlLabel value="Moterys" control={<Radio />} label="Moterys" />
                  <FormControlLabel value="Vyrai" control={<Radio />} label="Vyrai" />
                  <FormControlLabel value="Mišri grupė" control={<Radio />} label="Mišri grupė" />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Sudėtingumo lygis</FormLabel>
                <Slider
                  id="playerLevel"
                  name="playerLevel"
                  defaultValue={2}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={3}
                  value={playerLevel.value}
                  onChangeCommitted={(event, value) =>
                    setPlayerLevel({ value: value, error: '' })
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sukurti
            </Button>
          </form>
        </div>
      </Container>
    </Fragment>
  );
};