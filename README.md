# Desafio - W.A.

Este projeto consiste em uma API que retorna um catálogo de filmes paginado, e que usa como fonte de dados uma terceira API para popular seu banco de dados local.

## Orientações

## Para rodar o projeto, siga os seguintes passos:

### Docker

- Informe as variáveis de ambiente em um arquivo chamado ".env" na pasta raíz do projeto conforme o arquivo exemplo ".env.example".

- Inicie o container:
  
```
docker compose up
```

- Para rodar a migration, entre dentro do container
```
docker exec -ti <NOME_DO_CONTAINER> ash
```

- Dentro do container rode no console:
```
node ace migration:run
```

- Acesse pelo endereço: http://localhost:3333


### Dev container

- Abra o projeto dentro do container através da extensão Dev container do VsCode.

- Instale as dependências do projeto: 

```
  yarn install
```

- Rode a migration:
```
  node ace migration:run
```

- Rode o servidor
```
  yarn dev
```

- Acesse pelo endereço: http://localhost:3333

### Linha de comando

- Suba um servidor postgres.

- Certifique que os dados das credenciais do posgres está corretamente informado no arquivo ".env".

- Instale as dependências do projeto: 

```
  yarn install
```

- Rode a migration:
```
  node ace migration:run
```

- Rode o servidor
```
  yarn dev
```
- Acesse pelo endereço: http://localhost:3333

## Para rodar testes automatizados

- Rode o comando no console:

```
yarn test
```

## Documentação

- Para acessar a documentação acesse o endpoint: `/documentation`

## Projetos hospedados

- [Origem dos dados ](http://ghibli-api.softdevelopments.com.br/)
- [Backend ](http://wa-movie-api.softdevelopments.com.br/)
- [Frontend](http://wa-movie.softdevelopments.com.br/)