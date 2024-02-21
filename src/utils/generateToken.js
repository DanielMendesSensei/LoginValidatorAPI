import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d' // Expira em 15 dias
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // apenas em milisegundos
        httpOnly: true, // Previne ataques XSS, cross-site scripting attacks
        sameSite: "strict", // prevent CSRF attacks cross-site request forgery attack
        secure: process.env.NODE_ENV !== "development" // Mude no .env quando entrar em produção
    })
}

export default generateTokenAndSetCookie