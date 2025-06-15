interface CashBase {
  title: string;
  url: string;
  date: string;
  date_sale_start: string;
  date_sale_end: string;
  ongoing_flag: string;
}

export interface CashSummary extends CashBase {
  notice_id: number;
}

export interface CashDetail extends CashBase {
  contents: string;
}

export interface CashList {
  cashshop_notice: CashSummary[];
}
