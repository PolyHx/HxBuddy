import React, { useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl } from '@mui/material';

import Select, { SelectChangeEvent } from '@mui/material/Select';

import { IChallenge } from '../../types';

type Props = {
  challenge: IChallenge;
  setChallenges: (challenge: IChallenge) => void;
};

const challengesList: IChallenge[] = [
  { id: 'challenge1', name: 'Challenge 1', value: 10 },
  { id: 'challenge2', name: 'Challenge 2', value: 20 },
  { id: 'challenge3', name: 'Challenge 3', value: 30 },
  { id: 'challenge4', name: 'Challenge 4', value: 40 },
  { id: 'challenge5', name: 'Challenge 5', value: 50 },
  { id: 'challenge6', name: 'Challenge 6', value: 60 },
];

const SelectChallenges = ({ challenge, setChallenges }: Props) => {
  const handleChange = (challenge: IChallenge) => {
    console.log(challenge);
    setChallenges(challenge);
  };

  return (
    <Box sx={{ minWidth: 0, marginTop: 3, marginRight: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Challenge</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={challenge.value}
          label="Challenge"
        >
          {challengesList.map((challenge) => (
            <MenuItem
              key={challenge.id}
              value={challenge.value}
              onClick={() => handleChange(challenge)}
            >
              {challenge.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectChallenges;
