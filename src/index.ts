import {Request, Response, Router} from "express"
import fs from "fs"

const router: Router = Router()

type TUser = {
    name: string
    todos: string[]
}

let users: TUser[] = []

fs.readFile("data/users.json", "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
        console.error(err)
        return
    }
    try {
        users = JSON.parse(data)

    } catch (error: any) {
        console.error("Error")
    }
})

router.get("/", (req: Request, res: Response) => {
    res.json(users)
})

router.post("/add", (req: Request, res: Response) => {
    const { name, todo } = req.body;
    let user = users.find((u) => u.name === name);
    if (!user) {
        user = { name, todos: [] };
        users.push(user);
    }

    user.todos.push(todo)
    fs.writeFile("data/users.json", JSON.stringify(users), (err: NodeJS.ErrnoException | null) => {
        if (err) {
            console.error(err)
            return
        }
        res.send(`Todo added successfully for user ${name}.`)
    })
})


export default router