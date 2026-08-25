const TIMELINE: any[] = [];

export function pushTimeline(event: any) {
  TIMELINE.push({
    ts: Date.now(),
    ...event,
  });

  if (TIMELINE.length > 200) TIMELINE.shift();
}

export function getTimeline() {
  return TIMELINE;
}