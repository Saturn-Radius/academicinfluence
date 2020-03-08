import css from "@emotion/css";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  width: 100%;

  ${(props: any) =>
    props.center &&
    css`
      justify-content: center;
    `}

  ${(props: any) =>
    props.middle &&
    css`
      align-items: center;
    `}

  ${(props: any) =>
    props.right &&
    css`
      justify-content: flex-end;
    `}
`;

export const Col = styled.div`
  position: relative;
  flex-grow: 1;
  flex-shrink: 0;
  max-width: 100%;
  order: -1;

  @media (max-width: 992px) {
    order: 1;

    &:last-child {
      margin-bottom: 0px;
    }
  }

  /* Nesting */
  & > ${Row} {
    margin-bottom: -24px;
  }

  /* Change Order */
  ${(props: any) =>
    props.last &&
    css`
      order: 2;

      @media (max-width: 600px) {
        order: 1;
      }
    `}

  /* No Padding */
  ${(props: any) =>
    props.nopadding &&
    css`
      padding: 0;
    `}
`;
