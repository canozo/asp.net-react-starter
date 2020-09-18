import Asset, { clone as cloneAsset } from './Asset';
import Liability, { clone as cloneLiability } from './Liability';

export default interface MonthlyReport {
  monthlyReportId: string;
  createdOn: string;
  month: string;
  year: string;
  fullDate: string;
  assets: Array<Asset>;
  liabilities: Array<Liability>;
};

export function clone(report: MonthlyReport | null): MonthlyReport | null {
  if (report === null) {
    return null;
  }

  return {
    monthlyReportId: report.monthlyReportId,
    createdOn: report.createdOn,
    month: report.month,
    year: report.year,
    fullDate: report.fullDate,
    assets: report.assets.map(asset => cloneAsset(asset)),
    liabilities: report.liabilities.map(liability => cloneLiability(liability)),
  };
};

