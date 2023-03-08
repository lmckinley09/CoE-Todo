import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface IToggle {
	onChange: (event: any) => void;
	checked: boolean;
}

const Toggle = (props: IToggle) => {
	return (
		<FormGroup>
			<FormControlLabel
				control={<Switch checked={props.checked} onChange={props.onChange} />}
				label="Show Done"
				labelPlacement="top"
			/>
		</FormGroup>
	);
};

export default Toggle;
