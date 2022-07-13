import React, { useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl } from '@mui/material';

import Select, { SelectChangeEvent } from '@mui/material/Select';

const SelectChallenges = ({ challenge, setChallenges }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setChallenges(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Challenge</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={challenge}
          label="Challenhe"
          onChange={handleChange}
        >
          <MenuItem value={10}>Challenge 1</MenuItem>
          <MenuItem value={20}>Challenge 2</MenuItem>
          <MenuItem value={30}>Challenge 3</MenuItem>
          <MenuItem value={30}>Challenge 4</MenuItem>
          <MenuItem value={30}>Challenge 5</MenuItem>
          <MenuItem value={30}>Challenge 6</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectChallenges;
