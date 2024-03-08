## 👀Visão Geral

Esta API foi desenvolvida em JavaScript/Node.js e fornece acesso ao recurso validação de login, gerando um token de autenticação com JWT. Utiliza Express para o roteamento e manipulação de requisições HTTP, Bcrypt.js para a criptografia de senhas e MongoDB como banco de dados.

## 📤Last Update

Versão 1.0.1 -> fix: Fixed CORS | build: add new scripts in package.json

## ⚙️Configuração do Ambiente

Certifique-se de configurar o arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
PORT = 3000
MONGO_DB_URI = seu_mongodb_uri
JWT_SECRET = seu_jwt_secret
```

## ➡️Endpoints

### Criação de Usuário

- **Endpoint**: `/api/auth/signup`
- **Método HTTP**: POST
- **Descrição**: Cria um novo usuário e gera um token JWT que pode ser usado em recursos protegidos.

#### Parâmetros de Requisição

- `username`: O username do usuário.
- `password`: A senha do usuário.
- `confirmPassword`: A confirmação da senha do usuário.

#### Exemplo de Requisição

```json
POST /api/auth/signup
{
  "username": "username_exemplo",
  "password": "senha123",
  "confirmPassword": "senha123"
}
```

#### Resposta

```json
{
  "_id": "65d65e839cc9cf98766173e2c",
  "username": "username_exemplo",
  "mensagem": "Usuário username_exemplo registrado com sucesso!"
}
```

### Autenticação de Usuário

- **Endpoint**: `/api/auth/login`
- **Método HTTP**: POST
- **Descrição**: Autentica um usuário e gera um token JWT que pode ser usado em recursos protegidos.

#### Parâmetros de Requisição

- `username`: O username do usuário.
- `password`: A senha do usuário.

#### Exemplo de Requisição

```json
POST /api/auth/login
{
  "username": "username_exemplo",
  "password": "senha123",
}
```

#### Resposta

```json
{
  "_id": "65d65e839cc9cf98766173e2c",
  "username": "username_exemplo",
  "mensagem": "Login feito com sucesso!"
}
```

### Logout de Usuário

- **Endpoint**: `/api/auth/logout`
- **Método HTTP**: POST
- **Descrição**: Encerra a seção do usuário, apagando também o token JWT.

#### Exemplo de Requisição

```json
POST /api/auth/logout
```

#### Resposta

```json
{
  "message": "Logout feito com sucesso!"
}
```

## 🗣FAQ

### 🤔Onde encontro a URI do MongoDB?

- Você pode encontrar a URI do MongoDB no serviço de hospedagem do MongoDB que você está utilizando ou no seu ambiente de desenvolvimento local

### 🤔Como gero um JWT secret seguro?

- Você pode gerar um JWT secret seguro usando uma biblioteca de geração de segredos aleatórios e armazená-los em uma variável de ambiente protegida;
- Você pode gerar também passando o seguinte comando no seu termnial bash (pode ser o do git): `openssl rand -base64 32`, na qual irá retornar um JWT secret de 32 caracteres.
