import classNames from "classnames/bind";
import styles from "./TemplatePage.module.scss";
import MainContent from "~/components/templateWebsite/MainContent";
import DesignHome from "~/components/templateWebsite/DesignHome";

const cx = classNames.bind(styles);

const TemplatePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const templates = [
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    {
      title: "GSAP x GiveWell",
      creator: "Maggy",
      image: "https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg",
      category: "Portfolio & Đại lý",
      isFree: true,
    },
    // ... other templates
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const faqs = [
  //   {
  //     question: "Mẫu website là gì?",
  //     answer:
  //       "Mẫu website là một trang web hoặc bộ trang web được thiết kế sẵn, có thể tùy chỉnh để tạo ra một website.",
  //   },
  //   // ... other FAQs
  // ];


  return (
    <div className={cx("container")}>
      <DesignHome/>
      <MainContent
        filteredTemplates={templates}
      />
      {/* <FAQ faqs={faqs} />
      <AIChat /> */}
    </div>
  );
};

export default TemplatePage;
