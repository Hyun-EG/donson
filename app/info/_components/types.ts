export type FinalStat = {
  stat_name: string;
  stat_value: string;
};

export type CharStat = {
  date: string | null;
  character_class: string;
  final_stat: FinalStat[];
  remain_ap: number;
};
