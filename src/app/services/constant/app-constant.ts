export const LOCAL_STORAGE_KEY = {
  USER_INFO: 'user-info',
  USER_LOGIN: 'user-login',
  TOKEN: 'token',
  REPORT_TIME_SELECT_TIME_PICKER: 'report_time_select_time_picker',
  INDEX_MENU: 'indexMenu',
};

export const TIME_SELECT = {
  TODAY: 1,
  YESTERDAY: 2,
  LAST_24H: 3,
  LAST_7DAY: 4,
  LAST_30DAY: 5,
  THIS_MONTH: 6,
  LAST_MONTH: 7,
  ALL_TIME: 8,
  SELECT: 9,
};

export const TIME_TYPE = {
  HOUR: 1, //Giờ
  DAY: 2, //Thứ trong tuần
  DATE: 3, //Ngày trong tháng
  MONTH: 4, //Tháng trong năm
};

export const EVENT_PUSH = {
  TABLE: 'table-event',
  SELECTION: 'table-selection',
};

export const BUTTON_TYPE = {
  DELETE: 9,
};

export const CLICK_DETAIL = {
  ACCOUNT_MANAGER: 1,
  STAFF: 2,
};

export const STATUS = {
  FAIL: 0,
  SUCCESS: 1,
};

// Cấu hình hiển thị Date của DatePicker
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
