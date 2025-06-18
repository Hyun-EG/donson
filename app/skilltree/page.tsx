import SkillTreeBox from "./_components/SkillTreeBox";

const SkillTree = () => {
  return (
    <section className="w-full h-full mb-10">
      <h1 className="text-lg text-center font-bold">렌 스킬트리</h1>
      <main className="mt-4 flex flex-col gap-1">
        <SkillTreeBox
          tieredSkills="1차 스킬트리"
          name="매화검 본초"
          skills="참 1 → 청풍보 1 → 매화비보 1 → 청허심경 1 → 청풍유심 M → 청허심경 M → 매화검 본초 : 참 M → 매화비보 M → 청풍보 M"
        />
        <SkillTreeBox
          tieredSkills="2차 스킬트리"
          name="매화검 본초"
          skills="자 1 → 매화검 1초식 : 순인1 → 망혼검 본초 : 영격 1 → 장검 가속 M → 청허심경 II M → 장검 숙련 M → 신체 단련 M"
        />
        <SkillTreeBox
          tieredSkills="3차 스킬트리"
          name="매화검 본초"
          skills="천 1 → 망혼검 절기 : 열지 1 → 매화검 2초식 : 쇄매 1 → 매화검 본초 : 천 M → 망혼검 절기 : 열지 M → 매화검 2초식 : 쇄매M → 청허심경 III M → 망혼검 1초식 : 운기 M → 망혼강림 M → 강신 M"
        />
        <SkillTreeBox
          tieredSkills="4차 스킬트리"
          name="매화검 본초"
          skills="선참 1 → 매화검 3초식 : 예인 1 → 매화검 3초식 : 일격예인 1 → 매화검 4초식 : 영인 1 → 망혼검 절기 : 망탄 M → 망혼검 본초 : 영격 III M → 망혼검 2초식 : 연참 M → 매화검 본초 : 선참 M → 매화검 3초식 : 예인 M → 매화검 3초식 : 일격예인 M → 매화검 4초식 : 영인 M"
        />
        <article className="mt-4">
          <p className="font-bold text-center text-[#FD5171]">
            코어 강화 우선순위
          </p>
        </article>
        <SkillTreeBox
          tieredSkills="1순위"
          name="매화검 본초 : 선참"
          desc="렌의 가장 기본적이고 자주 사용하는 주력 공격 스킬을 강화합니다."
        />
        <SkillTreeBox
          tieredSkills="2순위"
          name="망혼검 본초 : 영격"
          desc="보스 몬스터에게 강력한 데미지를 입히는 스킬의 성능을 크게 높여줍니다."
        />
        <SkillTreeBox
          tieredSkills="3순위"
          name="매화검 2초식 : 쇄매	"
          desc="다른 스킬과 연계하여 추가적인 데미지를 넣는 스킬을 강화합니다."
        />
        <SkillTreeBox
          tieredSkills="4순위"
          name="망혼검 절기 : 열지·망탄·무량겁"
          desc="강력한 마무리 기술인 '절기' 계열의 주요 스킬들을 강화합니다."
        />
        <SkillTreeBox
          tieredSkills="5순위"
          name="매화검 3초식 : 예인"
          desc="세 번째로 이어지는 연타 공격 스킬을 강화하여 지속적인 데미지를 높입니다."
        />
        <SkillTreeBox
          tieredSkills="6순위"
          name="망혼검 2초식 : 연참·매화검 4초식 : 영인"
          desc="다른 스킬 사용 후 이어지는 후속 공격 스킬들을 보조적으로 강화합니다."
        />
        <SkillTreeBox
          tieredSkills="7~9순위"
          name="매화검 본초 : 참·자·천"
          desc="1차부터 3차까지 배운 기본적인 공격 스킬들을 보강하여 전반적인 공격력을 끌어올립니다."
        />
        <article className="mt-4">
          <p className="font-bold text-center text-[#FD5171]">
            하이퍼 스킬트리
          </p>
        </article>
        <SkillTreeBox
          title="망혼검 본초 : 영격 - 리인포스"
          desc="망혼검 본초 : 영격' 스킬의 데미지를 20% 증가시킵니다."
        />
        <SkillTreeBox
          title="매화검 본초 : 선참 - 리인포스"
          desc="매화검 본초 : 선참' 스킬의 데미지를 20% 증가시킵니다."
        />
        <SkillTreeBox
          title="매화검 본초 : 선참 - 보스 킬러"
          desc="매화검 본초 : 선참' 스킬로 보스 몬스터 공격 시 데미지를 추가로 20% 증가시킵니다."
        />
        <SkillTreeBox
          title="망혼강림 - 리인포스"
          desc="망혼강림' 스킬의 데미지를 20% 증가시킵니다."
        />
        <SkillTreeBox
          title="망혼강림 - 이그노어 가드"
          desc="'망혼강림' 사용 시 몬스터의 방어율을 20% 추가로 무시하여 더 높은 데미지를 입힐 수 있게 합니다."
        />
        <article className="mt-4">
          <p className="font-bold text-center text-[#FD5171]">액티브 스킬</p>
        </article>
        <SkillTreeBox
          name="승화"
          level={140}
          desc="사용 시 일정 시간 동안 자신의 데미지를 크게 증가시키는 강력한 버프 스킬입니다."
        />
        <SkillTreeBox
          name="매화검 5초식 : 천매지박"
          level={160}
          desc="단숨에 강력한 한 방 데미지를 입히는 강력한 일격 필살기입니다."
        />
        <SkillTreeBox
          name="망혼검 절기 : 무량겁"
          level={190}
          desc="넓은 범위에 폭발적인 데미지를 자랑하는 매우 강력한 절기 스킬입니다."
        />
        <article className="mt-4">
          <p className="font-bold text-center text-[#FD5171]">어빌리티 추천</p>
        </article>
        <SkillTreeBox
          title="보스 몬스터 공격 시 데미지 증가"
          name="보스용"
          desc="보스 몬스터와의 전투에서 지속적으로 높은 데미지를 줄 수 있게 됩니다."
        />
        <SkillTreeBox
          title="버프 스킬의 지속시간 증가"
          name="보스용"
          desc="버프 스킬이 더 오래 유지되어 스킬 재사용 대기시간 관리가 편해지고 전투 효율이 높아집니다."
        />
        <SkillTreeBox
          title="상태 이상에 걸린 적 공격 시 데미지 증가"
          name="보스용"
          desc="상태 이상 효과를 받는 적에게 더 큰 데미지를 입혀, 지속적인 공격력을 강화합니다."
        />
        <SkillTreeBox
          title="(렌의 주력 사냥 스킬) 공격 범위 증가 또는 다수 공격 스킬 범위 증가"
          name="사냥용"
          desc="몬스터를 한 번에 더 많이 공격할 수 있어 사냥 효율이 크게 오릅니다. (예: 메테오 장판 범위 증가)"
        />
        <SkillTreeBox
          title="일반 몬스터 공격 시 데미지 증가"
          name="사냥용"
          desc="일반 몬스터를 더 빠르게 처치하여 사냥 속도를 향상시킵니다."
        />
        <article className="mt-4">
          <p className="font-bold text-[#FD5171] text-center">링크스킬 세팅</p>
        </article>
        <SkillTreeBox
          tieredSkills="1순위"
          content="받는 피해 15% 감소, 공격 시 대상 방어율 10% 무시"
          name="제로"
          desc="어떤 상황에서든 생존력을 크게 높여주고, 적의 방어력을 일부 무시하여 데미지를 더 잘 넣게 합니다."
        />
        <SkillTreeBox
          tieredSkills="1순위"
          content="	데미지 10% 증가"
          name="데몬어벤저"
          desc="모든 공격의 데미지를 전반적으로 올려주어 기본적인 공격력을 강화합니다."
        />
        <SkillTreeBox
          tieredSkills="1순위"
          content="크리티컬 확률 15% 증가"
          name="팬텀"
          desc="크리티컬 공격이 터질 확률을 높여, 안정적으로 높은 데미지를 기대할 수 있게 합니다."
        />
        <SkillTreeBox
          tieredSkills="1순위"
          content="크리티컬 데미지 4% 증가"
          name="키네시스"
          desc="크리티컬 공격이 터졌을 때의 데미지를 더욱 강력하게 만들어줍니다."
        />
        <SkillTreeBox
          tieredSkills="1순위"
          content="모든 능력치(올스탯) 10% 증가"
          name="제논"
          desc="캐릭터의 힘, 민첩, 지력, 운 등 모든 기본 능력치를 올려 전반적인 성능을 향상시킵니다."
        />
        <SkillTreeBox
          tieredSkills="2순위"
          content="공격 시 대상 방어율 15% 무시"
          name="루미너스"
          desc="몬스터의 방어율을 무시하는 능력을 높여 실제 입히는 데미지를 증가시킵니다."
        />
        <SkillTreeBox
          tieredSkills="2순위"
          content="보스 몬스터 공격 시 데미지 15% 증가"
          name="데몬슬레이어"
          desc="보스 몬스터를 상대할 때 공격력을 크게 높여주어 보스전 공략에 큰 도움을 줍니다."
        />
        <SkillTreeBox
          tieredSkills="2순위"
          content="10초 동안 데미지 45% 증가 (90초 재사용 대기시간, 액티브 스킬)"
          name="엔젤릭버스터"
          desc="짧은 시간 동안 폭발적인 데미지를 낼 수 있게 해주는 강력한 버프 스킬입니다."
        />
      </main>
    </section>
  );
};

export default SkillTree;
