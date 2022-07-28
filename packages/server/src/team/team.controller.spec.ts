import { Test, TestingModule } from '@nestjs/testing';
import { UpdateWriteOpResult } from 'mongoose';
import { User } from 'src/user/user.schema';
import { TeamController } from './team.controller';
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

describe('TeamController', () => {
  let controller: TeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [
        {
          provide: TeamService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockTeams[0]),
            findAll: jest.fn().mockResolvedValue(mockTeams),
            findOne: jest.fn().mockResolvedValue(mockTeams[0]),
            isMemberOfTeam: jest.fn().mockResolvedValue(true),
            update: jest.fn().mockResolvedValue(mockUpdateResult),
            remove: jest.fn().mockResolvedValue(mockUpdateResult),
            joinTeam: jest.fn().mockResolvedValue(mockUpdateResult),
          },
        },
      ],
    }).compile();

    controller = module.get<TeamController>(TeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a team', () => {
    expect(controller.create({ name: 'team' })).resolves.toEqual(mockTeams[0]);
  });

  it('should get all teams', () => {
    expect(controller.findAll()).resolves.toEqual(mockTeams);
  });

  it('should get a team', () => {
    expect(controller.findOne('0')).resolves.toEqual(mockTeams[0]);
  });

  it("should change a team's name", () => {
    expect(
      controller.update({ user: mockUser }, '0', { name: 'A new team name' }),
    ).resolves.toEqual(mockUpdateResult);
  });

  it('should remove a team', () => {
    expect(controller.remove({ user: mockUser }, '0')).resolves.toEqual(
      mockUpdateResult,
    );
  });

  it('should join a team', () => {
    expect(controller.joinTeam('0', '0')).resolves.toEqual(mockUpdateResult);
  });
});
