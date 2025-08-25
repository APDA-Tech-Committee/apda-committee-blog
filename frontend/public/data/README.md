# APDA Committee Blog Static Data Guide

This document explains how to manage content through static files for the APDA Committee Blog.

## Directory Structure

All static data is stored in the `/public/data/` directory with the following structure:

```
public/data/
├── posts/                # Blog posts
│   ├── index.json        # Metadata for all posts
│   └── [slug].md         # Individual post content files
├── committees/           # Committee information
│   └── index.json        # All committees data
├── team/                 # Team member information
│   └── index.json        # All team members data
├── categories/           # Post categories
│   └── index.json        # All categories data
├── tags/                 # Post tags
│   └── index.json        # All tags data
└── content/              # Additional markdown content
    └── [name].md         # Various content files like about pages
```

## Adding/Editing Content

### Blog Posts

To add a new blog post:

1. Create a new markdown file in `/public/data/posts/` with the post slug as the filename (e.g., `my-new-post.md`)
2. Add or update the post metadata in `/public/data/posts/index.json`

Example post in `index.json`:
```json
{
  "posts": [
    {
      "id": "unique-id-1",
      "title": "My New Post",
      "slug": "my-new-post",
      "excerpt": "A brief summary of the post",
      "publishedAt": "2025-08-24T00:00:00.000Z",
      "author": {
        "name": "Author Name",
        "position": "Position"
      },
      "category": {
        "id": "category-id",
        "name": "Category Name",
        "color": "blue"
      },
      "tags": [
        {
          "id": "tag-id-1",
          "name": "Tag Name"
        }
      ],
      "committeeId": "committee-id"
    }
  ]
}
```

Example post content in `my-new-post.md`:
```markdown
# My New Post

This is the content of my blog post.

## Subheading

More content here.
```

### Committees

To add or update committee information, edit `/public/data/committees/index.json`:

```json
{
  "committees": [
    {
      "id": "committee-id",
      "name": "Committee Name",
      "slug": "committee-slug",
      "description": "Brief description",
      "logoUrl": "/images/committees/logo.png",
      "members": [
        {
          "id": "member-id",
          "name": "Member Name",
          "position": "Position",
          "imageUrl": "/images/team/photo.jpg"
        }
      ]
    }
  ]
}
```

If you want to add detailed "about" content for a committee, create a markdown file at `/public/data/content/committee-slug-about.md`.

### Team Members

To add or update team members, edit `/public/data/team/index.json`:

```json
{
  "members": [
    {
      "id": "member-id",
      "name": "Member Name",
      "position": "Position",
      "bio": "Short biography",
      "email": "email@example.com",
      "imageUrl": "/images/team/photo.jpg",
      "socialLinks": {
        "twitter": "https://twitter.com/username",
        "github": "https://github.com/username",
        "linkedin": "https://linkedin.com/in/username"
      }
    }
  ]
}
```

### Categories and Tags

Update categories in `/public/data/categories/index.json` and tags in `/public/data/tags/index.json`.

## Best Practices

1. Use consistent IDs for entities referenced across multiple files
2. Keep image paths relative to the public directory
3. Always validate JSON files after editing to ensure they are valid
4. Use ISO format for dates (YYYY-MM-DDTHH:MM:SS.sssZ)
5. Make sure post slugs match their corresponding markdown filenames

## File Formats

- **JSON files**: Store structured metadata and relationships
- **Markdown files**: Store rich content with formatting
