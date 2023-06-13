# CRUD API

Esta é uma API RESTful que oferece operações CRUD para gerenciar usuários.

## Instalação

1. Certifique-se de ter o Node.js instalado: [Download Node.js](https://nodejs.org/)
2. Certifique-se de ter o Git instalado: [Download Git](https://git-scm.com/downloads)
3. Clone este repositório: `git clone https://github.com/acn3to/vagas.git` 
4. Acesse o diretório do projeto: `cd seu-projeto`
5. Instale as dependências: `npm install`

## Configuração

Antes de executar a API, você precisa configurar as seguintes variáveis de ambiente:

- `PORT`: Porta em que o servidor será executado.
- `JWT_SECRET`: Chave JWT.

## Uso

1. Inicie o servidor: `npm start`
2. Acesse a API através de: `http://localhost:{PORT}`

## Endpoints

A API possui os seguintes endpoints:

- `POST /login`: Realiza a autenticação do usuário.

- `GET /user`: Obtém informações do usuário autenticado. Requer autenticação com token.
- `GET /users`: Obtém a lista de usuários. Requer autenticação com token.
- `GET /user/readcount`: Obtém a contagem de leitura do usuário autenticado. Requer autenticação com token.
- `POST /users`: Cria um novo usuário. Requer validação dos dados do usuário.
- `PATCH /users`: Atualiza o usuário autenticado. Requer autenticação com token.
- `DELETE /users`: Exclui o usuário autenticado. Requer autenticação com token.

## Exemplos de Requisições

## POST /login

### Requisição


```http
POST /login HTTP/1.1
Content-Type: application/json

{
  "name": "Neto",
  "password": "12345"
}
```

### Retorno de sucesso

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYWRiZDVhMi04YTI3LTQyOTQtYmI3MS01MWY3MDdkY2FiZjEiLCJpYXQiOjE2ODY2Mjg5NjMsImV4cCI6MTY4NjYzMjU2M30.SaPpamgTRzR7_KIXUUY0lAr-8ZJCB5bjNlNaiEWq04s"
}
```

### Retorno de erro (Credenciais inválidas):

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Credenciais inválidas"
}
```

### Retorno de erro  (Usuário não encontrado):

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "message": "Usuário não encontrado"
}
```

## GET /user 

### Requisição


```http
GET /user?name=Neto HTTP/1.1
Authorization: Bearer {token}
```

### Retorno de sucesso

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "1adbd5a2-8a27-4294-bb71-51f707dcabf1",
  "name": "Neto",
  "job": "Developer",
  "isAdm": false
}
```

### Retorno de erro (Usuário não encontrado):

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "message": "Usuário não encontrado"
}
```

### Retorno de erro (Token de autenticação não fornecido):

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Token de autenticação não fornecido"
}
```

### Retorno de erro (Token de autenticação do tipo precisa ser do tipo Bearer Token):

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Token de autenticação do tipo precisa ser do tipo Bearer Token"
}
```

### Retorno de erro (Token de autenticação inválido):

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "message": "Token de autenticação inválido"
}
```

## GET /users 

### Requisição


```http
GET /users HTTP/1.1
Authorization: Bearer {token}
```

### Retorno de sucesso

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": "1adbd5a2-8a27-4294-bb71-51f707dcabf1",
    "name": "Neto",
    "job": "Developer",
    "isAdm": false
  },
  {
    "id": "2c71c3e9-9d16-4fb7-b0bc-fd2ab20e9d8d",
    "name": "Alice",
    "job": "Designer",
    "isAdm": true
  },
  ...
]
```

## GET /user/readcount

### Requisição


```http
GET /user/readcount?name=Neto HTTP/1.1
Authorization: Bearer {token}
```

### Retorno de sucesso

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "O usuário Neto foi lido 3 vez(es)."
}
```

## POST /users

### Requisição


```http
POST /users HTTP/1.1
Content-Type: application/json

{
  "name": "John Doe",
  "job": "Engineer",
  "password": "123456",
  "isAdm": false
}
```

### Retorno de sucesso

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "3c22f88b-94f5-4f5d-a072-8e2d2f464eaf",
  "name": "John Doe",
  "job": "Engineer",
  "isAdm": false
}
```
### Retorno de erro (Dados imcompletos):

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "message": "Dados incompletos do usuário"
}
```

### Retorno de erro (Nome inválido):

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "message": "Nome do usuário inválido"
}
```

### Retorno de erro (Nome já existe):

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "message": "Nome de usuário já existe"
}
```

## PATCH /users

### Requisição

```http
PATCH /users?id=1a2b3c4d HTTP/1.1
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "John Doe",
  "job": "Senior Developer"
}
```

### Retorno de sucesso

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "1a2b3c4d",
  "name": "John Doe",
  "job": "Senior Developer",
  "isAdm": false
}
```
### Retorno de erro (Usuário não encontrado):

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "message": "Usuário não encontrado"
}
```

### Retorno de erro (Token de autenticação não fornecido):

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Token de autenticação não fornecido"
}
```

### Retorno de erro (Acesso negado):

```http

HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "message": "Acesso negado"
}
```

### Retorno de erro (Token de autenticação do tipo precisa ser do tipo Bearer Token):

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Token de autenticação do tipo precisa ser do tipo Bearer Token"
}
```

### Retorno de erro (Token de autenticação inválido):

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "message": "Token de autenticação inválido"
}
```

## DELETE /users

### Requisição

```http
DELETE /users?name=Neto HTTP/1.1
Content-Type: application/json
Authorization: Bearer {token}
```

### Retorno de sucesso

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Usuário removido com sucesso"
}
```
### Retorno de erro (Usuário não encontrado):

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "message": "Usuário não encontrado"
}
```

### Retorno de erro (Token de autenticação não fornecido):

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Token de autenticação não fornecido"
}
```

### Retorno de erro (Acesso negado):

```http

HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "message": "Acesso negado"
}
```

### Retorno de erro (Token de autenticação do tipo precisa ser do tipo Bearer Token):

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Token de autenticação do tipo precisa ser do tipo Bearer Token"
}
```

### Retorno de erro (Token de autenticação inválido):

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "message": "Token de autenticação inválido"
}
```

## Contribuição

1. Faça o fork do projeto
2. Crie uma nova branch: `git checkout -b feature/nova-feature`
3. Faça as alterações desejadas
4. Faça o commit das suas alterações: `git commit -m 'Adicionar nova feature'`
5. Faça o push para a branch: `git push origin feature/nova-feature`
6. Abra um Pull Request

## Licença

[MIT](https://opensource.org/licenses/MIT)