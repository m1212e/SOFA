[![npm version](https://badge.fury.io/js/sofa-api.svg)](https://npmjs.com/package/sofa-api)

# SOFA

This is a fork of [graphql-hive/SOFA](https://github.com/graphql-hive/SOFA), kept continuously in sync with upstream so it stays current with new features and fixes. On top of that, it adds:

- Stricter input validation for scalar variables passed to generated routes.
- Configurable webhook lifetimes and termination messages for subscriptions (see `webhooks` in `SofaConfig`), as proposed in [graphql-hive/SOFA#1815](https://github.com/graphql-hive/SOFA/pull/1815).

## Installation

```sh
npm install @m1212e/sofa-api
```

For usage and documentation, refer to the [upstream README](https://github.com/graphql-hive/SOFA#readme).

This powers the [rumble](https://github.com/m1212e/rumble) REST API.

## License

[MIT](https://github.com/Urigo/sofa/blob/master/LICENSE) © Uri Goldshtein
