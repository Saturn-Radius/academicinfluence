import React from "react";
import App from "next/app";

function NetworkHeader() {
  return (
    <div className="network-header">
      <style jsx>{`
        @media (max-width: 700px) {
          div {
            display: none;
          }
        }
        .network-header {
          background-color: #1e222a;
          padding-left: 80px;
          padding-top: 12px;
          padding-bottom: 9px;
        }
        a {
          color: white;
          text-decoration: none;
          font-size: 16px;
          line-height: 19px;
          font-family: SF UI Display;
        }
        a.home {
          border-right: 0.5px solid #ffffff;
          padding-right: 19px;
          margin-right: 28px;
        }
      `}</style>
      <a href="/" className="home">
        ACADEMIC INFLUENCE
      </a>
      <a href="https://intelligenteducation.com">INTELLIGENT EDUCATION</a>
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <style jsx>{`
        .logo {
          display: flex;
        }
        svg {
          padding-right: 9.79px;
        }
      `}</style>
      <svg
        width="46"
        height="60"
        viewBox="0 0 46 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M45.2133 0H0V60L7.96207 56V10.237H37.2512V56L45.2133 60V0Z"
          fill="#1E988A"
        />
        <path
          d="M18.4834 32.1327H26.7298V56.1327H18.4834V32.1327Z"
          fill="#EB5857"
        />
        <path
          d="M18.4834 19.0521H26.7298V27.2986H18.4834V19.0521Z"
          fill="#EB5857"
        />
      </svg>
      <svg
        width="181"
        height="51"
        viewBox="0 0 181 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.18 22H24.28L14.89 0.999999H10.09L0.73 22H5.71L7.57 17.5H17.32L19.18 22ZM9.13 13.81L12.46 5.77L15.79 13.81H9.13ZM36.2158 22.36C39.8758 22.36 42.9058 21.04 44.8858 18.61L41.7658 15.73C40.3558 17.38 38.5858 18.22 36.4858 18.22C32.5558 18.22 29.7658 15.46 29.7658 11.5C29.7658 7.54 32.5558 4.78 36.4858 4.78C38.5858 4.78 40.3558 5.62 41.7658 7.24L44.8858 4.36C42.9058 1.96 39.8758 0.64 36.2458 0.64C29.7058 0.64 24.8458 5.17 24.8458 11.5C24.8458 17.83 29.7058 22.36 36.2158 22.36ZM63.4476 22H68.5476L59.1576 0.999999H54.3576L44.9976 22H49.9776L51.8376 17.5H61.5876L63.4476 22ZM53.3976 13.81L56.7276 5.77L60.0576 13.81H53.3976ZM70.7263 22H80.2663C87.1363 22 91.8463 17.86 91.8463 11.5C91.8463 5.14 87.1363 0.999999 80.2663 0.999999H70.7263V22ZM75.5863 18.01V4.99H80.0263C84.1963 4.99 86.9263 7.48 86.9263 11.5C86.9263 15.52 84.1963 18.01 80.0263 18.01H75.5863ZM100.341 18.1V13.24H110.091V9.46H100.341V4.9H111.381V0.999999H95.5115V22H111.771V18.1H100.341ZM139.308 22L139.248 0.999999H135.258L127.518 14.05L119.658 0.999999H115.638V22H120.198V9.67L126.348 19.78H128.538L134.718 9.4L134.748 22H139.308ZM144.291 22H149.151V0.999999H144.291V22ZM164.185 22.36C167.845 22.36 170.875 21.04 172.855 18.61L169.735 15.73C168.325 17.38 166.555 18.22 164.455 18.22C160.525 18.22 157.735 15.46 157.735 11.5C157.735 7.54 160.525 4.78 164.455 4.78C166.555 4.78 168.325 5.62 169.735 7.24L172.855 4.36C170.875 1.96 167.845 0.64 164.215 0.64C157.675 0.64 152.815 5.17 152.815 11.5C152.815 17.83 157.675 22.36 164.185 22.36ZM3.49 50H8.35V29H3.49V50ZM27.7937 29V41.75L17.3538 29H13.3338V50H18.1338V37.25L28.6038 50H32.5938V29H27.7937ZM53.4323 32.9V29H37.5623V50H42.4223V42.35H52.1423V38.45H42.4223V32.9H53.4323ZM56.7224 50H72.1124V46.04H61.5824V29H56.7224V50ZM83.8942 50.36C89.8642 50.36 93.4042 46.94 93.4042 40.76V29H88.6042V40.58C88.6042 44.57 86.8942 46.22 83.9242 46.22C80.9842 46.22 79.2442 44.57 79.2442 40.58V29H74.3842V40.76C74.3842 46.94 77.9242 50.36 83.8942 50.36ZM103.037 46.1V41.24H112.787V37.46H103.037V32.9H114.077V29H98.2068V50H114.467V46.1H103.037ZM132.794 29V41.75L122.354 29H118.334V50H123.134V37.25L133.604 50H137.594V29H132.794ZM152.612 50.36C156.272 50.36 159.302 49.04 161.282 46.61L158.162 43.73C156.752 45.38 154.982 46.22 152.882 46.22C148.952 46.22 146.162 43.46 146.162 39.5C146.162 35.54 148.952 32.78 152.882 32.78C154.982 32.78 156.752 33.62 158.162 35.24L161.282 32.36C159.302 29.96 156.272 28.64 152.642 28.64C146.102 28.64 141.242 33.17 141.242 39.5C141.242 45.83 146.102 50.36 152.612 50.36ZM169.394 46.1V41.24H179.144V37.46H169.394V32.9H180.434V29H164.564V50H180.824V46.1H169.394Z"
          fill="#1E988A"
        />
      </svg>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <style jsx>{`
        .footer {
          display: flex;
          flex-direction: column;
          background-color: #333333;
        }
        .upper {
          display: flex;
          padding-left: 92px;
          padding-top: 51px;
        }
        .logo {
          padding-right: 118px;
        }
        .sections {
          display: flex;
          flex-wrap: wrap;
        }
        div.section {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          padding-top: 22px;
          padding-right: 44px;
        }
        @media (max-width: 1250px) {
          .connect {
            order: 10;
          }
          .connect .label {
            text-align: center;
            width: 100%;
            min-width: 75vw;
          }

          .connect .icons {
            align-self: center;
          }

          .upper {
            flex-direction: column;
          }

          .logo {
            align-self: center;
            padding-right: 0px;
          }
          div.copyright {
            margin-top: 10px;
          }
        }
        div.section a {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
          align-items: center;
          text-decoration: none;

          color: #ffffff;

          padding-top: 17px;
        }
        div.label {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 500;
          font-size: 24px;
          line-height: 29px;
          align-items: flex-end;
          font-variant: small-caps;

          color: #ffffff;

          border-bottom: 1px solid #ffffff;

          margin-bottom: 5px;

          min-width: 220px;
        }
        .icons {
          display: flex;
        }
        .icons a {
          margin-right: 29.9px;
        }
        .copyright {
          font-family: Montserrat;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 20px;
          align-items: center;
          text-align: center;
          align-self: center;

          color: #ffffff;
          width: 100%;

          margin-bottom: 17px;
          margin-top: 175px;
        }
      `}</style>
      <div className="upper">
        <div className="logo">
          <Logo />
        </div>
        <div className="sections">
          <div className="section">
            <div className="label">EXPLORE</div>
            <a href="/">INFLUENTIAL SCHOOLS</a>
            <a href="/">INFLUENTIAL PEOPLE</a>
            <a href="/">BY DISCIPLINE</a>
            <a href="/">ARTICLES</a>
            <a href="/">FIND YOUR SCHOOL</a>
            <a href="/">ABOUT</a>
          </div>
          <div className="section connect">
            <div className="label">CONNECT WITH US</div>
            <div className="icons">
              <a href="/">
                <svg
                  width="10"
                  height="20"
                  viewBox="0 0 10 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.82128 20V11H9.55369L10 7H6.82128V5.052C6.82128 4.022 6.84759 3 8.28688 3H9.74469V0.14C9.74469 0.097 8.4925 0 7.22569 0C4.58 0 2.92341 1.657 2.92341 4.7V7H0V11H2.92341V20H6.82128Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="/">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.86965 0.122727C4.24177 0.196177 2.8308 0.5942 1.69149 1.72871C0.548187 2.86918 0.155147 4.28558 0.0815141 5.89653C0.0357424 6.90201 -0.231923 14.4982 0.544207 16.4903C1.0676 17.8342 2.09846 18.8675 3.45469 19.3926C4.08754 19.6387 4.80994 19.8055 5.86965 19.8541C14.7305 20.2551 18.0151 20.0367 19.4002 16.4903C19.646 15.859 19.8151 15.1374 19.8619 14.0803C20.2669 5.19677 19.7962 3.27117 18.2519 1.72871C17.027 0.506853 15.5862 -0.324924 5.86965 0.122727ZM5.95124 18.0675C4.98108 18.0238 4.45471 17.862 4.10346 17.726C3.21986 17.3826 2.55617 16.7215 2.21488 15.8431C1.62382 14.3294 1.81985 7.14023 1.87258 5.97693C1.92432 4.83745 2.15517 3.79624 2.95916 2.99226C3.9542 1.99968 5.23979 1.51332 13.9931 1.90837C15.1354 1.95998 16.1792 2.19026 16.9852 2.99226C17.9803 3.98483 18.4738 5.28014 18.0718 13.9999C18.028 14.9677 17.8658 15.4927 17.7295 15.8431C16.829 18.1509 14.7573 18.4715 5.95124 18.0675ZM14.0897 4.68956C14.0897 5.34665 14.624 5.88065 15.2837 5.88065C15.9434 5.88065 16.4788 5.34665 16.4788 4.68956C16.4788 4.03248 15.9434 3.49847 15.2837 3.49847C14.624 3.49847 14.0897 4.03248 14.0897 4.68956ZM4.86267 9.98792C4.86267 12.8029 7.15027 15.0848 9.97219 15.0848C12.7941 15.0848 15.0817 12.8029 15.0817 9.98792C15.0817 7.17298 12.7941 4.89205 9.97219 4.89205C7.15027 4.89205 4.86267 7.17298 4.86267 9.98792ZM6.65573 9.98792C6.65573 8.16159 8.14033 6.67967 9.97219 6.67967C11.8041 6.67967 13.2887 8.16159 13.2887 9.98792C13.2887 11.8153 11.8041 13.2972 9.97219 13.2972C8.14033 13.2972 6.65573 11.8153 6.65573 9.98792Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="/">
                <svg
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.29 16C13.837 16 17.965 9.84365 17.965 4.50546C17.965 4.33021 17.965 4.15595 17.953 3.98267C18.756 3.41163 19.449 2.70276 20 1.8915C19.252 2.21837 18.457 2.433 17.644 2.52751C18.5 2.02244 19.141 1.2289 19.448 0.292602C18.642 0.763214 17.761 1.095 16.842 1.27321C15.288 -0.353258 12.689 -0.432021 11.036 1.09796C9.971 2.08447 9.518 3.55538 9.849 4.95835C6.55 4.79492 3.476 3.261 1.392 0.737616C0.303 2.58363 0.86 4.94457 2.663 6.12996C2.01 6.11125 1.371 5.93797 0.8 5.62489V5.67608C0.801 7.5989 2.178 9.2549 4.092 9.63591C3.488 9.79836 2.854 9.82199 2.24 9.70483C2.777 11.351 4.318 12.4783 6.073 12.5108C4.62 13.6351 2.825 14.2455 0.977 14.2436C0.651 14.2426 0.325 14.2239 0 14.1855C1.877 15.3709 4.06 16 6.29 15.997"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="section">
            <div className="label">OUR NETWORK</div>
            <a href="/">INTELLIGENT EDUCATION</a>
            <a href="/">ALEXANDRIA</a>
          </div>
        </div>
      </div>
      <div className="copyright">
        Copyright © 2019 Academic Influence. All Rights Reserved
      </div>
    </div>
  );
}

class AIApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div className="root">
        <style jsx global>{`
          body {
            padding: 0px;
            margin: 0px;
          }
        `}</style>
        <style jsx>{`
                .root {
                    display: flex,
                    flex-direction: column;
                }
            `}</style>
        <NetworkHeader />
        <Component {...pageProps} />
        <Footer />
      </div>
    );
  }
}

export default AIApp;
