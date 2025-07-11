import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import classNames from 'classnames/bind';
import styles from './ClassSchedule.module.scss';

const cx = classNames.bind(styles);

interface ScheduleItem {
  STT: number;
  class: string;
  lecturer: string;
  link: string;
  day: string;
  periods: string;
  location: string;
}

interface WeekSchedule {
  week: string;
  items: ScheduleItem[];
}

const ClassSchedule: React.FC = () => {
  const [schedules, setSchedules] = useState<WeekSchedule[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      // Process Excel data
      const processedSchedules: WeekSchedule[] = [];
      let currentWeek = '';
      let weekItems: ScheduleItem[] = [];

      jsonData.forEach((row) => {
        if (row.length === 1 && row[0].startsWith('Tuần')) {
          if (currentWeek && weekItems.length > 0) {
            processedSchedules.push({ week: currentWeek, items: weekItems });
          }
          currentWeek = row[0];
          weekItems = [];
        } else if (row.length >= 5 && !isNaN(row[0])) {
          const [lecturer, link] = (row[2] as string).split('\n').map(s => s.trim());
          weekItems.push({
            STT: row[0],
            class: row[1],
            lecturer,
            link,
            day: `Thứ ${row[3]}`,
            periods: row[4],
            location: row[5] || '',
          });
        }
      });

      if (currentWeek && weekItems.length > 0) {
        processedSchedules.push({ week: currentWeek, items: weekItems });
      }

      setSchedules(processedSchedules);

      // Convert to JSON and trigger download
      const jsonString = JSON.stringify(processedSchedules, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'schedule.json';
      a.click();
      URL.revokeObjectURL(url);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className={cx('container')}>
      <h1 className={cx('title')}>Lịch Học</h1>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        className={cx('file-input')}
      />
      {schedules.length > 0 && (
        <div className={cx('schedule')}>
          {schedules.map((weekSchedule, index) => (
            <div key={index} className={cx('week')}>
              <h2 className={cx('week-title')}>{weekSchedule.week}</h2>
              <table className={cx('table')}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Lớp học phần</th>
                    <th>Giảng viên</th>
                    <th>Link Meet</th>
                    <th>Thứ</th>
                    <th>Tiết học</th>
                    <th>Địa điểm</th>
                  </tr>
                </thead>
                <tbody>
                  {weekSchedule.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.STT}</td>
                      <td>{item.class}</td>
                      <td>{item.lecturer}</td>
                      <td>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          {item.link}
                        </a>
                      </td>
                      <td>{item.day}</td>
                      <td>{item.periods}</td>
                      <td>{item.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassSchedule;