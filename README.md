## Descrição

Ferramentas para facilitar o desenvolvimento de aplicações com NestJS,
utilizando [Apollo GraphQL](https://www.apollographql.com/docs/apollo-server).

## Instalação

```bash
$ yarn add @nestjs-toolkit/graphql-apollo
```

Setup

```typescript
import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {CustomDateResolver, CustomNumberResolver} from '@nestjs-toolkit/graphql-apollo/resolvers';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
        }),
    ],
    providers: [CustomDateResolver, CustomNumberResolver],
})
export class AppModule {
}
```

## Teste

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

## Licença

[MIT](LICENSE)
