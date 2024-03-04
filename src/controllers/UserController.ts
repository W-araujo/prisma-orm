import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import { User } from '@prisma/client';
import { connectPrisma, disconnectPrisma } from '../prisma/utils/connectDisconnect';
const userService = new UserService()

class UserController {
    async create(req: Request, res: Response) {
        try {
            await connectPrisma()

            const data: User = req.body
            const user = await userService.create(
                data.name,
                data.email,
                data.birthday,
                data.address,
                data.urlImage,
            );
            return res.status(200).json(user);
        } catch (error) {
            console.log(error)
            return res.status(404).json({ error: "Something went wrong!" });
        } finally {
            await disconnectPrisma()
        }
    }

    async listAll(req: Request, res: Response) {
        try {
            const page = req.query.page
            const pageSize = req.query.pageSize
            const listAll = await userService.listAll(Number(page), Number(pageSize))
            return res.status(200).json(listAll)
        } catch (error) {
            console.log(error)
            return res.status(404).json({ error: "Something went wrong!" });
        }
    }
}

export { UserController }