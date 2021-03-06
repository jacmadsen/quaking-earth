import React from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import {
  updateViewSettings,
  fetchData
} from '../actions'

const useStyles = makeStyles((theme) => ({
  root: {
		margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
	field: {
		'margin-bottom': theme.spacing(2),
    'display': 'block'
	},
  note: {
    "color": "red",
    "font-style": "italic"
  }
}));

const Settings = ({onUpdateSettings, onUpdateData, index, settings}) => {

  const handleSubmit = e => {
    e.preventDefault()
    const settings = Object.values(e.target).slice(0,6).reduce(
      (result, setting) => {
        result[setting.id] = setting.value
        return result
      }, {}
    )
    onUpdateData(index,settings)
  }

  const handleChange = e => {
    const newSettings = {...settings}
    newSettings[e.target.id] = e.target.value
    onUpdateSettings(index, newSettings)
  }

	const classes = useStyles();

  const settingKeys = settings ? Object.keys(settings) : null

  const settingAttributes = {
    name: {
      label: 'Name',
      type: 'text'
    },
    location: {
      label: 'Location',
      type: 'text'
    },
    startTime: {
      label: 'Start Date',
      type: 'date'
    },
    endTime: {
      label: 'End Date',
      type: 'date'
    },
    magMin: {
      label: 'Minimum Magnitude',
      type: 'text'
    },
    magMax: {
      label: 'Maximum Magnitude',
      type: 'text'
    }
  }

	return (
		<Paper className={classes.root}>
			<form onSubmit={handleSubmit}>
				<h2>Earthquake Settings</h2>
        {
          settingKeys && settingKeys.map(
            key => <TextField
              key={key}
    					id={key}
    					className={classes.field}
    					label={settingAttributes[key].label}
              type={settingAttributes[key].type}
    					value={settings[key]}
              onChange={handleChange}
    				/>
          )
        }

				<Button
					variant="contained"
					type="submit"
					startIcon={<SaveIcon />}
				>
				Update
				</Button>
        <p className={classes.note}>
          Displays maximum 100 datapoints from up to one month of data
        </p>
			</form>
		</Paper>
	)
}

const mapStateToProps = state => {
  if (!state.data.length) return {}
  const currentData = state.data[state.currentIndex]
  const settings = currentData.settings
	return {
    index: state.currentIndex,
		settings: settings
	};
};

const mapDispatchToProps = dispatch => ({
  onUpdateSettings: (index, settings) => {
    return dispatch(
      updateViewSettings(index, settings)
    )
  },
  onUpdateData: (index, settings) => {
    return dispatch(
      fetchData(index, settings)
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
