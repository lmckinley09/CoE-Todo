import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface IToggle {
	onChange: (event: any) => void;
	checked: boolean;
	id: string;
}

const Toggle = (props: IToggle) => {
	return (
		<FormGroup>
			<FormControlLabel
				control={
					<Switch
						id={props.id}
						data-testid={props.id}
						checked={props.checked}
						onChange={props.onChange}
					/>
				}
				label="Show Done"
				labelPlacement="top"
			/>
		</FormGroup>
	);
};

export default Toggle;
