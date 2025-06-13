import React from "react";
import pkg from "@/package.json";

const Footer = () => {
  const { version } = pkg;
  return (
    <section className="fixed bottom-0 left-0 w-full h-20 py-2 flex flex-col justify-center items-center border-t border-[#bebebe] bg-white opacity-90">
      <p className="text-sm">
        &copy; 2025 <span className="text-sky-500">DONSON</span> park seonghyun
        all right reserved.
      </p>
      <p className="font-bold text-sm">Data based on NEXON Open API</p>
      <p className="text-sm">
        Version <span className="font-bold">{version}</span>
      </p>
    </section>
  );
};

export default Footer;
