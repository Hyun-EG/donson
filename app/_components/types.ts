export type CharInfo = {
  character_image?: string;
  character_name?: string;
  character_level?: number;
  character_guild_name?: string;
  world_name?: string;
  character_date_create?: string;
  character_exp_rate?: string;
  liberation_quest_clear_flag: string;
};

export interface PersonalityRadarChartProps {
  charisma_level: number;
  sensibility_level: number;
  insight_level: number;
  willingness_level: number;
  handicraft_level: number;
  charm_level: number;
}
