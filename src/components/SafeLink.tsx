import Link, { LinkProps } from 'next/link';
import React from 'react';
import isEmpty from 'lodash/isEmpty';

const SafeLink = ({
  children,
  ...props
}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & {
    children?: React.ReactNode;
  } & React.RefAttributes<HTMLAnchorElement>): JSX.Element => {
  if (isEmpty(props.href)) {
    return <>{children}</>;
  }
  return <Link {...props}>{children}</Link>;
};

export default SafeLink;
