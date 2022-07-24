import text from './textChallenge/en.json';

export interface IChallenge {
  name: string;
  id: keyof typeof text;
  value: number;
}

export interface ITeam {
  id: string;
  name: string;
  participants: IParticipant[];
}

export interface IParticipant {
  name: string;
}
