import classNames from "classnames/bind";
import styles from "./BeNgoanCard3.module.scss";
import images from "~/assets";

const cx = classNames.bind(styles);
export interface BeNgoanCard2Props {
  tenBe?: string;
  tuoi?: number;
  ngay: string;
  noiDung: string;
  range: string;
  avatarUrl?: string;
}

const BeNgoanCard3: React.FC<BeNgoanCard2Props> = ({
  tenBe = 'Hong Anh',
  tuoi = 17,
  ngay,
  noiDung,
  range,
  avatarUrl = images.avta,
}) => {
  return (
    <div className={cx("ticket")}>
      <div className={cx("ribbon")}>Xuất Sắc</div>
      <h1>Phiếu Bé Ngoan</h1>
      <div className={cx("date")}>📅 {ngay}</div>
      <div className={cx("avatar")}><img src={avatarUrl} alt="hinh anh hong anh"/></div>
      <div className={cx("info")}>
        <p>
          <span>Bé:</span> {tenBe}
        </p>
        <p>
          <span>Tuổi:</span> {tuoi}
        </p>
      </div>
      <div className={cx("comment")}>
        <p>
          <strong>Nhận xét:</strong>
        </p>
        <div dangerouslySetInnerHTML={{ __html: noiDung }} />
      </div>
      <div className={cx("score")}>{range}</div>
    </div>
  );
}

export default BeNgoanCard3;
