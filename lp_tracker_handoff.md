# LP Tracker Project - Living Handoff Document

<!-- 
CONTEXT FOR CLAUDE: This is a living project handoff document for continuing development across chat sessions.

WHAT YOU NEED TO DO:
1. Read this entire document to understand the project state
2. Update this artifact throughout our session with new decisions/progress
3. Be ready to continue development from where we left off

PROJECT STATUS: [UPDATE THIS EACH SESSION]
- Current Phase: Ready to begin minimal read-only implementation
- Last Session Focus: Successfully shared complete project vision (handoff + data structure + UI design)
- Next Priority: Decide on Google Sheets setup vs React API integration approach

USER CONTEXT:
- Experienced but rusty developer, expects high-quality explanations of "why" behind decisions
- Values pixel-perfect interfaces and collaborative decision-making process
- Builds incrementally, uses systems while building them
- May hit length limits requiring new chat sessions - that's why this document exists

CONTINUATION PROTOCOL:
- Update the "PROJECT STATUS" section above when we make progress
- Add important decisions to the decision log
- Keep the handoff current for the next Claude iteration
-->

## User Profile & Context
- **Background**: BS Software Engineering, 10+ years front-end web dev at ASU W.P. Carey School of Business
- **Current situation**: American expat in Vietnam (8.5+ years), building crypto passive income strategies
- **Technical level**: Experienced but rusty on modern tools (last active development ~2017)
- **Work style**: Detail-oriented perfectionist, remembers the IE6 cross-browser compatibility hell
- **Expectations**: Will hold interface/design to high standards, wants pixel-perfect results
- **Project approach**: Build incrementally, use it while building it, expand over time
- **Communication style**: Values understanding the "why" behind decisions, prefers collaborative decision-making over just code delivery

## Project Vision & Goals

### Primary Goal
Personal LP (Liquidity Pool) tracking system to manage crypto earnings and portfolio value. NOT for taxes - purely for portfolio management and strategy optimization.

### Key Insight
User wants to see "complete lifecycle of each individual LP" grouped together, not chronological transaction lists. This grouping approach was a crucial early decision that shaped the entire data structure.

### Secondary Goal
Compare LP performance vs. HODL strategy to determine which pools are actually profitable vs. just holding the original tokens.

### Strategic Context
This isn't just a tracking tool - it's a critical component of the user's financial independence strategy. The quality and insights from this system directly impact their ability to optimize crypto earnings and build passive income.

## Architecture Decision Journey

### Initial Approach: Pure Spreadsheet
User initially planned Google Sheets only, but when shown the visual prototype, immediately wanted the prettier interface instead.

### Architecture Evolution
1. **Pure web app** → ruled out (data lock-in concerns)
2. **Enhanced Google Sheets** → ruled out (limited UI capabilities)  
3. **Hybrid approach** → CHOSEN (best of both worlds)

### Why Hybrid Won
- **Data reliability**: Google Sheets for bulletproof storage, backups, portability
- **User experience**: Custom web interface for visual appeal and specialized features
- **Maintainability**: Sheets handles backend complexity, web app focuses on UX
- **Future-proofing**: Data remains accessible even if custom interface breaks

## Data Structure Evolution

### Initial Design: API-First (4 sheets)
Separate sheets for Positions, Activities, Rewards, Prices - optimized for API access but poor for human data entry.

### Final Design: Human-First (5 sheets)
- **Main_Data**: Single working sheet where user actually manages data
- **API_Positions, API_Activities, API_Rewards, API_Prices**: Formula-driven views that auto-populate from Main_Data

### Why This Matters
User correctly identified that 4 separate sheets would be terrible for actual data entry. The 5-sheet hybrid gives natural workflow while maintaining clean API access.

## Technical Decisions Made

### Data Entry Workflow
- **New LP positions**: Add at end of Main_Data sheet
- **New activities**: Add at bottom with correct Position ID (NOT inserted within position groups)
- **Sorting**: Handled by API sheets using formulas, keeps data entry simple

### Timestamp Strategy
- **Rejected**: Manual =NOW() entry, automatic helper columns, Google account timezone
- **Chosen**: Web interface captures browser's local timezone automatically
- **Reasoning**: User travels frequently, doesn't want to manage timezone settings

### VPN Considerations
- Use system timezone (not IP-based detection) to avoid VPN interference
- Plan for manual timezone override if needed

