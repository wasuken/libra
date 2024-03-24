// BookTabs.tsx
import React, { useState } from "react";
import styles from "./index.module.css";
import BookList from "@/components/BookList";
import RentalBookList from "@/components/RentalBookList";
import ReserveBookList from "@/components/ReserveBookList";
import { BookListInfo } from "@/const";

interface BookTabProps {
  tabs: BookListInfo[];
}

const BookListTab: React.FC<BookListTabProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const renderTabContent = () => {};

  return (
    <div className={styles.bookTabs}>
      <div className={styles.tabButtons}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tabButton} ${
              activeTab === index ? styles.activeTabButton : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>{tabs[activeTab].contents}</div>
    </div>
  );
};

export default BookListTab;
