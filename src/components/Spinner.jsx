import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const SPINNER_SIZES = {
  small: 30,
  medium: 50,
  large: 70,
};

const STROKE_WIDTHS = {
  small: 4,
  medium: 5,
  large: 6,
};

const DASHS = {
  small: 100,
  medium: 150,
  large: 200,
};

const rotator = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
`;
const rotatorRule = css`
  ${rotator} 1.3s linear infinite;
`;

const colors = keyframes`
  0% { stroke: #4285F4; }
	25% { stroke: #DE3E35; }
	50% { stroke: #F7C223; }
	75% { stroke: #1B9A59; }
  100% { stroke: #4285F4; }
`;
const circleRules = Object.entries(DASHS).reduce((result, [size, offset]) => {
  const rule = keyframes`
 0% { stroke-dashoffset: ${offset}; }
 50% {
   stroke-dashoffset: ${offset / 4};
   transform:rotate(135deg);
 }
 100% {
   stroke-dashoffset: ${offset};
   transform:rotate(450deg);
 }
`;
  result[size] = css`
 ${rule} 1.3s ease-in-out infinite,
  ${colors} 5.2s ease-in-out infinite;
    `;
  return result;
}, {});

const centerRule = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const SpinnerContainer = styled.svg`
  animation: ${rotatorRule};
  ${({ size }) => (size === 'large' ? centerRule : '')};
`;

const Circle = styled.circle`
  transform-origin: center;
  stroke-dasharray: ${props => DASHS[props.size]};
  stroke-dashoffset: 0;
  animation: ${props => circleRules[props.size]};
`;

// Heavily inspired by https://codepen.io/mrrocks/pen/EiplA
export default function Spinner({ size = 'small' }) {
  const baseSize = SPINNER_SIZES[size];
  const pathSize = baseSize / 2;
  const strokeWidth = STROKE_WIDTHS[size];
  const pathRadius = `${baseSize / 2 - strokeWidth}px`;

  return (
    <SpinnerContainer
      size={size}
      width={baseSize}
      height={baseSize}
      viewBox={`0 0 ${baseSize} ${baseSize}`}
    >
      <Circle
        size={size}
        className="SpinnerPath"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        cx={pathSize}
        cy={pathSize}
        r={pathRadius}
      />
    </SpinnerContainer>
  );
}
