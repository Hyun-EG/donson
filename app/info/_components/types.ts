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

export interface HyperStatDetail {
  stat_type: string;
  stat_point: number;
  stat_level: number;
  stat_increase: string;
}

export interface HyperStat {
  date: string;
  character_class: string;
  use_preset_no: string;
  use_available_hyper_stat: number;

  hyper_stat_preset_1: HyperStatDetail[];
  hyper_stat_preset_1_remain_point: number;

  hyper_stat_preset_2: HyperStatDetail[];
  hyper_stat_preset_2_remain_point: number;

  hyper_stat_preset_3: HyperStatDetail[];
  hyper_stat_preset_3_remain_point: number;
}
