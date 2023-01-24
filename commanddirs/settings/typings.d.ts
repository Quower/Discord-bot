export type settingsCategory = {
  name: string;
  description: string;
  settings: setting[];
};
export type setting = {
  name: string;
  description: string;
  type: string;
  defaultValue: any;
};

export type saveSettingsCategory = {
    name: string;
    settings: setting[];
  };
  export type saveSetting = {
    name: string;
    type: string;
    value: any;
  };
