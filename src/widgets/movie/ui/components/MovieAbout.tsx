import { useState } from "react";
import { Button } from "@/shared";
import cn from "clsx";
import styles from "../moviePage.module.scss";

export function MovieAbout({ overview }: { overview: string }) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className={styles.about}>
      <div>
        <Button
          className={cn(activeTab === 1 && styles.active)}
          onClick={() => setActiveTab(1)}
        >
          About Movie
        </Button>
        <Button
          className={cn(activeTab === 2 && styles.active)}
          onClick={() => setActiveTab(2)}
        >
          Reviews
        </Button>
        <Button
          className={cn(activeTab === 3 && styles.active)}
          onClick={() => setActiveTab(3)}
        >
          Cast
        </Button>
      </div>
      <p>{overview}</p>
    </div>
  );
}
