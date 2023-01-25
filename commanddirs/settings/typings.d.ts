export type settingsCategory = {
  name: string;
  display: string;
  description: string;
  settings: setting[];
};
export type setting = {
  name: string;
  display: string;
  description: string;
  type: string;
  defaultValue: any;
};

export type saveSetting = {
  category: string;
  name: string;
  type: string;
  value: any;
};
