import Document, { Head, Html, Main, NextScript } from "next/document";
import { BasicContextResponse } from "../schema";

class AIDocument extends Document<{ basicContext: BasicContextResponse }> {
  render() {
    return (
      <Html>
        <Head>
          <style>{`
                body {
                    padding: 0;
                    margin: 0;
                    font-family: Montserrat
                }
            `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AIDocument;
