import type { ReactNode, FC } from "react";
import classNames from "classnames/bind";
import styles from "./LmsLayout.module.scss";
import Sidebar from "../components/LmsSidebar";

const cx = classNames.bind(styles);

type LmsLayoutProps = {
    children: ReactNode;
};

const LmsLayout: FC<LmsLayoutProps> = ({ children }) => {
    return (
        <div className={cx("wrapper")}>
            <Sidebar />
            <main className={cx("container")}>{children}</main>
        </div>
    );
};

export default LmsLayout;
