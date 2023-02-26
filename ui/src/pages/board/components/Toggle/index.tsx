import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Toggle = () => {
	return (
		<FormGroup>
			<FormControlLabel
				control={<Switch defaultChecked />}
				label="View Completed"
				labelPlacement="top"
			/>
		</FormGroup>
	);
};

export default Toggle;
