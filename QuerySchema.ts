import { mapValues } from "lodash";
import { ParsedUrlQuery } from "querystring";

export type FieldSchema<T> = {
  toQuery(value: T): string;
  fromQuery(value: string): T;
  default: T;
};

export type Data<P extends { [k: string]: FieldSchema<any> }> = {
  [k in keyof P]: P[k]["default"];
};

export default function QuerySchema<
  P extends { [k: string]: FieldSchema<any> }
>(properties: P) {
  return {
    fromQuery(query: ParsedUrlQuery): Data<P> {
      return mapValues(properties, (value, key) => {
        if (key in query) {
          return value.fromQuery(query[key] as string);
        } else {
          return value.default;
        }
      });
    },
    toQuery(obj: Data<P>) {
      const query: { [k: string]: string } = {};
      for (const [key, value] of Object.entries(properties)) {
        const encoded = value.toQuery(obj[key]);
        if (encoded !== value.toQuery(value.default)) {
          query[key] = encoded;
        }
      }
      return query;
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
