"use client";
import React from "react";
import { Contact } from "./types";

const InquiryDetailsBox = ({ contacts }: { contacts: Contact[] }) => {
  return (
    <section className="mt-4">
      {contacts.map((contact, index) => (
        <div key={index} className="mb-4 border p-2">
          <p>유저 ID: {contact.userId}</p>
          <p>카테고리: {contact.category}</p>
          <p>내용: {contact.content}</p>
        </div>
      ))}
    </section>
  );
};

export default InquiryDetailsBox;
