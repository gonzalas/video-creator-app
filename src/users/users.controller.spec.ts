import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './entity/users.providers';
import { getModelToken } from '@nestjs/sequelize';
import { User } from './entity/user.entity';

const newUserMock = {
  name: 'Joe Doe',
  email: 'joe.doe@sample.com',
  username: 'Joe569',
  password: 'my-pass-456',
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, ...usersProviders],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create user', () => {
    it('Should return created true response for a valid user', async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      User.create = jest.fn().mockResolvedValue(true);
      const userCreatedResponse = await controller.registerUser(newUserMock);
      const expectedResponse = {
        created: true,
      };
      expect(userCreatedResponse).toEqual(expectedResponse);
    });

    it('Should return exception if an user already exists', async () => {
      User.findOne = jest.fn().mockResolvedValue(newUserMock);
      try {
        await controller.registerUser(newUserMock);
      } catch (exception) {
        const expectedErrorMessage = `Cannot register this user. Email ${newUserMock.email} already registered`;
        expect(exception.response.error).toEqual(expectedErrorMessage);
        expect(exception.response.status).toEqual(400);
      }
    });
  });
});
