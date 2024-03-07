import User from "../models/User.model.js";
import bcrypjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res)=>{
    try {
        const {username, password, confirmPassword} = req.body;
        
        if(password.length < 6){
            return res.status(400).json({error: "Sua senha precisa ter no mínimo 6 caracteres"})
        }

        if(!username || !password){
            return res.status(400).json({error: "Valores de um dos campos nulos"}) // Verifica se um dos campos é nulo
        }

        if(password !== confirmPassword){
            return res.status(400).json({error: "Senhas não conferem"}); // Verifica se o usuário inseriu a mesma senha no campo de confirmação
        }
        
        const user = await User.findOne({username}) // Verifica se existe o usuário no DB
        
        if(user){
            return res.status(400).json({error: "Esse username já existe!"}) // verifica username já existe
        }

        // HASH PASSWORD AQUI
        const salt = await bcrypjs.genSalt(10); // A medida que esse número for maior, mais seguro fica, porém mais lento será o processo
        const hashedPassword = await bcrypjs.hash(password, salt);

        // CRIA UM NOVO USUÁRIO
        const newUser = new User({
            username,
            password: hashedPassword,
        })

        // NOVO USUÁRIO?
        if(newUser){
            // Gera o token cookie com JWT
            generateTokenAndSetCookie(newUser._id, res)

            // Salva os dados no banco
            await newUser.save();

            // Retorna o usuário cadastrado como resposta
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                mensagem: `Usuário ${username} registrado com sucesso!`
            });
        } else {
            res.status(400).json({ error: "Dados de usuário inválidos!"})
        };

    // Caso algo dê errado ele envia uma mensagem tanto no lado do cliente quanto no servidor
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Erro interno do servidor"})
    }
};

export const login = async (req, res)=>{
    try {
        const { username, password } = req.body
        const user = await User.findOne({username})
        
        const isPasswordCorrect = await bcrypjs.compare(password, user?.password || "")
        
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Usuário ou senha Inválidos!"})
        }

        // Gera o token cookie com JWT
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            mensagem: "Login feito com sucesso!"
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Erro interno do servidor"})
    }
};

export const logout = (req, res)=>{
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message: "Logout feito com sucesso!"})

    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Erro interno do servidor"})
    }
};