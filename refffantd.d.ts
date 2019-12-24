/* eslint-disable @typescript-eslint/no-empty-interface */
import { RuleItem } from 'async-validator';

import { FormProps as AntdFormProps, FormItemProps } from 'antd/es/form';
// import original module declarations
import '@refff/core';

// and extend them!
export declare module '@refff/core' {
  export interface Rule extends RuleItem {}

  export interface FormProps extends AntdFormProps {}
  export interface FieldProps extends FormItemProps {}
  export interface NoticeProps {
    nothing: string;
  }
}
