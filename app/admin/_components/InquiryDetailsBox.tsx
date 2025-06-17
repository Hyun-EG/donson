"use client";
import React, { useState } from "react";
import { Contact } from "./types";
import LoadingOverlay from "@/app/(components)/LoadingOverlay";

const InquiryDetailsBox = ({ contacts }: { contacts: Contact[] }) => {
  const [selectedIdx, setSelectedIdx] = useState<null | string>(null);
  const [localContacts, setLocalContacts] = useState<Contact[]>(contacts);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveContact = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();

    if (deletingId) return;

    setIsLoading(true);

    try {
      setDeletingId(id);

      const res = await fetch("api/delete-contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      if (!res.ok) {
        alert("문의내역 삭제에 실패했습니다.");
        setDeletingId(null);
      }
      setLocalContacts((prev) => prev.filter((contact) => contact._id !== id));

      setTimeout(() => {
        setDeletingId(null);
      }, 3000);

      alert("문의내역 삭제에 성공했습니다.");
    } catch (error) {
      console.error("문의내역 삭제 중 에러가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-4">
      {isLoading && <LoadingOverlay />}
      {localContacts.map((contact, index) => (
        <article key={index} className="p-2 border-b">
          <div
            onClick={() => {
              setSelectedIdx((prev) => (prev ? null : contact._id));
            }}
          >
            <header className="flex justify-between">
              <p>카테고리: {contact.category}</p>
              <button
                onClick={(e) => {
                  handleRemoveContact(e, contact._id);
                }}
                className="w-14 h-6 px-2 py-1 flex justify-center items-center border rounded-lg text-xs"
                disabled={deletingId === contact._id}
              >
                {deletingId === contact._id ? "삭제 중" : "삭제"}
              </button>
            </header>
            <div className="pr-5 flex justify-between items-center">
              <p>유저 ID: {contact.userId}</p>
              <span className="text-xs">
                {selectedIdx === contact._id ? "△" : "▽"}
              </span>
            </div>
          </div>
          {selectedIdx === contact._id && (
            <main className="px-1 py-2 bg-[#bebebe] rounded-lg">
              <p>내용: {contact.content}</p>
            </main>
          )}
        </article>
      ))}
    </section>
  );
};

export default InquiryDetailsBox;
