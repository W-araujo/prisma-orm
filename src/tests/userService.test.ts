import { UserService } from '../services/UserService'
import { prisma } from '../prisma/utils/client'

describe('UserService', () => {
    let userService: UserService;
    let spyCreate: jest.SpyInstance;
    let spyFindMany: jest.SpyInstance;

    beforeEach(() => {
        userService = new UserService()
        spyCreate = jest.spyOn(prisma.user, 'create')
        spyFindMany = jest.spyOn(prisma.user, 'findMany')
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Should create a new user', async () => {
        const user = {
            name: "john doe",
            email: "a@mail.com",
            birthday: new Date("2024-03-03T04:51:05.499Z"),
            address: "rua y",
            urlImage: "no-image",
            createdAt: "2024-03-03T04:51:05.499Z",
            updatedAt: "2024-03-03T04:51:05.499Z"
        }

        spyCreate.mockReturnValue({
            id: 'mocked-id',
            name: "john doe",
            email: "a@mail.com",
            birthday: new Date("2024-03-03T04:51:05.499Z"),
            address: "rua y",
            urlImage: "no-image",
            createdAt: "2024-03-03T04:51:05.499Z",
            updatedAt: "2024-03-03T04:51:05.499Z"
        })

        const createUser = await userService.create(user.name, user.email, user.birthday, user.address, user.urlImage)

        expect(spyCreate).toHaveBeenCalledTimes(1);
        expect(createUser.id).toEqual('mocked-id')
        expect(createUser.name).toEqual(user.name)
    })

    it('Should list users', async () => {
        spyFindMany.mockReturnValue(
            [
                {
                    id: 'mocked-id',
                    name: "john doe 1",
                    email: "jd1@mail.com",
                    birthday: new Date("2024-03-03T04:51:05.499Z"),
                    address: "rua y",
                    urlImage: "no-image",
                    createdAt: "2024-03-03T04:51:05.499Z",
                    updatedAt: "2024-03-03T04:51:05.499Z"
                },
                {
                    id: 'mocked-id',
                    name: "john doe 2",
                    email: "jd2@mail.com",
                    birthday: new Date("2024-03-03T04:51:05.499Z"),
                    address: "rua y",
                    urlImage: "no-image",
                    createdAt: "2024-03-03T04:51:05.499Z",
                    updatedAt: "2024-03-03T04:51:05.499Z"
                }
            ])

        const listUsers = await userService.listAll(1, 2)

        expect(spyFindMany).toHaveBeenCalledTimes(1);
        expect(listUsers.length).toBe(2)
        expect(listUsers[0].name).toBe('john doe 1')
    })
})