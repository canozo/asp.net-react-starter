import Asset from './Asset';
import Liability from './Liability';

export default interface MonthlyReport {
  monthlyReportId: string;
  createdOn: string;
  month: string;
  year: string;
  fullDate: string;
  assets: Array<Asset>;
  liabilities: Array<Liability>;
};