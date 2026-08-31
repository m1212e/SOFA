import {
  type VariableDefinitionNode,
  type GraphQLSchema,
  type TypeNode,
  isScalarType,
  isEqualType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  isInputObjectType,
  Kind,
} from 'graphql';
import { isNil } from './common.js';

export function parseVariable({
  value,
  variable,
  schema,
}: {
  value: any;
  variable: VariableDefinitionNode;
  schema: GraphQLSchema;
}) {
  if (isNil(value)) {
    return;
  }

  return resolveVariable({
    value,
    type: variable.type,
    schema,
  });
}

function resolveVariable({
  value,
  type,
  schema,
}: {
  value: any;
  type: TypeNode;
  schema: GraphQLSchema;
}): any | any[] {
  if (type.kind === Kind.NAMED_TYPE) {
    const namedType = schema.getType(type.name.value);

    if (isScalarType(namedType)) {
      if (isEqualType(GraphQLBoolean, namedType)) {
        if (value === 'true' || value === true) {
          value = true;
        } else if (value === 'false' || value === false) {
          value = false;
        } else {
          throw new TypeError(
            `Boolean cannot represent a non boolean value: ${JSON.stringify(value)}`
          );
        }
      }

      if (isEqualType(GraphQLString, namedType) && typeof value !== 'string') {
        throw new TypeError(
          `String cannot represent a non string value: ${JSON.stringify(value)}`
        );
      }

      if (
        (isEqualType(GraphQLInt, namedType) ||
          isEqualType(GraphQLFloat, namedType)) &&
        typeof value === 'boolean'
      ) {
        throw new TypeError(
          isEqualType(GraphQLInt, namedType)
            ? `Int cannot represent non-integer value: ${JSON.stringify(value)}`
            : `Float cannot represent non numeric value: ${JSON.stringify(value)}`
        );
      }

      return namedType.serialize(value);
    }

    if (isInputObjectType(namedType)) {
      return value && typeof value === 'object' ? value : JSON.parse(value);
    }

    return value;
  }

  if (type.kind === Kind.LIST_TYPE) {
    return (Array.isArray(value) ? value : [value]).map((val) =>
      resolveVariable({
        value: val,
        type: type.type,
        schema,
      })
    );
  }

  if (type.kind === Kind.NON_NULL_TYPE) {
    return resolveVariable({
      value: value,
      type: type.type,
      schema,
    });
  }
}
