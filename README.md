# Pokedex

#### Website Link: https://pokedex-next-topaz.vercel.app/

Build and analyze your perfect Pokemon team. Access comprehensive
data for all Pokemon, compare stats, and discover winning
combinations using the https://pokeapi.co/

## Features

- **Pokedex**: Browse and search through all pokemon with detailed information
- **Team Builder**: Create and analyze team compositions
- **Compare Tool**: Compare stats and abilities between different pokemon
- **Advanced Filtering**: Filter pokemon by type, generation, abilities, and stats
- **Team Analysis**: Get insights on team strengths, weaknesses, and type coverage
- **Responsive Design**: Full mobile and desktop support

## Tech Stack

### Core Technologies

- TypeScript
- Next.js 15
- Zustand
- TanStack Query
- Tailwind CSS
- NextAuth

### UI Components & Libraries

- Shadcn
- Recharts
- DND Kit

### Package Manager

- Yarn

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/pokemon-team-builder.git

cd pokemon-team-builder

```

2. **Development server**

```
yarn && yarn dev
```

3. **Build and start for production**

```
yarn && yarn build && yarn start
```

## Development Decisions

- Utilized **Nextjs** for server-side rendering and **optimal performance**
- Utilized **Zustand** for simple and efficient global state management and **persistance in local storage**
- Utilized **TanStack Query** as an **async state mangement library** and for it's **caching abilities**
- Employed **shadcn** for consistent UI components and **accessibility**
- Used **NextAuth** for team management per user

---

## Known Issues

- Type effectiveness calculation might show incorrect values for certain dual-type Pokemon
- Image loading can be optimized

---

## Future Improvements

- Virtual list for inifinite scrolling
- Improved UI/UX (Dark mode)
- Type transformation to break-down and use individual types for specific use cases
- Add tests

## Challenges faced

- Decision to segrate what is client side state for zustand and server side state for react query
- To minimize waterfall along with using nextjs's static params to preload pokemon details
- To minimize the number of api calls for client side filtering of pokdex
