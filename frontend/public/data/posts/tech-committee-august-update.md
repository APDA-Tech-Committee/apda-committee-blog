# Tech Committee Monthly Update: August 2025

Hello everyone! It's been an exciting month for the Tech Committee. Going forwards, you can expect update posts like this roughly every two weeks. Here's a summary of what we got done this month, including a few smaller changes from earlier this summer:

## Committee-Wide News

- **Domain Management**: We've acquired direct ownership of the "apda.online" domain name, giving us more control over our digital infrastructure and ensuring long-term stability for our web services.

## MIT-TAB Updates

We've made significant progress on several MIT-TAB features and improvements:

- **APDA-IDs Feature**: Implementation completed and waiting on final review before merging. This will allow for consistent tracking of debaters across tournaments.
- **Testing Infrastructure**: Patched failing development tests to ensure code reliability.
- **Room Tags Feature**: Resolved outstanding issues and progressing towards merge soon. This will allow tournament directors to better organize and allocate rooms based on specific requirements.
- **Outround Tab Cards**: Feature completed and waiting on merge. This will improve the display of elimination round information.
- **Results Publishing**: Minimum viable product for results publishing and synchronization with standings completed. Waiting on APDA-IDs merge to continue development.

## APDA Website Improvements

Our main website at apda.org has received several updates:

- **New Theme**: Switched to a more modern and responsive theme.
- **Styling Refresh**: Refreshed styling to match the new theme for a more cohesive look and feel.
- **Email Infrastructure**: Partially fixed email servers to improve delivery reliability.
- **Security Enhancements**: Implemented a variety of security fixes to protect user data and prevent unauthorized access.

## Standings Site Enhancements

The standings site has undergone substantial technical improvements:

- **Server Upgrade**: Upgraded from Ubuntu 18 to Ubuntu 20 for better performance and security.
- **Python Upgrade**: Codebase upgraded from Python 3.6 to Python 3.9 for improved features and performance.
- **Continuous Deployment**: Set up automatic redeployment of new code with GitHub Actions.
- **Re-affiliation Support**: Added official support for re-affiliations, with appropriate logic for computing standings of debaters and teams with re-affs.
- **Admin Tools**:
  - Created an admin management dashboard for easier site maintenance.
  - Created primitive MIT-TAB integration for smoother data flow.
  - Added feature for triggering refresh of rankings (needed when manual corrections are made to data).
- **Data Corrections**: Fixed historical data issues in 23-24 TOTY and 22-23 SOTY standings.
- **Security Improvements**: Moved all secret keys out of the repository into private environment files.
- **Feature Additions**: Added debater IDs to school details page for better tracking.
- **Codebase Cleanup**:
  - Removed procedurally generated static files from repository.
  - Refactored how the database handles seasons to prevent requiring database settings changes for each new season.
- **Code Quality**:
  - Added CircleCI for code quality and formatting linting.
  - Applied formatting rules to HTML and Python files.
  - Began process of full test coverage (~300 tests completed, 44 in progress, increasing from 0% to ~66% code coverage).
- **Frontend Updates**: Refreshed styling for a more modern look.
- **Deployment Improvements**: Created prototype containerized deployment, looking to switch cloud platforms to enable more durable deployment and DevOps best practices.

## New Committee Blog

- **Site Creation**: Launched this new blog platform (you're reading it now!)
- **Initial Styling**: Applied preliminary styling and design elements.
- **Content Development**: Started creating initial content and documentation.

## What's Next?

In the coming weeks, we'll be focusing on:

1. Completing the merge of pending MIT-TAB features
2. Finalizing the integration between MIT-TAB and the standings site
3. Further improvements to the email infrastructure
4. Continuing the development of this committee blog
5. Expanding test coverage across our codebases

If you have suggestions or would like to contribute to any of these projects, please reach out to the Tech Committee or check out our repositories on GitHub.

*Posted by Joey Rubas, Tech Committee Chair*