### Token Entry
- Dropdown validation to prevent typos and speed entry
- Separate Token_List sheet for commonly used tokens
- Implement in both Sheets (data validation) and web interface (searchable dropdown)

## User Preferences & Requirements

### Interface Standards
- Expects modern, polished design that would make someone "stop and say whoa"
- Will be very picky about spacing, hover states, animations, responsiveness
- Wants pixel-perfect results across browsers
- Values smooth micro-interactions and thoughtful color choices

### Development Approach
- Build modularly for future expansion
- Document as we go for future reference
- Start simple, add complexity through usage
- Maintain control over data while automating calculations
- Prefers building one solid feature completely rather than multiple partial features

### Data Tracking Requirements
**Per LP Position:**
- Position ID, Pool/Pair, Chain
- Initial deposit (date, quantities, USD value, tx hash)
- All activities (date, type, tx hash, USD values, gas fees, notes)
- Reward claiming (token, amounts, USD values)

**Calculated Values:**
- Total earnings from LP
- Total gas fees paid
- Net profit/loss
- HODL value at close
- LP performance vs. HODL comparison

## Current Status & Next Steps

### Where We Left Off
- Architecture decisions finalized
- Data structure designed but not yet implemented
- **Existing prototypes**: 
  - .html file showing complete 5-sheet Google Sheets structure with sample data and formulas
  - .tsx file showing polished React interface with card-based layout, tabbed navigation, and comprehensive position tracking
- Ready to begin minimal read-only implementation

### Immediate Next Steps (Minimal Read-Only First)
**User's Optimal Execution Flow:**
1. **Google Sheets**: Set up the 5-sheet structure (Main_Data + 4 API sheets)
2. **API Layer**: Build two functions:
   - `getPositions()` - hits API_Positions sheet
   - `getActivities(positionId)` - hits API_Activities sheet
3. **React**: Super basic read-only interface:
   - Dropdown of LPs (Position ID from API_Positions)
   - Table showing activity log from API_Activities
4. **Iteration**: Once core data flow works, add forms, mutations, edits, enhancements

**Why This Approach:**
- Proves the critical integration (API connection) with minimal complexity
- Shows real data immediately for motivation and requirement discovery
- Read-only eliminates authentication complexity initially
- Perfect foundation for iterative improvement

### Technical Environment Setup Needed
- Google Cloud Console (free tier, use US region)
- Node.js LTS + npm
- VS Code
- Google Sheets API configuration

## Key Insights for Future Development
- User thinks like a developer but needs to relearn modern tools
- Highly values clean, maintainable architecture
- Wants to understand the reasoning behind technical choices
- Will use the system while building it, which will drive feature priorities
- Prefers artifact prototyping for UX refinement before local development
- Values efficiency due to free tier usage - batch questions when possible

## Future Project Context
- User has another Android app project planned after this succeeds
- This LP tracker is part of building sustainable passive income strategy
- User is on free tier - be mindful of response efficiency

## Communication Notes
- User experiences "length exceeded" issues requiring new chat sessions
- This handoff document should be updated with important decisions/insights
- User values the collaborative decision-making process highly
- The "why" behind decisions is as important as the "what"

## Handoff Process & Optimization

### What Worked This Time
- **Living handoff document**: Single comprehensive markdown file capturing context, decisions, and user preferences
- **Artifact-based handoff**: Document lives in an artifact that can be updated throughout development
- **Sequential file sharing**: Started with handoff doc, then added .html (data structure), then .tsx (UI design)
- **Complete picture achieved**: First iteration where full project scope was successfully communicated

### Recommended Handoff Process for Future Sessions
1. **Start with this artifact**: Drop the living handoff document into chat immediately
2. **State the continuation goal**: "We need to continue this artifact and keep it updated"
3. **Share key files sequentially**: Don't dump everything at once - share based on what's needed for the current task
4. **Update the artifact**: As decisions are made or progress happens, explicitly update the handoff document

### File Organization Suggestions
- **Keep handoff document current**: This artifact should be exported/saved after each session
- **Consider consolidating prototypes**: If length limits persist, could combine the .html and .tsx into a single "current state" document
- **Version control approach**: Could maintain separate files for "current working version" vs "handoff context"

### Communication Optimization
- **Be explicit about continuation**: Start with "We're continuing work on LP Tracker project, here's the current state"
- **Reference the artifact**: "Update the handoff document with this decision"
- **Batch context efficiently**: Front-load the context, then focus on execution