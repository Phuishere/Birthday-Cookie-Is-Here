# Learning Progress

```
So... to my future self and to whoever is going to read this.

I have made many project, but very few of them have documentations that I could read after long months of not touching the language, library or framework.

And since I think I have problem concentrating on things, I think delving deeper and writing documents is a great way.
```

> Hence, This is my learning document for the combination of React + Typescript + Tailwind.

# Setting up environment

## Overall
Well, first, create React app according to the document, then just npm install the stuff AI tell you. I currently forgot, but it's really easy.

> [!Warning] If react-scripts just isn't there, there could be problem with the version of packages (even in the ```package.json```). In my case, I chose ```npm audit fix --forced``` and some stuff got downloaded with its latest version, leading to the ```package.jon``` not being able to recognise it, and having the ```react-scripts``` version being **0.0.0**.

## Migrating to Vite

Accordding to Sensei ```Gemini```, Vite and Next.js are alternatives to Create React App (CRA). I don't think I could learn full-stack right now, so ```I chose Vite``` with less changes to my App.

To migrate to Vite, follow these steps:

1. Step 1: Delete react-scripts from package.json
2. Step 2: 

# Setting up Typescript

## npm install

- Use ```npm install``` to download the Typescript language and create the ```tsconfig.json``` file.

```bash
npm install --save-dev typescript @types/react @types/react-dom # Downloading Typescript
npx tsc --init # Creating tsconfig.json

# Installing test libraries since JS doesn't care, but TS does
npm install --save-dev @types/jest @types/testing-library__jest-dom @testing-library/react @testing-library/jest-dom --legacy-peer-deps # The tag --legacy-peer-deps is great to bypass the error (see more in LEARNING.md)
```

- In my case, React scripts version is kinda old, while the TS version is ```Typescript 5```. Hence, it doesn't npm install (testing libraries) when I asked for. The tag ```--legacy-peer-deps``` is the key.

## tsconfig.json

This file is an important aspect of Typescript - affected by the frontend nature of the project too.

### Overall

I looked up the website (TS Config Guide)[tsconfig.guide] on the Internet, and the base config is:

```json
// Updated version in the tsconfig.json file
{
  "compilerOptions": {
    // Base Options recommended for all projects
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "es2022",
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    "verbatimModuleSyntax": false,
    // Enable strict type checking so you can catch bugs early
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    // We are not transpiling, so preserve our source code and do not emit files
    "module": "preserve",
    "noEmit": true,
    // Include the DOM types
    "lib": [
      "es2022",
      "dom",
      "dom.iterable"
    ]
  },
  // Include the necessary files for your project
  "include": [
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### Config setting gloss-over

- ```jsx```: Set to ```react-jsx``` to handle React tags (JSX).

- ```target```: Set to ```EsNext``` (modern and latest) or ```es2022``` (a more conservative and specific version).

- ```module```: Set to ```preserve```; keeping the imports and exports the same *(for other tools like **Vite**)*.

- ```moduleResolution```: Set to bundler (Tells TS to trust Vite/Webpack).

- ```strict```: ```true``` (Enables the Kotlin's strict typing - no implicit nulls and stuff).

# Why choosing Tailwind?

Well, I have been wondering about the choice between Bootstrap and Tailwind.

Bootstrap seems to be a great choice due to its prebuilt components - saving my time as I don't really intend to become a frontend developer.

Yeah, but my experience with Python's ```Ultralytics``` frantically yells that ```"Don't do that, customizing it would be a pain in the as... abyss"```. And unfortunately, my inner self always wants to control things.

Hence, Tailwind + Internet over Bootstrap!

# The Mediapipe FaceMesh

