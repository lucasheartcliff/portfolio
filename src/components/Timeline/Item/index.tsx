import RightOutlined from '@ant-design/icons/lib/icons/RightOutlined';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  title: string;
  open: boolean;
  startDate: string;
  endDate?: string;
  hasChildren?: boolean;
  description?: string;
  onClickToOpen?: (isOpen: boolean) => void;
}
export default function Item(props: Props) {
  const DATE_FORMAT = 'MMM YYYY';

  const { title, open, startDate, endDate, onClickToOpen, description } = props;
  const { t } = useTranslation(['common']);

  const opennedContent = open && description;
  function onClick() {
    if (!description) return;
    const v = !open;
    if (onClickToOpen) onClickToOpen(v);
  }
  function formatDuration() {
    const start = moment(startDate);
    const end = moment(endDate).add(1, 'day');

    const duration = moment.duration(end.diff(start));

    const years = duration.years();
    const months = duration.months();
    // const days = duration.days();

    let formattedString = '';

    if (years > 0) {
      formattedString += `${years} ${years === 1 ? t('year') : t('years')}`;
    }

    if (months > 0) {
      formattedString += ` ${months} ${
        months === 1 ? t('month') : t('months')
      }`;
    }

    formattedString = formattedString.trim();
    return !formattedString ? '' : `(${formattedString.trim()})`;
  }

  const period = `${moment(startDate).format(DATE_FORMAT)} - ${
    endDate ? moment(endDate).format(DATE_FORMAT) : t('Now')
  } ${formatDuration()}`;

  return (
    <div
      className={
        'flex w-full flex-col items-center px-4 pb-4 text-base md:text-xl'
      }
    >
      <div
        className="flex h-20 w-full flex-row items-center justify-center "
        onClick={onClick}
      >
        <div className="w-full">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-black">
            <Tooltip title={t(title)}>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap ">
                {t(title)}
              </span>
            </Tooltip>
          </div>
          <Tooltip title={period}>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-600 ">
              {period}
            </span>
          </Tooltip>
        </div>

        <div
          className={`flex h-full items-center justify-center ${
            !description ? 'hidden' : ''
          }`}
        >
          <RightOutlined
            className={`text-base font-extrabold  text-black ${
              open ? 'rotate-90' : ''
            }`}
          />
        </div>
      </div>
      <ReactMarkdown
        className={`w-full whitespace-pre-line text-pretty text-justify text-black ${
          opennedContent ? 'pt-4' : 'hidden'
        }`}
      >
        {t(description || '')}
      </ReactMarkdown>
    </div>
  );
}
