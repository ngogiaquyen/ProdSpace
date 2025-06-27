import React from "react";
import classNames from "classnames/bind";
import styles from "./MainContent.module.scss";
import TemplateCard from "../TemplateCard";

// Định nghĩa interface cho props
interface Template {
  title: string;
  creator: string;
  image: string;
  isFree: boolean;
}

interface MainContentProps {
  filteredTemplates: Template[];
}

const cx = classNames.bind(styles);

const MainContent: React.FC<MainContentProps> = ({ filteredTemplates }) => {
  return (
    <main id="main-content" className={cx("main")}>
      <div className={cx("grid")}>
        {filteredTemplates.map((template, index) => (
          <TemplateCard
            key={index}
            title={template.title}
            creator={template.creator}
            image={template.image}
            isFree={template.isFree}
          />
        ))}
      </div>
    </main>
  );
};

export default MainContent;
