import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import { User } from '@prisma/client';
const userService = new UserService()

class UserController {
    async create(req: Request, res: Response) {
        try {
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
        }
    }

    async listAll(req: Request, res: Response) {
        try {
            const listAll = await userService.listAll()
            return res.status(200).json(listAll)
        } catch (error) {
            console.log(error)
            return res.status(404).json({ error: "Something went wrong!" });
        }
    }
}

export { UserController }