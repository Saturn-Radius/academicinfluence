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
  data: (request: Data<RequestType>, signal?: AbortSignal) => Promise<Props>,
  isEmpty: (props: Props) => boolean,
  rawProcessRequest?: (
    request: Data<RequestType>,
    props: Props
  ) => Data<RequestType>
) {
  const processRequest =
    rawProcessRequest ||
    function(request: Data<RequestType>) {
      return request;
    };

  const PageWrapper = (props: Props & { request: Data<RequestType> }) => {
    const [request, setRequest] = React.useState(props.request);

    const updateRequest = React.useCallback(
      request => {
        request = processRequest(request, props);
        setRequest(request);
        Router.replace(schema.asHref(request));
      },
      [setRequest]
    );

    const processedRequest = processRequest(request, props);

    return (
      <>
        <NextSeo
          {...seoProps}
          canonical={format(schema.asHref(schema.canonical(processedRequest)))}
        />
        <Page
          {...props}
          request={processedRequest}
          updateRequest={updateRequest}
        />
      </>
    );
  };

  PageWrapper.getInitialProps = async (context: NextPageContext) => {
    const controller =
      typeof window !== "undefined"
        ? new AbortController()
        : {
            signal: undefined,
            abort: () => {}
          };
    const onRouteChange = () => {
      console.log("TRY", controller);
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
    if (context.res && isEmpty(resolved)) {
      context.res.statusCode = 404;
    }

    return {
      ...resolved,
      request
    };
  };

  return PageWrapper;
}
