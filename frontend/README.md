# APDA Committee Blog - Frontend

This is the frontend application for the APDA Committee Blog, built with Vue 3 and Vite.

## Static Data Mode

This application uses a static data approach to serve content instead of making API calls. All content is stored in JSON and Markdown files in the `/public/data/` directory.

### Content Structure

- **Blog Posts**: `/public/data/posts/`
  - `index.json` contains metadata for all posts
  - Individual `.md` files contain the actual post content
- **Committees**: `/public/data/committees/index.json`
- **Team Members**: `/public/data/team/index.json`
- **Categories**: `/public/data/categories/index.json`
- **Tags**: `/public/data/tags/index.json`
- **Additional Content**: `/public/data/content/`

For detailed instructions on how to manage content, see the [Static Data Guide](/public/data/README.md).

## Development Setup

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Features

- **Static File CMS**: All content is managed through static files
- **Markdown Support**: Blog posts and other content are written in Markdown
- **TypeScript**: Full TypeScript support for type safety
- **Responsive Design**: Mobile-friendly interface
- **TailwindCSS**: Utility-first CSS framework for styling

## Contributing

1. Create or edit content files in the `/public/data/` directory
2. Make sure to follow the JSON schema in `/public/data/schema.json`
3. Validate your JSON files
4. Test your changes locally
5. Commit and push to deploy updates
