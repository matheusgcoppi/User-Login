const {
    PrismaClient
} = require("@prisma/client");

const prisma = new PrismaClient();

const bcrypt = require('bcrypt');

module.exports = {
    async createUser(req, res) {
        try {
            const {
                firstName,
                lastName,
                email,
                password,
                age,
                role
            } = req.body

            const salt = await bcrypt.genSalt();
            console.log(salt)

            const hash = await bcrypt.hash(password, salt)
            console.log(hash)

            const verifyemail = await prisma.UserInfo.findUnique({
                where: {
                    email
                }
            })

            if (verifyemail) {
                return res.json({
                    error: "there is a email with the same name, please change."
                })
            }

            const user = await prisma.UserInfo.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hash,
                    age: age,
                    role: role
                }
            });

            return res.json(user)

        } catch (error) {
            return res.json({
                error
            })

        }
    },

    async login(req, res) {
        try {

            const {email, password} = req.body

            const user = await prisma.UserInfo.findUnique({
                where: {
                    email : req.body.email
                }
            })  
            
            if(user)  {
                const match = await bcrypt.compare(password, user.password)
                if(match) {
                    return res.send("login")
                }
                else {
                    return res.send("There is something wrong with your password")
                }
                        
            }
            


        } catch (error) {
            return res.json({
                error
            })
        }
    }
}