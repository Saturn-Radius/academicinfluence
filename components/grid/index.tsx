import css from "@emotion/css";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

type RowProps = {
  center?: boolean;
  middle?: boolean;
  right?: boolean;
};

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  width: 100%;

  ${(props: RowProps) =>
    props.center &&
    css`
      justify-content: center;
    `}

  ${(props: RowProps) =>
    props.middle &&
    css`
      align-items: center;
    `}

  ${(props: RowProps) =>
    props.right &&
    css`
      justify-content: flex-end;
    `}
`;

type ColProps = {
  last?: boolean;
  nopadding?: boolean;
} & RowProps;

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
  ${(props: ColProps) =>
    props.last &&
    css`
      order: 2;

      @media (max-width: 600px) {
        order: 1;
      }
    `}

  /* No Padding */
  ${(props: ColProps) =>
    props.nopadding &&
    css`
      padding: 0;
    `}
`;

export const Spacer = styled.div`
  flex: 1;
`;
