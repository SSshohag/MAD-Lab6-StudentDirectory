# Week 6 completed

Based on the supplied Week 5 project and Week 6 lab manual.

Implemented: useDebounce, useMemo filtering, useCallback selection, useRef focus, Statistics tab, department bars, top-five skills, average skills, configurable debounceDelay prop, and 2-second add/remove count badge.

## Compatibility note
Your Week 5 project contains Explore but no Bookmarks feature. The original Explore tab is retained rather than inventing a bookmark state model. All Week 6 graded features are included.

## Run
```bash
npm install
npx expo start
```

## Verify
1. Home search waits about 300 ms after typing.
2. Opening Home focuses search input after 300 ms.
3. Stats shows total, average, department percentages, top five skills.
4. Add/remove a student, then open Stats: totals update. If Stats is already mounted when the count changes, a badge appears for two seconds.
5. Change `debounceDelay` in `src/app/(tabs)/index.tsx` to customize the search delay.

The project was assembled from source; Expo runtime was not executed in this environment.
