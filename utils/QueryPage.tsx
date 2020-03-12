import { NextPageContext } from "next";
import { NextSeo, NextSeoProps } from "next-seo";
import Router from "next/router";
import * as React from "react";
import { format } from "url";
import { Data, FieldSchema, QuerySchemaType } from "../QuerySchema";

export default function QueryPage<
  Props,
  RequestType extends { [k: string]: FieldSchema<any> }
>(
  Page: React.SFC<
    Props & {
      request: Data<RequestType>;
      updateRequest: (request: Data<RequestType>) => void;
    }
  >,
  schema: QuerySchemaType<RequestType>,
  seoProps: NextSeoProps,
  data: (request: Data<RequestType>, signal?: AbortSignal) => Promise<Props>
) {
  const PageWrapper = (props: Props & { request: Data<RequestType> }) => {
    const [request, setRequest] = React.useState(props.request);

    const updateRequest = React.useCallback(
      request => {
        setRequest(request);
        Router.replace(schema.asHref(request));
      },
      [setRequest]
    );

    return (
      <>
        <NextSeo
          {...seoProps}
          canonical={format(schema.asHref(schema.canonical(props.request)))}
        />
        <Page {...props} request={request} updateRequest={updateRequest} />
      </>
    );
  };

  PageWrapper.getInitialProps = async (context: NextPageContext) => {
    const controller =
      typeof window === undefined
        ? new AbortController()
        : {
            signal: undefined,
            abort: () => {}
          };
    const onRouteChange = () => {
      controller.abort();
    };
    const request = schema.fromQuery(context.query);
    Router.events.on("routeChangeError", onRouteChange);
    let resolved = null;
    try {
      resolved = await data(request, controller.signal);
    } finally {
      Router.events.off("routeChangeError", onRouteChange);
    }
    return {
      ...resolved,
      request
    };
  };

  return PageWrapper;
}
