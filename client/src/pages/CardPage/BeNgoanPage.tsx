import { useEffect, useState } from "react";
import type { FC } from "react";
import classNames from "classnames/bind";
import styles from "./BeNgoanPage.module.scss";
import images from "~/assets";
import BeNgoanCard from "~/layout/components/BeNgoanCard";
import BeNgoanCard2 from "~/layout/components/BeNgoanCard/BeNgoanCard2";
import BeNgoanCard3 from "~/layout/components/BeNgoanCard/BeNgoanCard3";

const cx = classNames.bind(styles);

// Kiểu dữ liệu cho component props
interface BeNgoanCardProps {
  ngay: string;
  noiDung: string;
  range: string;
  avatarUrl?: string;
}

// Kiểu dữ liệu cho từng mục
interface BeNgoanData {
  id: number;
  ngay: string;
  noiDung: string;
  range: string;
  avatarUrl?: string;
  type: FC<BeNgoanCardProps>;
}

function BeNgoanPage() {
  const beNgoanData: BeNgoanData[] = [
    {
      id: 1,
      ngay: "04/04/2025",
      noiDung:
        "Bé rất ngoan, lễ phép và chăm chỉ học tập!\nlâu lâu có bật chút nhưng không đáng kể",
      range: "🌟 Xuất sắc! 🌟",
      type: BeNgoanCard,
    },
    {
      id: 2,
      ngay: "08/04/2025",
      noiDung:
        'Bé siêu ngoan, vâng lời và học hành rất chăm chỉ!\nĐôi lúc có "quậy" nhẹ cho vui lớp, nhưng nhìn chung rất dễ thương.',
      range: "💯 100 đỉm 💯",
      type: BeNgoanCard2,
      avatarUrl: images.avta2,
    },
    {
      id: 3,
      ngay: "21/06/2025",
      noiDung: `<p>Bé Hong Anh luôn chăm chỉ, sáng tạo và hoàn thành xuất sắc nhiệm
          vụ.</p>
        <p>
          Một học sinh đáng yêu, luôn cố gắng hết mình trong học tập và vui
          chơi!
        </p>`,
      range: "🌟 Tuyệt Vời Nhất! 🌟",
      type: BeNgoanCard3,
      avatarUrl: images.avta4,
    },
  ];

  const [selectedCard, setSelectedCard] = useState<{
    be: BeNgoanData;
    type: FC<BeNgoanCardProps>;
  } | null>(null);

  const handleCardClick = (be: BeNgoanData) => {
    setSelectedCard({ be, type: be.type });
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  useEffect(() => {
    const lastItem = beNgoanData[beNgoanData.length - 1];
    handleCardClick(lastItem);
  }, []);

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("title")}>Danh Sách phiếu bé ngoan</h1>
      <div className={cx("grid")}>
        {beNgoanData
          .slice()
          .reverse()
          .map((be) => {
            const CardComponent = be.type;
            return (
              <div
                key={be.id}
                className={cx("card-container")}
                onClick={() => handleCardClick(be)}
              >
                <CardComponent
                  ngay={be.ngay}
                  noiDung={be.noiDung}
                  range={be.range}
                  avatarUrl={be.avatarUrl}
                />
              </div>
            );
          })}
      </div>

      {selectedCard !== null && (
        <div className={cx("modal-overlay")} onClick={handleCloseModal}>
          <div
            className={cx("modal-content")}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={cx("close-button")} onClick={handleCloseModal}>
              ×
            </button>
            {(() => {
              const ModalCard = selectedCard.type;
              return (
                <ModalCard
                  ngay={selectedCard.be.ngay}
                  noiDung={selectedCard.be.noiDung}
                  range={selectedCard.be.range}
                  avatarUrl={selectedCard.be.avatarUrl}
                />
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

export default BeNgoanPage;
