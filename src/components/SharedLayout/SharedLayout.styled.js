import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  flex-grow: 1;
  padding-left: 5px;
  padding-right: 5px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 768px;
  }

  @media (min-width: 1280px) {
    width: 1280px;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 20px;
  margin-bottom: 8px;
  margin-top: 8px;
  border: none;
  background-image: linear-gradient(to top left, #ffb800, #9225ff);
  backdrop-filter: blur(30px);
  border-radius: 30px;
  filter: drop-shadow(0px 16px 24px #9225ff);

  &:hover {
  }

  > nav {
    display: none;

    @media (min-width: 768px) {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'DM Sans';
      padding: 10px;
      gap: 5px;
    }

    @media (min-width: 1280px) {
    }
  }
`;

export const Symbol = styled(NavLink)`
  text-decoration: none;
  transition-property: transform;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.1);
  }
`;

export const Greeting = styled.div`
  display: none;

  @media (min-width: 1280px) {
    font-family: 'Sansita Swashed';
    font-size: 25px;
    color: #fff;
    max-width: 330px;
    margin: 2px;
    font-weight: 700;
    display: inline-block;
    &::first-letter {
      font-size: 30px;
    }
  }
`;



export const Logo = styled.div`
  font-weight: 700;
  gap: 5px;
  display: flex;
  align-items: flex-end;
`;

export const Frame = styled.div`
 border-radius: 30px;
 overflow: hidden;
`;


export const IconLabelWrapper = styled.div`

display:none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const IconLabelStart = styled.span`
  display: inline-block;
  font-family: 'Comic Sans MS';
  font-size: 20px;
  font-weight: 700;
  color: #ffb800;
`;

export const IconLabelEnd = styled.span`
  display: inline-block;
  font-family: 'Comic Sans MS';
  font-size: 20px;
  font-weight: 700;
  color: #9225ff;
`;

export const Burger = styled.button`
  fill: #9225ff;
  cursor: pointer;
  border: none;
  background-color: transparent;
  &:hover {
    fill: #280a46;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;


export const Linker = styled(NavLink)`
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
  text-align:center;
  color: #fff;
  font-weight: 700;
  position: relative;
  font-family: 'Work Sans', sans-serif;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: #9225ff;
    transform: scaleX(0);
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: left;
  }

  &.active {
  }

  &:hover {
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &.active::after {
    transform: scaleX(1);
  }
`;

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  background-color: inherit;
  border: none;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  font-family: 'Work Sans', sans-serif;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: #9225ff;
    transform: scaleX(0);
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: left;
  }

  &:hover {
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &.active::after {
    transform: scaleX(1);
  }
`;


