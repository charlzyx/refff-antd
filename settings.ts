import AsyncValidator from 'async-validator';
import { Form } from 'antd';
import { settings } from '@refff/core';

const { Item } = Form;
const isEvent = (e: any) => {
  if (e instanceof Event) {
    return e;
  } else if (e.target && e.stopPropagation && e.preventDefault) {
    return e as Event;
  }
  return false;
};

settings.set.UI.Field(Item);
settings.set.UI.Form(Form);
settings.set.validator((ref, rule, label = '') => {
  const checker = new AsyncValidator({ [label]: rule });
  const value = ref.current;
  const waitValidate = { [label]: value };
  return checker
    .validate(waitValidate)
    .then(() => {})
    .catch((asyncvalidaError: { errors: { message: string }[] }) => {
      try {
        const message = asyncvalidaError.errors[0].message;
        return Promise.reject({ message });
      } catch (e) {
        return Promise.reject(e);
      }
    });
});
settings.set.meta({
  child: {
    disabled: 'disabled',
    help: 'help',
    onBlur: 'onBlur',
    onChange: 'onChange',
    valid: 'valid',
    value: 'value',
  },
  field: {
    disabled: 'disabled',
    valid: 'validateStatus',
    help: 'help',
  },
});
settings.set.pipe({
  v2c: [],
  c2v: [
    (x) => {
      if (isEvent(x)) {
        return x.target.value;
      }
      return x;
    },
  ],
  order: ['default', 'static', 'props'],
});
