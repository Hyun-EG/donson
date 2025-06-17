"use client";
import React, { useState } from "react";
import { Contact } from "./types";
import LoadingOverlay from "@/app/(components)/LoadingOverlay";
import Pagination from "./Pagination";

const InquiryDetailsBox = ({ contacts }: { contacts: Contact[] }) => {
  const [selectedIdx, setSelectedIdx] = useState<null | string>(null);
  const [localContacts, setLocalContacts] = useState<Contact[]>(contacts);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedContacts, setDisplayedContacts] = useState<Contact[]>(
    contacts.slice(0, 3)
  );

  const totalPage = Math.ceil(contacts.length / 3);

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
    <section className="w-full h-80 mt-4 flex flex-col justify-between border-b">
      <div>
        <h1 className="font-bold">용사님들의 문의내역</h1>
        {isLoading && <LoadingOverlay />}
        {displayedContacts.map((contact, index) => (
          <article key={index} className="flex flex-col p-2 border-b">
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
      </div>
      <footer className="w-full h-10 flex justify-center items-center gap-2">
        <Pagination
          curTotalPage={totalPage}
          allContacts={localContacts}
          onPageChange={(start, end) => {
            setDisplayedContacts(localContacts.slice(start, end));
          }}
        />
      </footer>
    </section>
  );
};

export default InquiryDetailsBox;
