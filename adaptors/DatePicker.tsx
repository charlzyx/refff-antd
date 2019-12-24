import moment, { Moment } from 'moment';

import { DatePicker as AntdDatePicker } from 'antd';
import { link } from '@refff/core';

const { RangePicker: AntdRangePicker } = AntdDatePicker;

export const RangePicker = link(AntdRangePicker, {
  pipe: {
    v2c: [
      (range: any) => {
        return [moment(range[0]), moment(range[1])];
      },
    ],
    c2v: [
      (range: Moment[], props) => {
        const formats = Array.isArray(props.format)
          ? [props.format[0] || 'YYYY-MM-DD', props.format[1] || 'YYYY-MM-DD']
          : [props.format || 'YYYY-MM-DD', props.format || 'YYYY-MM-DD'];
        return [
          moment(range[0]).format(formats[0]),
          moment(range[1]).format(formats[1]),
        ];
      },
    ],
  },
});

export const DatePicker = link(AntdDatePicker, {
  pipe: {
    v2c: [
      (v: any) => {
        return moment(v);
      },
    ],
    c2v: [
      (v: Moment, props) => {
        const formats = props.format ? props.format : 'YYYY-MM-DD';
        return moment(v).format(formats[0]);
      },
    ],
  },
});

DatePicker.RangePicker = RangePicker;
