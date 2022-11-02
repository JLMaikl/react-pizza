import React from 'react';
import ContentLoader from 'react-content-loader';

const Sceleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={0}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    >
    <rect x="0" y="220" rx="8" ry="8" width="280" height="30" />
    <circle cx="130" cy="100" r="100" />
    <rect x="0" y="265" rx="10" ry="10" width="280" height="88" />
    <rect x="128" y="369" rx="25" ry="25" width="152" height="45" />
    <rect x="0" y="375" rx="10" ry="10" width="81" height="35" />
  </ContentLoader>
);

export default Sceleton;
