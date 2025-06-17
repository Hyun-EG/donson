import Image from "next/image";
import React from "react";

const MapBox = ({
  src,
  name,
  start,
  end,
  level,
  unit,
  exp,
}: {
  src: string;
  name: string;
  start: number;
  end: number;
  level: number;
  unit: number;
  exp: string;
}) => {
  return (
    <section className="w-full p-2 mb-2 border">
      <p className="text-center text-sm font-bold ">
        <span>{start}</span>~<span>{end}</span> {name}
      </p>
      <div className="relative w-full h-32 my-2 rounded overflow-hidden z-[-1]">
        <Image
          quality={90}
          className="object-cover"
          fill
          src={src}
          alt={name}
        />
      </div>
      <p className="text-sm">
        평균 레벨 : <span className="font-bold">{level}</span>
      </p>
      <p className="text-sm">
        젠 : <span className="font-bold">{unit}</span>마리
      </p>
      <p className="text-sm">
        젠당 <span className="font-bold">{exp}</span>만 경험치
      </p>
    </section>
  );
};

export default MapBox;
