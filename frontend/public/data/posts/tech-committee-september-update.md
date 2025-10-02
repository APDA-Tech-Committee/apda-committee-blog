# Tech Committee Monthly Update: September 2025

Hello everyone! It's been an exciting month for the Tech Committee! We focused our efforts this month on APDA Standings and MIT-Tab. Here's a brief summary of our most impactful changes:

## Standings Site:

The standings site has undergone substantial improvements:

- **APDA ID import feature online and tested**: For the first time, we successfully imported results directly from MIT-Tab in just a few clicks. The feature still has bugs and corners to work out, but is well on its way to ensuring timely tournament entry going forward. This was a huge effort and is one of the most complicated features the committee has finished so far.
- **Technical improvements**: Closed out the last round of version updates on the backend that we should need for a while, closing 150+ dependabot warnings. Upgraded Django to 4.2. Added new linters with GitHub Actions. Roughly doubled test coverage.
- **Fixed ghost point logic**: Small edge case bug where ghost points for not breaking to semi-finals were the wrong quantity, now fixed.
- **Fixed some stylistic bugs**: Dropdowns no longer cut off on small tables. School dropdowns are sorted alphabetically.

## MIT-Tab:

Changes that have already been merged:
- **Single button to assign judges to outrounds**
- **Refactored results API to coordinate with standings**
- **Optional backup without scratches**: Allows us to collect tournament files for debugging without private information
- **Fixed in-round tab cards**: Hopefully won't break again
- **Added buttons to go back to the homepage on all public views**
- **Added related object navigation on all objects** (i.e., see schools from viewing a debater, see rounds from viewing a room)
- **Added option to allow re-judges**: Tab directors can opt into allowing rejudging in their automatic judge assignments
- **Added public March Madness style outrounds bracket**
- **Allow longer settings names**: Needed to manually enable custom pairings behavior
- **Disabled autoscroll default**
- **Removed printable view, replaced with pairings CSV export**
- **Merged some minor package updates to close security bugs**

Completed, but not yet merged:
- **Fixed judge pairing**: Massive structural issue with judge pairing. Will be a separate technical writeup once this is merged.
- **Python 3.10 update**: Smoke test will happen at UVA. This will be a huge step towards closing security issues, speeding up the site, and making future security bugs easier to fix
- **Updating the public documentation**: Super out of date. Will be merged once we add new screenshots
- **Gracefully handle duplicate scratch entries**: Stop throwing server 500 errors
- **Check-in improvements**: Single click to check in rows or columns
- **Upgrade styling on bracket modals**
- **Refactor backup view to be way more readable and manageable**
- **Single click for forum export**



## What's Next?

In the coming weeks, we'll be focusing on:

1. Completing the merge of pending MIT-Tab features
2. Suite of code quality and developer lifecycle improvements on MIT-Tab
3. Building our early infrastructure to allow single click registration through MIT-Tab
4. Merging super old outstanding PRs. Including:
- Room Tags
- Single button download judge codes
- Option for public team rankings to show between rounds
- CSV+JSON tab card export

And super old developer lifecycle and code quality PRs like:
- Removing local() from all views
- Linting HTML files
- Setup documentation
- Removing old scripts
- Adding logging


If you have suggestions or would like to contribute to any of these projects, please reach out to the Tech Committee or check out our repositories on GitHub.

*Posted by Joey Rubas, Tech Committee Chair*
