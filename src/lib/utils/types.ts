export type Trace = {
  label: string;
  color: string;
  values: TraceValues;
};

export type TraceValues = {
  [key: string]: number;
};

export type Theme = {
  name: string;
  next: string;
  icon: string;
  fontColor: string;
  backgroundColor: string;
  fadedBackgroundColor: string;
  highlightColor: string;
  linkColor: string;
};
