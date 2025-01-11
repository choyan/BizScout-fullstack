import { Test, TestingModule } from '@nestjs/testing';
import { UserActivityController } from './user-activity.controller';
import { UserActivityService } from './user-activity.service';
import { faker } from '@faker-js/faker';
import { Event, Prisma } from '@prisma/client'; // Make sure to import the Event enum from Prisma
import { PaginationService } from '../../common/pagination.service';
import { PrismaService } from '../../prisma/prisma.service';

// Define the metadata type
type UserActivityMetadata = {
  email: string;
  username: string;
  signupSource: 'web' | 'mobile' | 'referral';
};

// Create mock activities
const mockActivities = [
  {
    id: faker.database.mongodbObjectId(),
    userId: faker.database.mongodbObjectId(),
    event: 'SIGNUP' as Event,
    timestamp: new Date('2024-01-15'),
    metadata: {
      email: faker.internet.email(),
      username: faker.person.fullName(),
      signupSource: 'web',
    } as Prisma.JsonValue,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: faker.database.mongodbObjectId(),
    userId: faker.database.mongodbObjectId(),
    event: 'LOGIN' as Event,
    timestamp: new Date('2024-01-16'),
    metadata: {
      loginSource: 'mobile',
    } as Prisma.JsonValue,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: faker.database.mongodbObjectId(),
    userId: faker.database.mongodbObjectId(),
    event: 'LOGOUT' as Event,
    timestamp: new Date('2024-01-14'),
    metadata: {
      logoutReason: 'session_expired',
    } as Prisma.JsonValue,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('UserActivityController', () => {
  let controller: UserActivityController;
  let service: UserActivityService;

  // Create mock service
  // Create a fresh mock for each test
  const mockUserActivityService = {
    createUserActivity: jest.fn((input) => {
      return Promise.resolve({
        id: faker.database.mongodbObjectId(),
        ...input,
      });
    }),
    userActivities: jest.fn(() => Promise.resolve(mockActivities)),
  };

  const mockPaginationServie = {
    pagination: jest.fn(),
  };

  const prismaServiceMock = {
    userActivity: {
      findMany: jest.fn(() => Promise.resolve(mockActivities)),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserActivityController],
      providers: [
        {
          provide: UserActivityService,
          useValue: mockUserActivityService,
        },
        {
          provide: PaginationService,
          useValue: mockPaginationServie,
        },
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UserActivityController>(UserActivityController);
    service = module.get<UserActivityService>(UserActivityService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUserActivities', () => {
    it('should successfully create a user activity', async () => {
      // Act
      const result = await controller.createUserActivities();

      // Assert
      expect(service.createUserActivity).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('userId');
      expect(result).toHaveProperty('event', 'SIGNUP');
      expect(result).toHaveProperty('metadata');
    });

    it('should validate metadata structure', async () => {
      // Act
      await controller.createUserActivities();

      // Get the service call arguments to validate what was sent
      const serviceCallArg = (service.createUserActivity as jest.Mock).mock
        .calls[0][0];
      const metadata = serviceCallArg.metadata as UserActivityMetadata;

      // Assert metadata structure
      expect(metadata).toBeDefined();
      expect(typeof metadata.email).toBe('string');
      expect(typeof metadata.username).toBe('string');
      expect(['web', 'mobile', 'referral']).toContain(metadata.signupSource);
    });

    it('should create valid email in metadata', async () => {
      // Act
      await controller.createUserActivities();

      // Get the service call arguments
      const serviceCallArg = (service.createUserActivity as jest.Mock).mock
        .calls[0][0];
      const metadata = serviceCallArg.metadata as UserActivityMetadata;

      // Assert
      expect(metadata.email).toMatch(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      );
    });

    it('should throw an error when service fails', async () => {
      // Arrange
      const errorMessage = 'Failed to create user activity';
      (service.createUserActivity as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      // Act & Assert
      await expect(controller.createUserActivities()).rejects.toThrow(
        errorMessage,
      );
    });

    it('should create valid MongoDB ObjectId for userId', async () => {
      // Act
      await controller.createUserActivities();

      // Get the service call arguments
      const serviceCallArg = (service.createUserActivity as jest.Mock).mock
        .calls[0][0];

      // Assert
      expect(serviceCallArg.userId).toMatch(/^[0-9a-fA-F]{24}$/);
    });
  });
});
