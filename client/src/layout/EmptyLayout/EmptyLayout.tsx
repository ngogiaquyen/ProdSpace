import type { ReactNode, FC } from "react";
import classNames from "classnames/bind";
import styles from "./EmptyLayout.module.scss";

const cx = classNames.bind(styles);

type EmptyLayoutProps = {
  children: ReactNode;
};

const EmptyLayout: FC<EmptyLayoutProps> = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <main className={cx("container")}>{children}</main>
    </div>
  );
};

export default EmptyLayout;
