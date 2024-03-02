import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.62);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  cursor: zoom-out;
`;

export const baseIcon = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  color: white;
  font-size: 1.5em;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.3s ease;
  user-select: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const CloseIcon = styled(baseIcon)`
  right: 0;
  top: 0;
  width: 40px;
  height: 40px;
`;

export const ArrowIcon = styled(baseIcon)<{$isLeft?: boolean}>`
  top: 50%;
  ${({$isLeft}) => ($isLeft ? 'left: 0' : 'right: 0')};
  width: 5%;
  height: 100px;
  transform: translateY(-50%);
`;

export const Trigger = styled.div`
  & img {
    cursor: zoom-in;
  }
`;
