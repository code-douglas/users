# Gerenciamento de Usuários com Express e Sequelize

Este projeto é uma aplicação web para gerenciamento de usuários e endereços utilizando **Node.js**, **Express**, **Sequelize** e **MySQL**.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework para criação de servidores
- **Sequelize** - ORM para manipulação do banco de dados
- **MySQL** - Banco de dados relacional
- **Handlebars** - Template engine para renderização de páginas HTML

## 📂 Estrutura do Projeto

```
📁 projeto
│-- 📁 db/                 # Configuração do banco de dados
│-- 📁 models/             # Modelos Sequelize
│-- 📁 public/             # Arquivos estáticos
│-- 📁 views/              # Templates Handlebars
│-- 📄 index.mjs           # Arquivo principal
│-- 📄 package.json        # Configurações do projeto
│-- 📄 .env                # Configurações do banco de dados
```

## 📌 Funcionalidades

- Listagem de usuários
- Criação, edição e remoção de usuários
- Adição e remoção de endereços relacionados aos usuários

## ⚙️ Configuração do Banco de Dados

Antes de rodar a aplicação, crie um arquivo **.env** na raiz do projeto e adicione as configurações do banco de dados:

```
DB_NAME=nodesequelize
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_HOST=localhost
DB_DIALECT=mysql
DB_PORT=3306
```

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd seu-repositorio
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   npm run start
   ```

## 🚀 Uso

- Acesse a aplicação no navegador: [http://localhost:3000](http://localhost:3000)
- Utilize a interface para gerenciar usuários e endereços

## 🔥 Scripts Disponíveis

- **`npm install`** - Instala as dependências do projeto.
- **`npm run start`** - Inicia o servidor na porta 3000.
- **`npm run migrate`** - Executa as migrações do banco de dados.

## 🛠️ Melhorias Futuras

- Implementação de autenticação de usuários.
- Validações de entrada mais robustas.
- Melhoria na interface gráfica.

## 📸 Imagens do projeto: 

![Print 5](/public/ignore/1.png)
![Print 6](/public/ignore/2.png)
![Print 7](/public/ignore/3.png)
![Print 8](/public/ignore/4.png)
![Print 9](/public/ignore/5.png)
![Print 10](/public/ignore/6.png)
![Print 11](/public/ignore/7.png)
![Print 12](/public/ignore/8.png)
![Print 12](/public/ignore/9.png)

