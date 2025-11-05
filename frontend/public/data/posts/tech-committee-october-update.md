# Tech Committee Monthly Update: October 2025

Hello everyone! It's been an exciting month for the Tech Committee! We focused our efforts this month on MIT-Tab and the Standings Site (results.apda.online). Here's a brief summary of our most impactful changes:

## MIT-Tab:

Changes that have already been merged:

### Pairing & Round Management
- **Fixed judge pairing**: Resolved structural issue with judge pairing logic
- **New Judge Settings**: Added pairing wings, new pairing modes, round robin pairing for outrounds, prioritizing the bubble, and repairing functionality
- **Fixed gov/opp side logic**: Corrected issues with side assignment logic
- **Room tags based pairing**: Allows pairing based on room characteristics and requirements
- **Repair round button**: Added functionality to repair problematic rounds with one click instead of needing backups
- **Documented round pairing logic problem**: Created technical documentation explaining structural issues with round pairing, to be addreesed next month

### Check-In & Tournament Operations
- **Check-in improvements**: Single click to check in entire rows or columns for bulk check-ins
- **Highlight/drag and drop check-ins**: More intuitive check-in interface
- **Gracefully handle duplicate scratch entries**: No more server 500 errors when duplicate scratches are entered
- **Button to download judge codes**: Single-click download for all judge codes
- **List judges by calibration**: View judges based on assigned scores

### User Interface & Display
- **Added debater names in the pairings footer**: Improved readability of pairing displays
- **Upgrade styling on bracket modals**: Improved visual design of bracket displays
- **Added tabs to the settings form**: Better organization of tournament settings
- **Added the favicon**: Site now has proper branding in browser tabs
- **Centralize and redesign all public views**: Unified design and structure across all public-facing pages
- **Public team rankings page**: Option for public team rankings to show between rounds

### Results & Data Export
- **Single click for forum export**: Export functionality for forum posts of tournament results
- **Simplify publish results**: Streamlined results publication workflow

### Backup & Settings Management
- **Refactor backup view**: A handful of bug fixes and stylistic improvmeents
- **Organize the backups page**: Cleaned up and restructured backup management interface
- **Make lenient late update dynamically**: Setting now updates dynamically when changed

### Infrastructure & Documentation
- **Python 3.10 update**: Major upgrade improving security, speed, and maintainability - successfully smoke tested at UVA
- **Updated public documentation**: Refreshed documentation with new screenshots, styling and current information
- **Updated misc packages**: Bumped versions and removed security vulnerabilities
- **Update linting**: Improved code quality checks for newer versions

### Merging Soon
- **Switch to CDN**: 100x speed improvement for static assets - [Read our technical writeup](/blog/cdn-performance-improvement)
- **Add caching**: Performance optimization for faster page loads
- **Validation on speaks submission**: Prevents invalid speaker point entries
- **Judge-judge and team-team scratches**: Expanded scratch functionality

## Standings Site (results.apda.online):

- **Django upgrade**: Updated to latest Django version for better security and performance
- **Package bumps**: Updated dependencies to close security vulnerabilities
- **School and debater API endpoints**: New API access for upcoming registration feature
- **Improvement in admin functionality**: Enhanced admin interface for easier site management
- **Results import view bug hotfixes**: Fixed issues including removing duplicate debaters
- **Stats page**: Added comprehensive statistics page
- **Improved filters**: Better filtering options across the site
- **Display result place as words on all pages**: More readable placement indicators (e.g., "Semifinals", "Quarterfinals" instead of "4, 6")
- **"Also debated under" feature**: Track debaters who competed under different teams
- **Merge debaters feature**: Let school admins request to merge debater profiles
- **Paradigm feature**: Debaters can now add and display their debate paradigms
- **Claim debater request feature**: Allows debaters to claim their profiles
- **Bulk import old paradigms**: Migrated historical paradigm data

## What's Next?

In the coming weeks, we'll be focusing on:

1. Making a big push towards registration through MIT-Tab
2. Improving test coverage
3. Hardening public facing data adjustment featues on standings
4. Getting through the growing backlog of miscellanous quick mittab features (highlighting judges laid manually, power pairing bug, allowing 0 nov breaks, offical support for outround choice, easy spreadsheet style edit, more data import and export tools etc.)

If you have suggestions or would like to contribute to any of these projects, please reach out to the Tech Committee or check out our repositories on GitHub.

*Posted by Joey Rubas, Tech Committee Chair*
