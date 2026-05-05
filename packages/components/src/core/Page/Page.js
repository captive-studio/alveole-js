import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { PageContent } from './PageContent';
import { PageHead } from './PageHead';
export const Page = props => {
  return _jsxs(React.Fragment, { children: [_jsx(PageHead, { ...props }), _jsx(PageContent, { ...props })] });
};
