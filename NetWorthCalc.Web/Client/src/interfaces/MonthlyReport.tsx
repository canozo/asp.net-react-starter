import Asset from './Asset';
import Liability from './Liability';

export default interface MonthlyReport {
  monthlyReportId: string;
  createdOn: string;
  month: number;
  year: number;
  fullDate: string;
  assets: Array<Asset>;
  liabilities: Array<Liability>;
};

export interface MonthlyReportInfo {
  monthlyReportId: string;
  createdOn: string;
  month: number;
  year: number;
  fullDate: string;
};
