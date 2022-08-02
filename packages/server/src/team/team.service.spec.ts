import { HttpException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { User } from 'src/user/user.schema';
import { TeamDocument } from './team.schema';
import { TeamService } from './team.service';

const mockTeams = [
  {
    _id: '0',
    name: 'A team',
    participants: [],
  },
  {
    _id: '1',
    name: 'Better than the first team',
    participants: [],
  },
];

const mockUpdateResult: UpdateWriteOpResult = {
  acknowledged: true,
  modifiedCount: 0,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 0,
};

const mockUser: User = {
  email: 'user@example.com',
  role: 'participant',
  password: 'password',
  participantId: '0',
};

describe('TeamService', () => {
  let service: TeamService;
  let model: Model<TeamDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        {
          provide: getModelToken('Team'),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TeamService>(TeamService);
    model = module.get<Model<TeamDocument>>(getModelToken('Team'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // it('should create a team', async () => {
  //   jest.spyOn(model, 'create').mockReturnValue({
  //     save: jest.fn().mockResolvedValue(mockUpdateResult),
  //   } as any);
  //   const team = await service.create({ name: 'Test Team' });
  //   expect(team).toEqual(mockUpdateResult);
  // });

  it('should return all teams', async () => {
    jest.spyOn(model, 'find').mockResolvedValue(mockTeams);
    const teams = await service.findAll();
    expect(teams).toEqual(mockTeams);
  });

  it('should return a team', async () => {
    jest.spyOn(model, 'findOne').mockResolvedValue(mockTeams[0]);
    const team = await service.findOne('0');
    expect(team).toEqual(mockTeams[0]);
  });

  it('should change the name of a team', async () => {
    jest.spyOn(model, 'updateOne').mockResolvedValue(mockUpdateResult);
    jest.spyOn(service, 'isMemberOfTeam').mockResolvedValue(true);
    const team = await service.update('0', '0', { name: 'New Name' });
    expect(team).toEqual(mockUpdateResult);
  });

  it("shouldn't change the name of a team", async () => {
    jest.spyOn(model, 'updateOne').mockResolvedValue(mockUpdateResult);
    const team = service.update('0', '0', { name: 'New Name' });
    expect(team).rejects.toThrow(HttpException);
  });

  it('should remove a team', async () => {
    jest.spyOn(model, 'remove').mockResolvedValue(mockUpdateResult);
    jest.spyOn(service, 'isMemberOfTeam').mockResolvedValue(true);
    const team = await service.remove('0', '0');
    expect(team).toEqual(mockUpdateResult);
  });

  it("shouldn't remove a team", async () => {
    jest.spyOn(model, 'remove').mockResolvedValue(mockUpdateResult);
    const team = service.remove('0', '0');
    expect(team).rejects.toThrow(HttpException);
  });

  it('should join a team', async () => {
    jest.spyOn(model, 'updateOne').mockResolvedValue(mockUpdateResult);
    jest.spyOn(model, 'findOne').mockResolvedValue(null);
    const team = await service.joinTeam('0', '0');
    expect(team).toEqual(mockUpdateResult);
  });

  it('should join a team', async () => {
    jest.spyOn(model, 'updateOne').mockResolvedValue(mockUpdateResult);
    const team = service.joinTeam('0', '0');
    expect(team).rejects.toThrow(HttpException);
  });
});
