"use client";

import { useEffect } from "react";
import { useProgress, PageId } from "../hooks/useProgress";

interface PageTrackerProps {
  pageId: PageId;
}

export default function PageTracker({ pageId }: PageTrackerProps) {
  const { markVisited } = useProgress();

  useEffect(() => {
    markVisited(pageId);
  }, [markVisited, pageId]);

  return null;
}
