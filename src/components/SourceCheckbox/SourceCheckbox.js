import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function SourceCheckbox() {
  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="completed"
          control={<Checkbox color="primary" />}
          label="Completed"
          labelPlacement="start"
        />
      </FormGroup>
    </FormControl>
  );
}