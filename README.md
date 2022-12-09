# Desafio - W.A.

Este projeto consiste em uma API que retorna um catálogo de filmes paginado, e que usa como fonte de dados uma terceira API para popular seu banco de dados local.

## Orientações

Para rodar o projeto, siga os seguintes passos:

### Docker

- Informe as variáveis de ambiente em um arquivo chamado ".env" na pasta raíz do projeto conforme o arquivo exemplo ".env.example".

- Monte a imagem:  
  
```
  docker build -t <NOME_DA_IMAGEM> .
```

- Inicie o container:
  
```
docker run -d -p 3333:3333 --name <NOME_DO_CONTAINER> <NOME_DA_IMAGEM>
```

- Acesse pelo endereço: http://localhost:3333


### Linha de comando

- Instale as dependências do projeto: 

```
  yarn install
```

- Rode o servidor:

```
  yarn dev
```

## Projetos hospedados

- [Origem dos dados ](http://ghibli-api.softdevelopments.com.br/)
- [Backend ](http://wa-movie-api.softdevelopments.com.br/)
- [Frontend](http://wa-movie.softdevelopments.com.br/)