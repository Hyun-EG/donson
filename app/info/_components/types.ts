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

export type AbilityType = {
  date: string;
  ability_grade: string;
  ability_info: [
    {
      ability_no: string;
      ability_grade: string;
      ability_value: string;
    }
  ];
  remain_fame: number;
  preset_no: number;
  ability_preset_1: {
    ability_preset_grad: string;
    ability_info: [
      {
        ability_no: string;
        ability_grade: string;
        ability_value: string;
      }
    ];
  };
  ability_preset_2: {
    ability_preset_grade: string;
    ability_info: [
      {
        ability_no: string;
        ability_grade: string;
        ability_value: string;
      }
    ];
  };
  ability_preset_3: {
    ability_preset_grade: string;
    ability_info: [
      {
        ability_no: string;
        ability_grade: string;
        ability_value: string;
      }
    ];
  };
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
