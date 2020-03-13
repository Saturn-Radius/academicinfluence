import { mapValues } from "lodash";
import { ParsedUrlQuery } from "querystring";

export type FieldSchema<T> = {
  toQuery(value: T): string;
  fromQuery(value: string): T;
  default: T;
  canonical?: boolean;
};

export type Data<P extends { [k: string]: FieldSchema<any> }> = {
  [k in keyof P]: P[k]["default"];
};

export type QuerySchemaType<P extends { [k: string]: FieldSchema<any> }> = {
  asHref(data: Data<P>): { pathname: string; query: ParsedUrlQuery };
  fromQuery(query: ParsedUrlQuery): Data<P>;
  toQuery(data: Data<P>): ParsedUrlQuery;
  canonical(data: Data<P>): Data<P>;
};

export default function QuerySchema<
  P extends { [k: string]: FieldSchema<any> }
>(base: string, properties: P): QuerySchemaType<P> {
  const toQuery = (obj: Data<P>) => {
    const query: { [k: string]: string } = {};
    for (const [key, value] of Object.entries(properties)) {
      if (obj[key] !== null) {
        const encoded = value.toQuery(obj[key]);
        if (
          value.default === null ||
          encoded !== value.toQuery(value.default)
        ) {
          query[key] = encoded;
        }
      }
    }
    return query;
  };
  return {
    asHref(obj: Data<P>) {
      return {
        pathname: base,
        query: toQuery(obj)
      };
    },
    toQuery,
    fromQuery(query: ParsedUrlQuery): Data<P> {
      return mapValues(properties, (value, key) => {
        if (key in query) {
          return value.fromQuery(query[key] as string);
        } else {
          return value.default;
        }
      });
    },
    canonical(obj: Data<P>): Data<P> {
      const result: Data<P> = { ...obj };

      for (const [key, value] of Object.entries(properties)) {
        if (!value.canonical) {
          result[key as keyof Data<P>] = value.default;
        }
      }
      return result;
    }
  };
}

export function RangeParameter(defaultMin: number, defaultMax: number) {
  return {
    toQuery(value: { min: number; max: number }) {
      return `${value.min}~${value.max}`;
    },
    fromQuery(value: string) {
      const parts = value.split("~");
      return {
        min: parseInt(parts[0], 10),
        max: parseInt(parts[1], 10)
      };
    },
    default: {
      min: defaultMin,
      max: defaultMax
    }
  };
}
