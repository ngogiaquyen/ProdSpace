import React from "react";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";

const cx = classNames.bind(styles);

type DefaultLayoutProps = {
  children: React.ReactNode;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <main className={cx('container')}>{children}</main>
    </div>
  );
};

export default DefaultLayout;
