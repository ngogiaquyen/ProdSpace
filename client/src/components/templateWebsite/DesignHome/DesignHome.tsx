import React from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faThLarge,
  faMagic,
  faSearch,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./DesignHome.module.scss";
import { NavLink } from "react-router-dom";
import { routes } from "~/config";

const cx = classNames.bind(styles);

const DesignHome: React.FC = () => {
  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>Bạn muốn thiết kế gì?</h1>
      <div className={cx("buttonGroup")}>
        <button type="button" className={cx("button")}>
          <FontAwesomeIcon icon={faFolderOpen} className={cx("icon")} />
          Thiết kế của bạn
        </button>
        <button type="button" className={cx("button", "active")}>
          <FontAwesomeIcon icon={faThLarge} className={cx("icon")} />
          Mẫu
        </button>
        <NavLink to={routes.aiDesign} className={cx("button")}>
          <FontAwesomeIcon icon={faMagic} className={cx("icon")} />
          AI Design
        </NavLink>
      </div>
      <form className={cx("searchForm")}>
        <label htmlFor="search" className={cx("srOnly")}>
          Tìm kiếm trong hàng triệu mẫu
        </label>
        <div className={cx("searchContainer")}>
          <button
            type="submit"
            className={cx("searchButton")}
            aria-label="Tìm kiếm"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input
            id="search"
            type="search"
            placeholder="Tìm kiếm trong hàng triệu mẫu"
            className={cx("searchInput")}
          />
          <button
            type="submit"
            className={cx("submitButton")}
            aria-label="Submit search"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default DesignHome;
