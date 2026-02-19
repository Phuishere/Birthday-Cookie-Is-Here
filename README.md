# Introduction

A beautiful combo of Typescript + React + Mediapipe - a toy project yayy.

I intended to also use Tailwind, but CSS is a little bit more convenient rn, so... Maybe refactor's for another day.

# Environment set-up progress

## Installing Mediapipe FaceMesh and Hand Landmark

- Install Hand Landmark
```bash
npm install @mediapipe/hands
```

## Installing Typescript:

```bash
npm install --save-dev typescript @types/react @types/react-dom
npx tsc --init # Creating tsconfig.json

# Installing test libraries since JS doesn't care, but TS does
npm install --save-dev @types/jest @types/testing-library__jest-dom @testing-library/react @testing-library/jest-dom --legacy-peer-deps # The tag --legacy-peer-deps is great to bypass the error (see more in LEARNING.md)
```