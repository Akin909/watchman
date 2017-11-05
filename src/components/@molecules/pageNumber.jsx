import React from 'react';

import PageLi from 'components/@atoms/pageLi';
import PageLink from 'components/@atoms/pageLink';

export default ({ index, page, onClick, children }) => (
  <PageLi>
    <PageLink onClick={onClick(page)}>{children || index + 1}</PageLink>
  </PageLi>
);
