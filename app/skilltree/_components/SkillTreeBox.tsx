const SkillTreeBox = ({
  title,
  name,
  skills,
  tieredSkills,
  content,
  desc,
  level,
}: {
  title?: string;
  name?: string;
  skills?: string;
  tieredSkills?: string;
  content?: string;
  desc?: string;
  level?: number;
}) => {
  return (
    <section className="w-full p-1 border">
      <div className="flex flex-col gap-2">
        {tieredSkills && (
          <p className="font-bold text-center">{tieredSkills}</p>
        )}
        {title && <p className="font-bold text-center">{title}</p>}
        {content && <p className="font-bold text-center text-sm">{content}</p>}
        {level && <p className="text-center font-bold">{level}Lv</p>}
        {name && (
          <p className="text-xs text-center text-[#FD5171] font-bold">{name}</p>
        )}
        {skills && <p className="text-xs font-bold">{skills}</p>}
        {desc && <p className="text-xs text-center font-bold">{desc}</p>}
      </div>
    </section>
  );
};

export default SkillTreeBox;
