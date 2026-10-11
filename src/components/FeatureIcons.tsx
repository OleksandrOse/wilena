import { FC, SVGProps } from 'react';

const Base: FC<SVGProps<SVGSVGElement>> = ({ children, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.25}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    {children}
  </svg>
);

export const ComfortIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <Base {...props}>
    <path d="M11 3c0 5 2 7 7 8-5 1-7 3-7 8 0-5-2-7-7-8 5-1 7-3 7-8z"/>
    <path d="M18.5 15v4M16.5 17h4"/>
  </Base>
);

export const LakesMountainsIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <Base {...props}>
    <path d="M3 17l5.5-9 3.5 5.5 2.5-3.5L21 17"/>
    <path d="M3 20.5c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1"/>
  </Base>
);

export const ThermalIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <Base {...props}>
    <path d="M8 3.5c-1.5 1.4 1.5 2.8 0 4.2M12 3.5c-1.5 1.4 1.5 2.8 0 4.2M16 3.5c-1.5 1.4 1.5 2.8 0 4.2"/>
    <path d="M4 12.5h16c0 4.2-3.5 7.5-8 7.5s-8-3.3-8-7.5z"/>
  </Base>
);

export const CyclingIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <Base {...props}>
    <circle cx="6" cy="16" r="3.5"/>
    <circle cx="18" cy="16" r="3.5"/>
    <path d="M6 16l3.5-7H15l3 7M9.5 9l2.5 7M8 7h3M15 9l-1-2h2"/>
  </Base>
);

export const WinterIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <Base {...props}>
    <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/>
    <path d="M9.5 5l2.5 2.5L14.5 5M9.5 19l2.5-2.5 2.5 2.5"/>
  </Base>
);

export const WellnessIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <Base {...props}>
    <path d="M12 4.5c2.6 2.6 2.6 7 0 10.5-2.6-3.5-2.6-7.9 0-10.5z"/>
    <path d="M12 15c-4 0-7-2.5-8-6 4 0 7 2 8 6zM12 15c4 0 7-2.5 8-6-4 0-7 2-8 6z"/>
    <path d="M7.5 19h9"/>
  </Base>
);

export const ShoppingIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <Base {...props}>
    <path d="M5 8h14l-1 12H6L5 8z"/>
    <path d="M9 8V7a3 3 0 0 1 6 0v1"/>
  </Base>
);
