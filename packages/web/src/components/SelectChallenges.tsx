import React, { useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl } from '@mui/material';

import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = { challenge: any; setChallenges: (challenge: any) => void };

const SelectChallenges = ({ challenge, setChallenges }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    setChallenges(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 0, marginTop: 3, marginRight: 2 }}>
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
