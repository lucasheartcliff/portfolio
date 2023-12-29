import CaretRightOutlined from '@ant-design/icons/CaretRightOutlined';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import React from 'react';

interface Props {
  title: string;
  open: boolean;
  startTime: string;
  endTime?: string;
  hasChildren?: boolean;
  onClickToOpen?: (isOpen: boolean) => void;
}
export default function Item(props: Props) {
  const DATE_FORMAT = 'MMM YYYY';

  const { title, open, startTime, endTime, hasChildren, onClickToOpen } = props;

  function onClick() {
    const v = !open;
    onClickToOpen && onClickToOpen(v);
  }
  function formatDuration() {
    const start = moment(startTime);
    const end = moment(endTime);

    const duration = moment.duration(end.diff(start));

    const years = duration.years();
    const months = duration.months();
    const days = duration.days();

    let formattedString = '';

    if (years > 0) {
      formattedString += `${years} ${years === 1 ? 'year' : 'years'}`;
    }

    if (months > 0) {
      formattedString += ` ${months} ${months === 1 ? 'month' : 'months'}`;
    }

    if (days > 0) {
      formattedString += ` ${days} ${days === 1 ? 'day' : 'days'}`;
    }
    formattedString = formattedString.trim();
    return !formattedString ? '' : `(${formattedString.trim()})`;
  }

  const period = `${moment(startTime).format(DATE_FORMAT)} - ${
    endTime ? moment(endTime).format(DATE_FORMAT) : 'Now'
  } ${formatDuration()}`;

  return (
    <div className="flex h-20 w-7/12 flex-row items-center  justify-center p-4">
      <div className="w-full">
        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold text-black">
          <Tooltip title={title}>
            <span>{title}</span>
          </Tooltip>
        </div>

        <div
          className={`w-full overflow-hidden text-ellipsis whitespace-nowrap text-base text-gray-600`}
        >
          {period}
        </div>
      </div>

      <div
        className={` ml-5 items-end justify-center ${
          !hasChildren ? 'hidden' : ''
        }`}
        onClick={onClick}
      >
        <CaretRightOutlined
          className={`text-base font-extrabold  text-black ${
            open ? 'rotate-90' : ''
          }`}
        />
      </div>
    </div>
  );
}
