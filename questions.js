// PNG MK Platform survey — question bank (v1, 31 Oct 2026).
// Types: single, multi (max optional), scale (1–5 labels), nps (0–10), text, email.
// show: {q, in:[values]} hides a question unless an earlier answer matches.
// end: {in:[values], msg} stops the survey early on that answer.

const IMP = ["Not needed", "Nice to have", "Important", "Very important", "Essential"];
const AGR = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];
const USE = ["Would not use", "Probably not", "Maybe", "Probably", "Definitely"];

const ISMK = { q: "link", in: ["mk", "expat_kid", "png_national", "staff"] };

window.SURVEY = {
  version: "v1-2026-10-31",
  sections: [
    {
      id: "about", title: "About you",
      intro: "A few basics so we can see who the platform would serve. Every question after the first two is optional.",
      qs: [
        { id: "age18", t: "Are you 18 or older?", type: "single", req: true, o: [["yes", "Yes"], ["no", "No"]],
          end: { in: ["no"], msg: "Thank you. This first survey is for adults only. Please ask a parent to fill it in for your family." } },
        { id: "link", t: "Which best describes your link to PNG?", type: "single", req: true, o: [
          ["mk", "I grew up in PNG as a missionary kid (MK)"],
          ["expat_kid", "I grew up in PNG as the child of other expat workers (aid, business, government)"],
          ["png_national", "I'm a Papua New Guinean who grew up alongside MKs (school, station, wantok)"],
          ["staff", "I was a teacher, dorm parent or mission staff member who cared for MKs"],
          ["spouse", "I'm married to, or the partner of, a PNG MK"],
          ["other", "Other"]],
          end: { in: ["other"], msg: "Thank you for your interest. This survey is for people with a direct link to PNG MKs, but we'd still love to hear from you once the platform launches." } },
        { id: "agegroup", t: "Your age group", type: "single", o: ["18–24", "25–34", "35–44", "45–54", "55–64", "65–74", "75+"] },
        { id: "livenow", t: "Where do you live now?", type: "single", o: ["Australia", "Papua New Guinea", "New Zealand", "USA", "Canada", "UK / Ireland", "Germany / Switzerland / Austria", "Netherlands / Scandinavia", "Other Europe", "Asia", "Other Pacific", "Africa", "Other"] },
        { id: "fromwhere", t: "When someone asks \"Where are you from?\", what do you usually say?", type: "single", o: ["My passport country", "PNG", "Where I live now", "It depends who's asking", "It's complicated / I'm not sure"] },
        { id: "tokpisin", t: "How well do you speak Tok Pisin today?", type: "single", o: ["Fluent", "I get by", "A few words", "Forgotten most of it", "Never learned"] },
        { id: "timezone", t: "How often do time zones make it hard to stay in touch with other MKs?", type: "single", o: ["Never", "Rarely", "Sometimes", "Often", "Very often"] },
        { id: "household", t: "Who else in your household might want to join?", type: "multi", o: ["Spouse / partner", "Adult children", "Siblings who are also MKs", "My parents (former missionaries)", "No one else"] },
        { id: "lifestage", t: "Your current life stage", type: "single", o: ["Studying", "Working full time", "Working part time", "Raising young children", "Retired", "Serving in missions or ministry", "Other"] },
        { id: "lastvisit", t: "When did you last visit PNG?", type: "single", o: ["I live there", "In the last 2 years", "3–5 years ago", "6–10 years ago", "More than 10 years ago", "Never since leaving"] },
      ]
    },
    {
      id: "png", title: "Your PNG years", show: ISMK,
      intro: "This helps us set up the right groups (schools, missions, stations, decades) from day one.",
      qs: [
        { id: "decades", t: "Which decade(s) did you live in PNG as a child (or work there, if staff)?", type: "multi", o: ["1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"] },
        { id: "years", t: "How many years in total?", type: "single", o: ["Under 2", "2–5", "6–10", "11–15", "16+"] },
        { id: "org", t: "Which organisation(s) was your family with?", type: "multi", o: ["SIL / Wycliffe", "New Tribes Mission / Ethnos360", "Lutheran", "Anglican", "Catholic", "Baptist", "Nazarene", "Seventh-day Adventist", "Assemblies of God", "MAF (Mission Aviation Fellowship)", "Christian Brethren / Gospel Halls", "United Church / Methodist", "Evangelical Church of PNG / APCM", "Salvation Army", "Other mission", "Not a mission"] },
        { id: "region", t: "Which region(s) did you live in?", type: "multi", o: ["Highlands (Eastern, Western, Southern, Enga, Simbu, Hela, Jiwaka)", "Momase (Morobe, Madang, East & West Sepik)", "Southern (NCD, Central, Gulf, Western, Milne Bay, Oro)", "Islands (East & West New Britain, New Ireland, Manus, Bougainville)"] },
        { id: "setting", t: "Where did you mostly live?", type: "single", o: ["A large mission centre (e.g. Ukarumpa)", "A remote station or village", "A town", "A mix"] },
        { id: "school", t: "What schooling did you have in PNG?", type: "multi", o: ["Ukarumpa International School (SIL)", "A New Tribes Mission school", "A Lutheran mission school", "An International Education Agency (IEA) school", "A local PNG community or national school", "Home school / correspondence", "Boarding school outside PNG", "Other"] },
        { id: "school_names", t: "Name the schools, stations or towns you'd want as groups.", type: "text", hint: "e.g. Ukarumpa class of '88, Kudjip, Wewak, Aiyura" },
        { id: "boarding", t: "Did you board away from your parents?", type: "single", o: ["No", "Yes, from under 10", "Yes, from 10–13", "Yes, from 14+"] },
        { id: "boarding_exp", t: "Overall, how was boarding for you?", type: "single", show: { q: "boarding", in: ["Yes, from under 10", "Yes, from 10–13", "Yes, from 14+"] }, o: ["Very positive", "Mostly positive", "Mixed", "Mostly negative", "Very negative", "Prefer not to say"] },
        { id: "leftage", t: "How old were you when you left PNG for good?", type: "single", o: ["Under 10", "10–13", "14–17", "18+", "I haven't left"] },
        { id: "goodbye", t: "When you left, did you get to say a proper goodbye to people and places?", type: "single", o: ["Yes, fully", "Partly", "No", "Can't remember"] },
        { id: "pngfriends", t: "Do you keep in touch with Papua New Guinean friends from childhood?", type: "single", o: ["Yes, regularly", "Now and then", "Lost touch but would like to", "No"] },
        { id: "loss", t: "\"Leaving PNG still feels like a loss I carry.\"", type: "scale", o: AGR },
      ]
    },
    {
      id: "now", title: "Staying connected today",
      qs: [
        { id: "tools", t: "What do you use to keep in touch with PNG MKs now?", type: "multi", o: ["WhatsApp groups", "Facebook groups", "Messenger", "Email lists / newsletters", "Instagram", "Signal", "Telegram", "Zoom / video calls", "School alumni websites", "In-person reunions", "I don't really keep in touch"] },
        { id: "mkcount", t: "About how many PNG MKs are you in regular contact with?", type: "single", o: ["0", "1–5", "6–20", "21–50", "50+"] },
        { id: "satisfied", t: "How satisfied are you with how PNG MKs stay connected today?", type: "scale", o: ["Very dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very satisfied"] },
        { id: "frustrations", t: "What frustrates you about the groups we use now?", type: "multi", o: ["Too many scattered groups", "Important posts get lost", "Hard to find old friends", "My phone number is visible to everyone", "Photos get compressed or lost", "Facebook ads and algorithms", "Some friends aren't on those apps", "Too much off-topic noise", "No archive of our history", "Arguments / politics", "Nothing really"] },
        { id: "lostcontact", t: "Are there people from your PNG years you'd love to find but can't?", type: "single", o: ["Yes, many", "A few", "No"] },
        { id: "belong", t: "\"I feel I belong with other PNG MKs more than with most other groups.\"", type: "scale", o: AGR },
        { id: "understood", t: "\"People outside the MK world don't really understand my childhood.\"", type: "scale", o: AGR },
        { id: "switch", t: "If a private PNG MK platform existed, would you move from WhatsApp / Facebook groups?", type: "single", o: ["Yes, fully", "I'd use both", "Only if my friends move", "Unlikely"] },
        { id: "onething", t: "If the platform did only one thing really well, what should it be?", type: "text" },
      ]
    },
    {
      id: "comms", title: "Chat and communication",
      intro: "How important is each of these to you?",
      qs: [
        { id: "c_group", t: "Group chats (like WhatsApp)", type: "scale", o: IMP },
        { id: "c_dm", t: "Private one-to-one messages", type: "scale", o: IMP },
        { id: "c_topics", t: "Discussion topics that keep conversations organised, instead of one long chat", type: "scale", o: IMP },
        { id: "c_style", t: "Which style suits you better?", type: "single", o: ["Fast chat", "Organised topics / forum", "A mix of both", "Not sure"] },
        { id: "c_voice", t: "Voice notes", type: "scale", o: IMP },
        { id: "c_calls", t: "One-to-one voice and video calls inside the app", type: "scale", o: IMP },
        { id: "c_groupcalls", t: "Would you use group video calls inside the platform (e.g. a virtual class reunion)?", type: "scale", o: USE },
        { id: "c_translate", t: "Automatic translation between English, Tok Pisin, German, Dutch and others", type: "scale", o: IMP },
        { id: "c_tpui", t: "Would you like the app itself available in Tok Pisin?", type: "single", o: ["Yes", "Don't mind", "No"] },
        { id: "c_e2e", t: "End-to-end encryption for everyday group chats (not just support chats)", type: "scale", o: IMP },
        { id: "c_lowdata", t: "A low-data mode (text first, photos load on tap) for slow or costly connections", type: "scale", o: IMP },
        { id: "c_offline", t: "Read messages offline and send when you're back in signal", type: "scale", o: IMP },
        { id: "c_mod", t: "How should group chats be moderated?", type: "single", o: ["Light touch", "Clear rules, moderators step in when needed", "Strict", "Not sure"] },
      ]
    },
    {
      id: "notices", title: "Announcements and notifications",
      qs: [
        { id: "n_channel", t: "An official announcements channel everyone receives", type: "scale", o: IMP },
        { id: "n_topics", t: "Which announcements would you want?", type: "multi", o: ["Deaths and funerals", "Serious illness / prayer needs", "Reunions and events", "Platform news", "Births and weddings", "PNG news affecting MKs (unrest, disasters, elections)", "Job and ministry openings", "Books, films and podcasts by MKs"] },
        { id: "n_how", t: "How do you want to be notified?", type: "multi", o: ["Phone notifications", "Email", "SMS", "Only when I open the app"] },
        { id: "n_amount", t: "How much notification do you want?", type: "single", o: ["Every message", "Important things only", "A daily summary", "A weekly email summary", "None"] },
        { id: "n_quiet", t: "Quiet hours that follow your own time zone", type: "scale", o: IMP },
        { id: "n_sad", t: "How should news of a death be shared?", type: "single", o: ["A separate, gentle notification", "The same as other announcements", "Only in the memorial space, no alert", "By email only"] },
        { id: "n_who", t: "Who should be able to post announcements?", type: "single", o: ["Admins only", "Admins and group leaders", "Any member, with admin approval", "Any member"] },
      ]
    },
    {
      id: "groups", title: "Groups and who can join",
      intro: "Research on adult TCKs finds belonging often runs through shared places and schools. Help us decide the groups and who's in.",
      qs: [
        { id: "g_want", t: "Which groups would you join?", type: "multi", o: ["My school", "My graduating class / year", "My mission or organisation", "My station, town or province", "My decade in PNG", "My current country or city", "Interest groups (aviation, medicine, linguistics, music…)", "Parents of young children", "Retirees", "MKs now serving in missions", "MKs living in PNG today", "Spouses of MKs", "Children of MKs (second generation)", "Grief and loss support", "Faith and prayer"] },
        { id: "g_most", t: "Which ONE kind of group would you use most?", type: "single", o: ["School", "Graduating class", "Mission / organisation", "Station / town / province", "Decade", "Current country / city", "Interest group", "Faith / prayer", "Support group"] },
        { id: "g_spouse", t: "Should spouses / partners who aren't MKs be able to join?", type: "single", o: ["Yes, full access", "Yes, their own space plus some areas", "No", "Not sure"] },
        { id: "g_kids", t: "Should adult children of MKs be able to join?", type: "single", o: ["Yes, full access", "Yes, limited areas", "No", "Not sure"] },
        { id: "g_nationals", t: "Should Papua New Guineans who grew up with MKs (schoolmates, station families) be able to join?", type: "single", o: ["Yes, full access", "Yes, some groups", "No", "Not sure"] },
        { id: "g_staff", t: "Should former teachers, dorm parents and mission staff be able to join?", type: "single", o: ["Yes, full access", "Yes, limited areas", "No", "Not sure"] },
        { id: "g_parents", t: "Should former missionary parents be able to join?", type: "single", o: ["Yes, full access", "Yes, limited areas", "No", "Not sure"] },
        { id: "g_create", t: "Who should be able to create new groups?", type: "single", o: ["Any member", "Members, with admin approval", "Admins only"] },
        { id: "g_private", t: "Should some groups be private / invite-only (e.g. one graduating class)?", type: "single", o: ["Yes", "No", "Not sure"] },
      ]
    },
    {
      id: "photos", title: "Photos and the archive",
      qs: [
        { id: "p_have", t: "Do you or your family have photos, slides or film from your PNG years?", type: "single", o: ["Yes, lots (100+)", "Some (20–100)", "A few", "None", "My family has them, not me"] },
        { id: "p_formats", t: "What formats?", type: "multi", show: { q: "p_have", in: ["Yes, lots (100+)", "Some (20–100)", "A few", "My family has them, not me"] }, o: ["Printed photos", "Slides", "Negatives", "Home movies (8mm, VHS)", "Digital photos (2000s on)", "Letters, newsletters, prayer letters"] },
        { id: "p_digitised", t: "How much is already scanned / digital?", type: "single", show: { q: "p_have", in: ["Yes, lots (100+)", "Some (20–100)", "A few", "My family has them, not me"] }, o: ["All", "Most", "Some", "None", "Not sure"] },
        { id: "p_scan", t: "Would you use a scanning service, or volunteer scanning days at reunions?", type: "scale", o: USE },
        { id: "p_share", t: "Would you share your photos with other MKs in a shared library?", type: "single", o: ["Yes, all of them", "Selected ones", "Only with family", "No"] },
        { id: "p_albums", t: "Shared albums any member can add to (by school, station, event)", type: "scale", o: IMP },
        { id: "p_fullres", t: "Full-resolution uploads and downloads, no compression", type: "scale", o: IMP },
        { id: "p_faces", t: "Face search to find every photo of you or a friend", type: "single", o: ["Love it", "OK if I can opt out", "Uneasy about it", "Against it"] },
        { id: "p_facedefault", t: "Face recognition should be…", type: "single", o: ["On unless I opt out", "Off unless I opt in"] },
        { id: "p_tagging", t: "Naming people and places on old photos together", type: "scale", o: IMP },
        { id: "p_map", t: "Browsing photos on a map of PNG", type: "scale", o: IMP },
        { id: "p_remove", t: "Who should be able to remove a photo?", type: "multi", o: ["The person who uploaded it", "Admins", "Anyone pictured in it (on request)"] },
        { id: "p_download", t: "Should members be able to download each other's photos?", type: "single", o: ["Yes, freely", "Only if the uploader allows", "View only", "Not sure"] },
        { id: "p_volume", t: "Roughly how many photos might you upload in the first year?", type: "single", o: ["0", "1–50", "51–500", "501–2,000", "More than 2,000"] },
        { id: "p_consent", t: "Photos of Papua New Guineans (villages, ceremonies, people) need care. What should we do?", type: "single", o: ["Clear guidance on respectful sharing", "Guidance, and keep some photos restricted", "Nothing special needed", "Not sure"] },
      ]
    },
    {
      id: "location", title: "Directory and location",
      qs: [
        { id: "d_directory", t: "A member directory to find people", type: "scale", o: IMP },
        { id: "d_fields", t: "What would you show on your profile?", type: "multi", o: ["Name and maiden / previous names", "Schools and years", "Mission and station", "Country I live in now", "City I live in now", "Email", "Phone", "Occupation", "Spouse and children", "Profile photo", "Social media links"] },
        { id: "d_maiden", t: "Searching by maiden or previous names", type: "scale", o: IMP },
        { id: "d_worldmap", t: "A world map showing roughly where members live now", type: "scale", o: USE },
        { id: "d_precision", t: "How precise should your pin on the map be?", type: "single", o: ["Country only", "State / region", "City", "Suburb", "Don't show me on the map"] },
        { id: "d_live", t: "Would you ever share your live location?", type: "single", o: ["Never", "At events only, for a few hours", "When travelling, to meet up", "Yes, generally"] },
        { id: "d_nearby", t: "\"Tell me when an MK is visiting my city\" alerts", type: "scale", o: USE },
        { id: "d_travel", t: "A travel board (\"I'm passing through Brisbane in May — coffee?\")", type: "scale", o: USE },
        { id: "d_pngmap", t: "A historic map of PNG showing where families lived and served", type: "scale", o: USE },
        { id: "d_whosees", t: "Who should see your location?", type: "single", o: ["All members", "Only people I connect with", "Only groups I choose", "No one"] },
        { id: "d_worry", t: "How worried are you about location data being misused?", type: "scale", o: ["Not at all", "A little", "Somewhat", "Quite", "Very"] },
        { id: "d_hospitality", t: "Would you offer hospitality (a bed, a meal, an airport pickup) to visiting MKs?", type: "single", o: ["Yes, often", "Sometimes", "Probably not"] },
      ]
    },
    {
      id: "events", title: "Events and reunions",
      qs: [
        { id: "e_attended", t: "How many MK reunions have you attended in the last 10 years?", type: "single", o: ["0", "1", "2–3", "4+"] },
        { id: "e_want", t: "Which events interest you?", type: "multi", o: ["Big reunions", "Small local meet-ups", "Online gatherings", "Trips back to PNG", "Memorial services", "Prayer meetings", "Class reunions"] },
        { id: "e_rsvp", t: "An events calendar with RSVPs and reminders", type: "scale", o: IMP },
        { id: "e_pngtrip", t: "Would you join an organised return trip to PNG?", type: "single", o: ["Yes", "Maybe", "No"] },
        { id: "e_where", t: "Where would you most likely attend a reunion?", type: "single", o: ["Australia", "New Zealand", "North America", "Europe", "PNG", "Online only"] },
        { id: "e_barriers", t: "What stops you going to reunions?", type: "multi", o: ["Cost", "Distance", "Time off work", "Health", "Not knowing who's going", "Mixed feelings about the past", "Nothing"] },
      ]
    },
    {
      id: "care", title: "Memorials, prayer and care",
      intro: "PNG MKs today hold a wide range of beliefs. Answer honestly; the platform should work for everyone.",
      qs: [
        { id: "m_memorial", t: "A lasting memorial page for each person who dies", type: "scale", o: IMP },
        { id: "m_prayer", t: "A space for prayer requests", type: "scale", o: IMP },
        { id: "m_faith", t: "How would you describe your faith today?", type: "single", o: ["Active Christian faith", "Christian, but not in a church", "Questioning / unsure", "Not religious now", "Another faith", "Prefer not to say"] },
        { id: "m_faithrole", t: "How should faith feature on the platform?", type: "single", o: ["Central to everything", "Present, but optional", "In its own spaces only", "Mostly kept out"] },
        { id: "m_help", t: "Would you help an MK in crisis practically (meals, visits, fundraising)?", type: "scale", o: USE },
        { id: "m_fundraise", t: "Should members be able to run fundraisers (medical bills, funerals, PNG projects)?", type: "single", o: ["Yes", "Only admin-approved ones", "No"] },
      ]
    },
    {
      id: "support", title: "Support and counselling",
      intro: "TCK research links unresolved grief, identity and re-entry struggles to MK upbringings. These questions shape a private Support tab. Skip anything you'd rather not answer.",
      qs: [
        { id: "s_interest", t: "Would you ever use a private support space with counsellors who understand MKs?", type: "single", o: ["Yes, probably", "Maybe", "Not for me, but good for others", "Not needed"] },
        { id: "s_topics", t: "What might you want support with?", type: "multi", show: { q: "s_interest", in: ["Yes, probably", "Maybe"] }, o: ["Grief and loss of PNG / home", "Re-entry and identity", "Boarding school experiences", "Faith questions or spiritual hurt", "Relationships / marriage", "Parenting as an MK", "Anxiety or depression", "Trauma from unrest or violence in PNG", "Past abuse", "Family of origin / missionary parents", "Work stress or burnout", "Ageing and end of life"] },
        { id: "s_who", t: "Who would you most like to talk to?", type: "single", show: { q: "s_interest", in: ["Yes, probably", "Maybe"] }, o: ["A professional counsellor who is an MK / TCK", "A professional who understands TCKs", "A Christian counsellor", "A non-religious counsellor", "A trained fellow MK (peer listener)", "Don't mind"] },
        { id: "s_peer", t: "Would you talk to a trained MK peer listener (not a counsellor)?", type: "scale", show: { q: "s_interest", in: ["Yes, probably", "Maybe"] }, o: USE },
        { id: "s_format", t: "How would you like to talk?", type: "multi", show: { q: "s_interest", in: ["Yes, probably", "Maybe"] }, o: ["Text chat", "Voice call", "Video call", "In person", "Small support groups"] },
        { id: "s_pay", t: "What could you pay per counselling session (AUD)?", type: "single", show: { q: "s_interest", in: ["Yes, probably", "Maybe"] }, o: ["Free only", "Up to $30", "$30–60", "$60–100", "$100–150", "Over $150", "Only if insurance / Medicare covers it"] },
        { id: "s_private", t: "Admins never being able to see who uses Support", type: "scale", show: { q: "s_interest", in: ["Yes, probably", "Maybe"] }, o: IMP },
        { id: "s_nickname", t: "Support chats currently plan to show real names. Would you want a nickname option?", type: "single", show: { q: "s_interest", in: ["Yes, probably", "Maybe"] }, o: ["Yes, strongly", "I'd prefer it", "Don't mind", "Real names are better"] },
        { id: "s_crisis", t: "Crisis lines and urgent help for your country, one tap away", type: "scale", o: IMP },
        { id: "s_listener", t: "Would you volunteer as a peer listener after training?", type: "single", o: ["Yes", "Maybe", "No"] },
        { id: "s_qualified", t: "Are you a qualified counsellor, psychologist or chaplain who might offer sessions?", type: "single", o: ["Yes", "Studying / in training", "No"] },
        { id: "s_safeguard", t: "Should the platform offer a safe, confidential way to report past abuse at mission schools or stations to the right bodies?", type: "single", o: ["Yes, it's essential", "Yes, but kept separate from the platform", "No", "Not sure"] },
        { id: "s_safe", t: "What would make you feel safe using a support space?", type: "text" },
      ]
    },
    {
      id: "admin", title: "Membership and running it",
      qs: [
        { id: "a_join", t: "How should people join?", type: "single", o: ["Invited by a member", "Request, then an admin checks", "Either of those", "Open to anyone"] },
        { id: "a_verify", t: "How should admins check someone really is a PNG MK?", type: "multi", o: ["Two members vouch for them", "School or mission records", "Questions about their PNG years", "An admin knows them", "Other"] },
        { id: "a_runby", t: "Who should run the platform?", type: "single", o: ["An elected member committee", "A volunteer admin team", "A mission organisation", "A paid manager", "Not sure"] },
        { id: "a_assoc", t: "Should it be owned by a not-for-profit association members can join and vote in?", type: "single", o: ["Yes", "No", "Don't mind"] },
        { id: "a_volunteer", t: "Would you volunteer as an admin or moderator?", type: "single", o: ["Yes", "Maybe", "No"] },
        { id: "a_skills", t: "What could you help with?", type: "multi", show: { q: "a_volunteer", in: ["Yes", "Maybe"] }, o: ["Moderating", "Tech / IT", "Photo scanning and archive", "Organising events", "Counselling / member care", "Finance or legal", "Writing and communications", "Translation (Tok Pisin or other)"] },
        { id: "a_rules", t: "How should rule-breaking be handled?", type: "single", o: ["Warning, then suspension", "Admins decide case by case", "Member committee decides", "Not sure"] },
        { id: "a_accounts", t: "Yearly accounts and decisions published to members", type: "scale", o: IMP },
      ]
    },
    {
      id: "privacy", title: "Privacy and trust",
      qs: [
        { id: "pv_worries", t: "What worries you most about an online MK community?", type: "multi", o: ["My phone number being visible", "Data sold or used for ads", "Hacking", "Photos misused", "My location", "Old wounds being reopened", "Being identified if I use Support", "Nothing"] },
        { id: "pv_trust", t: "\"I'd trust a community-run platform more than Facebook or WhatsApp.\"", type: "scale", o: AGR },
        { id: "pv_tradeoff", t: "Full encryption everywhere means no search and harder recovery. Which do you prefer?", type: "single", o: ["Encryption everywhere", "Private and searchable (encrypted only in Support and DMs)", "Private and searchable everywhere", "Not sure"] },
        { id: "pv_ai", t: "AI features (photo captions, translation, search) running on the platform's own servers?", type: "single", o: ["Yes", "Only if I opt in", "No", "Not sure"] },
        { id: "pv_storage", t: "Where should our data be stored?", type: "single", o: ["In Australia", "On a community-owned server", "Anywhere secure", "Don't mind"] },
      ]
    },
    {
      id: "app", title: "App and devices",
      qs: [
        { id: "ap_devices", t: "Which devices do you use?", type: "multi", o: ["iPhone", "Android phone", "iPad / tablet", "Computer", "Basic phone (no apps)"] },
        { id: "ap_pref", t: "How would you rather use the platform?", type: "single", o: ["A standalone app from the App Store / Google Play", "A web app saved to my home screen", "Either is fine", "Mostly on a computer"] },
        { id: "ap_barrier", t: "Would having to download a separate app stop you joining?", type: "single", o: ["Yes", "Maybe", "No"] },
        { id: "ap_net", t: "Your usual internet connection", type: "single", o: ["Fast home broadband", "Good mobile data", "Slow or expensive mobile data", "Patchy / often offline"] },
        { id: "ap_confidence", t: "How confident are you picking up a new app?", type: "scale", o: ["Not at all", "A little", "Fairly", "Very", "Completely"] },
        { id: "ap_login", t: "How would you like to sign in?", type: "single", o: ["Email and password", "Email link (no password)", "Google or Apple account", "Phone number + SMS code"] },
        { id: "ap_access", t: "Anything that would make it easier to use?", type: "multi", o: ["Larger text", "Screen reader support", "A simple mode with fewer buttons", "Help from a family member", "Nothing needed"] },
      ]
    },
    {
      id: "cost", title: "Costs and subscription",
      intro: "Running a private, ad-free platform costs about A$3,400 a year plus counselling. These answers set the price.",
      qs: [
        { id: "$_willing", t: "Would you pay a subscription for a private, ad-free PNG MK platform?", type: "single", o: ["Yes", "Maybe", "No"] },
        { id: "$_price", t: "The most you'd pay per month (AUD)", type: "single", o: ["$0", "$2", "$5", "$7", "$10", "$15", "$20+"] },
        { id: "$_billing", t: "How would you prefer to pay?", type: "single", o: ["Monthly", "Yearly (two months free)", "A one-off lifetime fee", "Donations only"] },
        { id: "$_model", t: "Which pricing model seems fairest?", type: "single", o: ["One price for everyone", "Free basics, paid extras (e.g. photo storage)", "Pay what you can", "Members sponsor others"] },
        { id: "$_png", t: "Should members living in PNG pay less, in kina?", type: "single", o: ["Yes", "No", "Not sure"] },
        { id: "$_sponsor", t: "Would you sponsor a member who can't afford it?", type: "single", o: ["Yes", "Maybe", "No"] },
        { id: "$_methods", t: "Which payment methods could you use?", type: "multi", o: ["Credit / debit card", "PayPal", "Apple Pay / Google Pay", "Bank transfer", "PNG mobile money (CellMoni, MiCash)", "PNG bank transfer in kina"] },
        { id: "$_family", t: "A family membership at one price per household", type: "scale", o: IMP },
        { id: "$_surplus", t: "If there's money left over, where should it go?", type: "multi", max: 2, o: ["Lower fees", "A counselling fund", "PNG community projects / scholarships", "Scanning the photo archive", "Subsidising reunions"] },
        { id: "$_lapse", t: "If someone stops paying, what should happen?", type: "single", o: ["Lose access", "Read-only access", "A 3-month grace period", "Hardship waiver on request"] },
      ]
    },
    {
      id: "wrap", title: "Priorities and wrap-up",
      qs: [
        { id: "w_top3", t: "Pick your TOP 3 features", type: "multi", max: 3, o: ["Chat", "Announcements", "Member directory", "World map", "Photo archive", "Face search", "Events and reunions", "Memorials and prayer", "Support / counselling", "Groups", "Travel board", "Fundraisers"] },
        { id: "w_pilot", t: "Would you join a free 3-month pilot?", type: "single", o: ["Yes", "Maybe", "No"] },
        { id: "w_recommend", t: "How likely are you to recommend the platform to other PNG MKs?", type: "nps" },
        { id: "w_names", t: "Any name ideas for the platform?", type: "text", hint: "e.g. something in Tok Pisin" },
        { id: "w_heard", t: "How did you hear about this survey?", type: "single", o: ["WhatsApp", "Facebook", "Email", "A friend", "A reunion", "Other"] },
        { id: "w_else", t: "Anything else we should know?", type: "text" },
        { id: "w_email", t: "Email (optional) — only if you'd like pilot or launch news. Only the survey team sees it; it is never shown to members.", type: "email" },
      ]
    },
  ]
};
