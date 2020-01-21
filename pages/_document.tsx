import Document, { Head, Html, Main, NextScript } from "next/document";

class AIDocument extends Document {
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
