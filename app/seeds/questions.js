const questions = [
  {
    expansion: 'Base',
    id: 1,
    numAnswers: 1,
    official: true,
    text: "_?  There's an app for that.",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 2,
    numAnswers: 1,
    official: true,
    text: "Why can't I sleep at night?",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 3,
    numAnswers: 1,
    official: true,
    text: "What's that smell?",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 4,
    numAnswers: 1,
    official: true,
    text: "I got 99 problems but _ ain't one.",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 5,
    numAnswers: 1,
    official: true,
    text: "Maybe she's born with it.  Maybe it's _.",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 6,
    numAnswers: 1,
    official: true,
    text: "What's the next Happy Meal® toy?",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 7,
    numAnswers: 1,
    official: true,
    text: 'Anthropologists have recently discovered a primitive tribe that worships _.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 8,
    numAnswers: 1,
    official: true,
    text: "It's a pity that kids these days are all getting involved with _.",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 9,
    numAnswers: 1,
    official: true,
    text: "During Picasso's often-overlooked Brown Period, he produced hundreds of paintings of _.",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 10,
    numAnswers: 1,
    official: true,
    text: 'Alternative medicine is now embracing the curative powers of _.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 11,
    numAnswers: 2,
    official: true,
    text: 'And the Academy Award for _ goes to _.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 12,
    numAnswers: 1,
    official: true,
    text: "What's that sound?",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 13,
    numAnswers: 1,
    official: true,
    text: 'What ended my last relationship?',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 14,
    numAnswers: 1,
    official: true,
    text: "MTV's new reality show features eight washed-up celebrities living with _.",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 15,
    numAnswers: 1,
    official: true,
    text: 'I drink to forget _.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 16,
    numAnswers: 1,
    official: true,
    text: "I'm sorry professor, but I couldn't complete my homework because of _.",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 17,
    numAnswers: 1,
    official: true,
    text: "What is Batman's guilty pleasure?",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 18,
    numAnswers: 1,
    official: true,
    text: 'This is the way the world ends \u003cbr\u003e This is the way the world ends \u003cbr\u003e Not with a bang but with _.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 19,
    numAnswers: 1,
    official: true,
    text: "What's a girl's best friend?",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 20,
    numAnswers: 1,
    official: true,
    text: 'TSA guidelines now prohibit _ on airplanes.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 21,
    numAnswers: 1,
    official: true,
    text: "_.  That's how I want to die.",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 22,
    numAnswers: 2,
    official: true,
    text: 'For my next trick, I will pull _ out of _.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 23,
    numAnswers: 1,
    official: true,
    text: 'In the new Disney Channel Original Movie, Hannah Montana struggles with _ for the first time.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 24,
    numAnswers: 2,
    official: true,
    text: '_ is a slippery slope that leads to _.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 25,
    numAnswers: 1,
    official: true,
    text: 'What does Dick Cheney prefer?',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 26,
    numAnswers: 1,
    official: true,
    text: "Dear Abby, I'm having some trouble with _ and would like your advice.",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 27,
    numAnswers: 1,
    official: true,
    text: 'Instead of coal, Santa now gives the bad children _.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 28,
    numAnswers: 1,
    official: true,
    text: "What's the most emo?",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 29,
    numAnswers: 1,
    official: true,
    text: 'In 1,000 years when paper money is but a distant memory, _ will be our currency.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 30,
    numAnswers: 2,
    official: true,
    text: "What's the next superhero/sidekick duo?",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 31,
    numAnswers: 2,
    official: true,
    text: "In M. Night Shyamalan's new movie, Bruce Willis discovers that _ had really been _ all along.",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 32,
    numAnswers: 1,
    official: true,
    text: 'A romantic, candlelit dinner would be incomplete without _.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 33,
    numAnswers: 1,
    official: true,
    text: "_.  Becha can't have just one!",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 34,
    numAnswers: 1,
    official: true,
    text: 'White people like _.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 35,
    numAnswers: 1,
    official: true,
    text: '_.  High five, bro.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 36,
    numAnswers: 1,
    official: true,
    text: 'Next from J.K. Rowling: Harry Potter and the Chamber of _.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 37,
    numAnswers: 1,
    official: true,
    text: 'BILLY MAYS HERE FOR _.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 38,
    numAnswers: 2,
    official: true,
    text: 'In a world ravaged by _, our only solace is _.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 39,
    numAnswers: 1,
    official: true,
    text: 'War!  What is it good for?',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 40,
    numAnswers: 1,
    official: true,
    text: 'During sex, I like to think about _.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 41,
    numAnswers: 1,
    official: true,
    text: 'What are my parents hiding from me?',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 42,
    numAnswers: 1,
    official: true,
    text: 'What will always get you laid?',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 43,
    numAnswers: 1,
    official: true,
    text: 'In L.A. County Jail, word is you can trade 200 cigarettes for _.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 44,
    numAnswers: 1,
    official: true,
    text: 'What did I bring back from Mexico?',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 45,
    numAnswers: 1,
    official: true,
    text: "What don't you want to find in your Chinese food?",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 46,
    numAnswers: 1,
    official: true,
    text: 'What will I bring back in time to convince people that I am a powerful wizard?',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 47,
    numAnswers: 1,
    official: true,
    text: 'How am I maintaining my relationship status?',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 48,
    numAnswers: 1,
    official: true,
    text: "_.  It's a trap!",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 49,
    numAnswers: 1,
    official: true,
    text: 'Coming to Broadway this season, _: The Musical.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 50,
    numAnswers: 1,
    official: true,
    text: 'While the United States raced the Soviet Union to the moon, the Mexican government funneled millions of pesos into research on _.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 51,
    numAnswers: 1,
    official: true,
    text: 'After the earthquake, Bukola Saraki brought _ to the people of Haiti.',
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 52,
    numAnswers: 1,
    official: true,
    text: 'Next on SuperSport, the World Series of _.',
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 53,
    numAnswers: 2,
    official: true,
    text: 'Step 1: _.  Step 2: _.  Step 3: Profit.',
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 54,
    numAnswers: 2,
    official: true,
    text: 'Rumor has it that Olusegun Obasanjo favorite dish is _ stuffed with _.',
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 55,
    numAnswers: 1,
    official: true,
    text: 'But before I kill you, Mr. Ibu, I must show you _.',
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 56,
    numAnswers: 1,
    official: true,
    text: 'What gives Africans uncontrollable gas?',
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 57,
    numAnswers: 1,
    official: true,
    text: 'What do Village people smell like?',
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 58,
    numAnswers: 1,
    official: true,
    text: 'The class excursion was completely ruined by _.',
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 59,
    numAnswers: 1,
    official: true,
    text: 'When Pharaoh remained unmoved, Moses called down a Plague of _.',
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 60,
    numAnswers: 1,
    official: true,
    text: "What's my secret power?",
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 61,
    numAnswers: 1,
    official: true,
    text: "What's there a ton of in Lagos?",
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 62,
    numAnswers: 1,
    official: true,
    text: 'What would Ghanaians find disturbing, yet oddly charming?',
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 63,
    numAnswers: 2,
    official: true,
    text: 'I never truly understood _ until I encountered _.',
    regionId: '59b91ad4605e234f4555a4df'
  },
  {
    expansion: 'Base',
    id: 64,
    numAnswers: 1,
    official: true,
    text: 'What did South Africa airdrop to the children of Somalia?',
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 65,
    numAnswers: 1,
    official: true,
    text: 'What helps Buhari unwind?',
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 66,
    numAnswers: 1,
    official: true,
    text: 'What did Ramsey Noah eat for dinner?',
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 67,
    numAnswers: 1,
    official: true,
    text: '_: good to the last drop.',
    regionId: '59b91ad4605e234f4555a4df'
  },
  {
    expansion: 'Base',
    id: 68,
    numAnswers: 1,
    official: true,
    text: 'Why am I sticky?',
    regionId: '59b91ad4605e234f4555a4df'
  },
  {
    expansion: 'Base',
    id: 69,
    numAnswers: 1,
    official: true,
    text: 'What gets better with age?',
    regionId: '59b91ad4605e234f4555a4df'
  },
  {
    expansion: 'Base',
    id: 70,
    numAnswers: 1,
    official: true,
    text: '_: kid-tested, mother-approved.',
    regionId: '59b91ad4605e234f4555a4df'
  },
  {
    expansion: 'Base',
    id: 71,
    numAnswers: 1,
    official: true,
    text: "What's the crustiest?",
    regionId: '59b91ad4605e234f4555a4df'
  },
  {
    expansion: 'Base',
    id: 72,
    numAnswers: 1,
    official: true,
    text: "What's Teach for Egypt using to inspire inner city students to succeed?",
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 73,
    numAnswers: 1,
    official: true,
    text: 'Studies show that lab rats navigate mazes 50% faster after being exposed to _.',
    regionId: '59b91ad4605e234f4555a4e0'
  },
  {
    expansion: 'Base',
    id: 74,
    numAnswers: 1,
    official: true,
    text: 'Life for Zambians was forever changed when the White Man introduced them to _.',
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 76,
    numAnswers: 1,
    official: true,
    text: 'I do not know with what weapons World War III will be fought, but World War IV will be fought with _.',
    regionId: '59b91ad4605e234f4555a4e0'
  },
  {
    expansion: 'Base',
    id: 77,
    numAnswers: 1,
    official: true,
    text: 'Why do I hurt all over?',
    regionId: '59b91ad4605e234f4555a4e0'
  },
  {
    expansion: 'Base',
    id: 78,
    numAnswers: 1,
    official: true,
    text: 'What am I giving up for Lent?',
    regionId: '59b91ad4605e234f4555a4e0'
  },
  {
    expansion: 'Base',
    id: 79,
    numAnswers: 1,
    official: true,
    text: 'In Fela Kuti final moments, he thought about _.',
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 80,
    numAnswers: 1,
    official: true,
    text: 'In an attempt to reach a wider audience, the Smithsonian Museum of Natural History has opened an interactive exhibit on _.',
    regionId: '59b91ad4605e234f4555a4e0'
  },
  {
    expansion: 'Base',
    id: 81,
    numAnswers: 1,
    official: true,
    text: 'When I am President of Namibia, I will create the Department of _.',
    regionId: '2'
  },
  {
    expansion: 'Base',
    id: 82,
    numAnswers: 2,
    official: true,
    text: 'Lifetime® presents _, the story of _.',
    regionId: '59b91ad4605e234f4555a4e0'
  },
  {
    expansion: 'Base',
    id: 83,
    numAnswers: 1,
    official: true,
    text: 'When I am a billionaire, I shall erect a 50-foot statue to commemorate _.',
    regionId: '59b91ad4605e234f4555a4e0'
  },
  {
    expansion: 'Base',
    id: 84,
    numAnswers: 2,
    official: true,
    text: 'When I was tripping on acid, _ turned into _.',
    regionId: '59b91ad4605e234f4555a4e0'
  },
  {
    expansion: 'Base',
    id: 85,
    numAnswers: 2,
    official: true,
    text: "That's right, I killed _.  How, you ask?  _.",
    regionId: '59b91ad4605e234f4555a4e0'
  },
  {
    expansion: 'Base',
    id: 86,
    numAnswers: 1,
    official: true,
    text: "What's my anti-drug?",
    regionId: '59b91ad4605e234f4555a4e0'
  },
  {
    expansion: 'Base',
    id: 88,
    numAnswers: 1,
    official: true,
    text: 'What never fails to liven up the party?',
    regionId: '59b91ad4605e234f4555a4e0'
  },
  {
    expansion: 'Base',
    id: 89,
    numAnswers: 1,
    official: true,
    text: "What's the new fad diet?",
    regionId: '59b91ad4605e234f4555a4e0'
  },
  {
    expansion: 'Base',
    id: 90,
    numAnswers: 1,
    official: true,
    text: 'Major League Baseball has banned _ for giving players an unfair advantage.',
    regionId: '59b91ad4605e234f4555a4e0'
  },
  {
    expansion: 'CAHe1',
    id: 91,
    numAnswers: 1,
    official: true,
    text: 'My plan for world domination begins with _.',
    regionId: '59b91ad4605e234f4555a4e0'
  },
  {
    expansion: 'CAHe1',
    id: 92,
    numAnswers: 1,
    official: true,
    text: 'The CIA now interrogates enemy agents by repeatedly subjecting them to _.',
    regionId: '59b91ad4605e234f4555a4e0'
  },
  {
    expansion: 'CAHe1',
    id: 93,
    numAnswers: 2,
    official: true,
    text: 'Dear Sir or Madam, We regret to inform you that the Office of _ has denied your request for _',
    regionId: '59b91ad4605e234f4555a4e0'
  },
  {
    expansion: 'CAHe1',
    id: 94,
    numAnswers: 1,
    official: true,
    text: 'In Rome, there are whisperings that the Vatican has a secret room devoted to _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 95,
    numAnswers: 1,
    official: true,
    text: 'Science will never explain _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 96,
    numAnswers: 1,
    official: true,
    text: 'When all else fails, I can always masturbate to _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 97,
    numAnswers: 1,
    official: true,
    text: "I learned the hard way that you can't cheer up a grieving friend with _.",
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 98,
    numAnswers: 1,
    official: true,
    text: 'In its new tourism campaign, Detroit proudly proclaims that it has finally eliminated _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 99,
    numAnswers: 2,
    official: true,
    text: 'An international tribunal has found _ guilty of _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 100,
    numAnswers: 1,
    official: true,
    text: 'The socialist governments of Scandinavia have declared that access to _ is a basic human right.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 101,
    numAnswers: 1,
    official: true,
    text: 'In his new self-produced album, Kanye West raps over the sounds of _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 102,
    numAnswers: 1,
    official: true,
    text: "What's the gift that keeps on giving?",
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 103,
    numAnswers: 1,
    official: true,
    text: 'Next season on Man vs. Wild, Bear Grylls must survive in the depths of the Amazon with only _ and his wits.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 104,
    numAnswers: 1,
    official: true,
    text: 'When I pooped, what came out of my butt?',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 105,
    numAnswers: 1,
    official: true,
    text: "In the distant future, historians will agree that _ marked the beginning of America's decline.",
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 106,
    numAnswers: 2,
    official: true,
    text: 'In a pinch, _ can be a suitable substitute for _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 107,
    numAnswers: 1,
    official: true,
    text: 'What has been making life difficult at the nudist colony?',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 108,
    numAnswers: 2,
    official: true,
    text: "Michael Bay's new three-hour action epic pits _ against _.",
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 109,
    numAnswers: 1,
    official: true,
    text: "And I would have gotten away with it, too, if it hadn't been for _.",
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 110,
    numAnswers: 1,
    official: true,
    text: 'What brought the orgy to a grinding halt?',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 111,
    numAnswers: 1,
    official: true,
    text: 'During his midlife crisis, my dad got really into _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 112,
    numAnswers: 2,
    official: true,
    text: '_ would be woefully incomplete without _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 113,
    numAnswers: 1,
    official: true,
    text: 'My new favorite porn star is Joey _ McGee.',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 114,
    numAnswers: 1,
    official: true,
    text: 'Before I run for president, I must destroy all evidence of my involvement with _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 115,
    numAnswers: 1,
    official: true,
    text: 'This is your captain speaking. Fasten your seatbelts and prepare for _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 116,
    numAnswers: 1,
    official: true,
    text: 'In his newest and most difficult stunt, David Blaine must escape from _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 117,
    numAnswers: 1,
    official: true,
    text: 'The Five Stages of Grief: denial, anger, bargaining, _, and acceptance.',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 118,
    numAnswers: 2,
    official: true,
    text: 'My mom freaked out when she looked at my browser history and found _.com/_.',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 120,
    numAnswers: 1,
    official: true,
    text: "Members of New York's social elite are paying thousands of dollars just to experience _.",
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 122,
    numAnswers: 1,
    official: true,
    text: 'Little Miss Muffet Sat on a tuffet, Eating her curds and _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 123,
    numAnswers: 2,
    official: true,
    text: "If God didn't want us to enjoy _, he wouldn't have given us _.",
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 124,
    numAnswers: 1,
    official: true,
    text: "My country, 'tis of thee, sweet land of _.",
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 125,
    numAnswers: 1,
    official: true,
    text: 'After months of debate, the Occupy Wall Street General Assembly could only agree on More _!',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 126,
    numAnswers: 2,
    official: true,
    text: 'I spent my whole life working toward _, only to have it ruined by _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 127,
    numAnswers: 1,
    official: true,
    text: 'Next time on Dr. Phil: How to talk to your child about _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 128,
    numAnswers: 1,
    official: true,
    text: 'Only two things in life are certain: death and _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 129,
    numAnswers: 1,
    official: true,
    text: "Everyone down on the ground! We don't want to hurt anyone. We're just here for _.",
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 130,
    numAnswers: 1,
    official: true,
    text: 'The healing process began when I joined a support group for victims of _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 131,
    numAnswers: 1,
    official: true,
    text: 'The votes are in, and the new high school mascot is _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 132,
    numAnswers: 1,
    official: true,
    text: 'Charades was ruined for me forever when my mom had to act out _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 133,
    numAnswers: 2,
    official: true,
    text: 'Before _, all we had was _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe2',
    id: 135,
    numAnswers: 2,
    official: true,
    text: "You haven't truly lived until you've experienced _ and _ at the same time.",
    regionId: '1'
  },
  {
    expansion: 'CAHxmas',
    id: 181,
    numAnswers: 1,
    official: true,
    text: "After blacking out during New year's Eve, I was awoken by _.",
    regionId: '1'
  },
  {
    expansion: 'CAHxmas',
    id: 182,
    numAnswers: 1,
    official: true,
    text: 'This holiday season, Tim Allen must overcome his fear of _ to save Christmas.',
    regionId: '1'
  },
  {
    expansion: 'CAHxmas',
    id: 183,
    numAnswers: 1,
    official: true,
    text: 'Jesus is _.',
    regionId: '1'
  },
  {
    expansion: 'CAHxmas',
    id: 184,
    numAnswers: 1,
    official: true,
    text: 'Every Christmas, my uncle gets drunk and tells the story about _.',
    regionId: '1'
  },
  {
    expansion: 'CAHxmas',
    id: 185,
    numAnswers: 1,
    official: true,
    text: 'What keeps me warm during the cold, cold, winter?',
    regionId: '1'
  },
  {
    expansion: 'CAHxmas',
    id: 186,
    numAnswers: 1,
    official: true,
    text: 'On the third day of Christmas, my true love gave to me: three French hens, two turtle doves, and _.',
    regionId: '1'
  },
  {
    expansion: 'CAHxmas',
    id: 187,
    numAnswers: 1,
    official: true,
    text: 'Wake up, America. Christmas is under attack by secular liberals and their _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 236,
    numAnswers: 1,
    official: true,
    text: 'A successful job interview begins with a firm handshake and ends with _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 237,
    numAnswers: 1,
    official: true,
    text: "Lovin' you is easy 'cause you're _.",
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 238,
    numAnswers: 2,
    official: true,
    text: 'My life is ruled by a vicious cycle of _ and _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 240,
    numAnswers: 1,
    official: true,
    text: '_. Awesome in theory, kind of a mess in practice.',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 239,
    numAnswers: 1,
    official: true,
    text: 'The blind date was going horribly until we discovered our shared interest in _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 241,
    numAnswers: 1,
    official: true,
    text: "I'm not like the rest of you. I'm too rich and busy for _.",
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 242,
    numAnswers: 1,
    official: true,
    text: 'In the seventh circle of Hell, sinners must endure _ for all eternity.',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 243,
    numAnswers: 2,
    official: true,
    text: '_: Hours of fun. Easy to use. Perfect for _!',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 244,
    numAnswers: 1,
    official: true,
    text: 'What left this stain on my couch?',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 245,
    numAnswers: 1,
    official: true,
    text: 'Call the law offices of Goldstein \u0026 Goldstein, because no one should have to tolerate _ in the workplace.',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 246,
    numAnswers: 2,
    official: true,
    text: 'When you get right down to it, _ is just _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 247,
    numAnswers: 1,
    official: true,
    text: 'Turns out that _-Man was neither the hero we needed nor wanted.',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 248,
    numAnswers: 1,
    official: true,
    text: 'As part of his daily regimen, Anderson Cooper sets aside 15 minutes for _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 249,
    numAnswers: 1,
    official: true,
    text: "Money can't buy me love, but it can buy me _.",
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 250,
    numAnswers: 2,
    official: true,
    text: 'With enough time and pressure, _ will turn into _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 251,
    numAnswers: 1,
    official: true,
    text: 'And what did you bring for show and tell?',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 252,
    numAnswers: 1,
    official: true,
    text: 'During high school, I never really fit in until I found _ club.',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 253,
    numAnswers: 1,
    official: true,
    text: "Hey, baby, come back to my place and I'll show you _.",
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 254,
    numAnswers: 2,
    official: true,
    text: "After months of practice with _, I think I'm finally ready for _.",
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 255,
    numAnswers: 1,
    official: true,
    text: 'To prepare for his upcoming role, Daniel Day-Lewis immersed himself in the world of _.',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 256,
    numAnswers: 1,
    official: true,
    text: 'Finally! A service that delivers _ right to your door.',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 257,
    numAnswers: 1,
    official: true,
    text: 'My gym teacher got fired for adding _ to the obstacle course.',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 258,
    numAnswers: 2,
    official: true,
    text: 'Having problems with _? Try _!',
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 259,
    numAnswers: 1,
    official: true,
    text: "As part of his contract, Prince won't perform without _ in his dressing room.",
    regionId: '1'
  },
  {
    expansion: 'CAHe3',
    id: 260,
    numAnswers: 2,
    official: true,
    text: "Listen, son. If you want to get involved with _, I won't stop you. Just steer clear of _.",
    regionId: '1'
  }
];


const answers = [

  {
    expansion: 'Base',
    id: 404,
    official: true,
    text: 'American Gladiators.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 406,
    official: true,
    text: 'Sean Connery.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 407,
    official: true,
    text: 'William Shatner.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 408,
    official: true,
    text: "Domino's™ Oreo™ Dessert Pizza.",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 410,
    official: true,
    text: 'Centaurs.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 413,
    official: true,
    text: 'The milk man.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 414,
    official: true,
    text: 'Waterboarding.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 415,
    official: true,
    text: 'Wifely duties.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 416,
    official: true,
    text: 'Loose lips.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 417,
    official: true,
    text: 'The Blood of Christ.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 418,
    official: true,
    text: 'Actually taking candy from a baby.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 419,
    official: true,
    text: 'The token minority.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 420,
    official: true,
    text: 'Jibber-jabber.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 422,
    official: true,
    text: 'Bingeing and purging.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 423,
    official: true,
    text: 'A clandestine butt scratch.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 424,
    official: true,
    text: 'The Chinese gymnastics team.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 426,
    official: true,
    text: 'The Hamburglar.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 427,
    official: true,
    text: 'Police brutality.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 428,
    official: true,
    text: 'Man meat.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 429,
    official: true,
    text: 'Forgetting the Alamo.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 431,
    official: true,
    text: 'Crystal meth.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 434,
    official: true,
    text: 'Third base.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 435,
    official: true,
    text: 'Soiling oneself.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 436,
    official: true,
    text: 'Laying an egg.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 437,
    official: true,
    text: 'Giving 110%.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 438,
    official: true,
    text: 'Hot people.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 439,
    official: true,
    text: 'Friendly fire.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 440,
    official: true,
    text: 'Count Chocula.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 441,
    official: true,
    text: 'Pac-Man uncontrollably guzzling cum.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 442,
    official: true,
    text: 'Estrogen.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 444,
    official: true,
    text: 'Kanye West.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 445,
    official: true,
    text: 'A robust mongoloid.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 446,
    official: true,
    text: 'The Donald Trump Seal of Approval™.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 447,
    official: true,
    text: 'The true meaning of Christmas.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 448,
    official: true,
    text: 'Her Royal Highness, Queen Elizabeth II.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 449,
    official: true,
    text: 'An honest cop with nothing left to lose.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 450,
    official: true,
    text: "Feeding Rosie O'Donnell.",
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 451,
    official: true,
    text: 'The Amish.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 452,
    official: true,
    text: 'The terrorists.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 454,
    official: true,
    text: 'Pooping back and forth. Forever.',
    regionId: '1'
  },
  {
    expansion: 'Base',
    id: 455,
    official: true,
    text: 'Friends who eat all the snacks.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 460,
    official: true,
    text: 'A beached whale.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 461,
    official: true,
    text: 'A bloody pacifier.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 462,
    official: true,
    text: 'A crappy little hand.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 463,
    official: true,
    text: 'A low standard of living.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 464,
    official: true,
    text: 'A nuanced critique.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 465,
    official: true,
    text: 'Panty raids.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 466,
    official: true,
    text: 'A passionate Latino lover.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 467,
    official: true,
    text: 'A rival dojo.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 468,
    official: true,
    text: 'A web of lies.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 470,
    official: true,
    text: 'Clams.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 471,
    official: true,
    text: 'Apologizing.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 473,
    official: true,
    text: 'Neil Patrick Harris.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 475,
    official: true,
    text: 'Being a dinosaur.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 477,
    official: true,
    text: 'Bosnian chicken farmers.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 478,
    official: true,
    text: 'Nubile slave boys.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 479,
    official: true,
    text: 'Carnies.',
    regionId: '1'
  },
  {
    expansion: 'CAHe1',
    id: 507,
    official: true,
    text: 'Medieval Times© Dinner \u0026 Tournament.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 509,
    official: true,
    text: 'My machete.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 510,
    official: true,
    text: 'One thousand Slim Jims.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 511,
    official: true,
    text: 'Ominous background music.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 512,
    official: true,
    text: 'Overpowering your father.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 513,
    official: true,
    text: 'Stockholm Syndrome.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 514,
    official: true,
    text: 'Quiche.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 515,
    official: true,
    text: 'Quivering jowls.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 518,
    official: true,
    text: 'Ryan Gosling riding in on a white horse.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 519,
    official: true,
    text: 'Santa Claus.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 520,
    official: true,
    text: 'Scrotum tickling.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 523,
    official: true,
    text: 'Saliva.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 524,
    official: true,
    text: 'Space muffins.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 525,
    official: true,
    text: 'Statistically validated stereotypes.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 527,
    official: true,
    text: 'The boners of the elderly.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 528,
    official: true,
    text: 'The economy.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 529,
    official: true,
    text: 'Syphilitic insanity.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 530,
    official: true,
    text: 'The Gulags.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 531,
    official: true,
    text: 'The harsh light of day.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 532,
    official: true,
    text: 'The hiccups.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 533,
    official: true,
    text: 'The shambling corpse of Larry King.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 534,
    official: true,
    text: 'The four arms of Vishnu.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 535,
    official: true,
    text: 'Being a busy adult with many important things to do.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 536,
    official: true,
    text: 'Tripping balls.',
    regionId: '2'
  },
  {
    expansion: 'CAHe1',
    id: 537,
    official: true,
    text: 'Words, words, words.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 540,
    official: true,
    text: "The mere concept of Applebee's®.",
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 542,
    official: true,
    text: 'Catastrophic urethral trauma.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 543,
    official: true,
    text: "Hillary Clinton's death stare.",
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 544,
    official: true,
    text: 'Existing.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 546,
    official: true,
    text: 'Mooing.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 548,
    official: true,
    text: "Daddy's belt.",
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 550,
    official: true,
    text: 'Weapons-grade plutonium.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 553,
    official: true,
    text: 'Rising from the grave.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 554,
    official: true,
    text: 'The mixing of the races.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 556,
    official: true,
    text: 'Scrotal frostbite.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 557,
    official: true,
    text: 'All of this blood.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 558,
    official: true,
    text: 'Loki, the trickster god.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 561,
    official: true,
    text: 'Tongue.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 562,
    official: true,
    text: 'Finding Waldo.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 563,
    official: true,
    text: 'Upgrading homeless people to mobile hotspots.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 564,
    official: true,
    text: 'Wearing an octopus for a hat.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 565,
    official: true,
    text: 'An unhinged ferris wheel rolling toward the sea.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 566,
    official: true,
    text: 'Living in a trashcan.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 567,
    official: true,
    text: 'The corporations.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 568,
    official: true,
    text: 'A magic hippie love cloud.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 570,
    official: true,
    text: "Survivor's guilt.",
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 571,
    official: true,
    text: 'Me.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 572,
    official: true,
    text: 'Getting hilariously gang-banged by the Blue Man Group.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 573,
    official: true,
    text: 'Jeff Goldblum.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 574,
    official: true,
    text: 'Making a friend.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 575,
    official: true,
    text: "A soulful rendition of Ol' Man River.",
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 577,
    official: true,
    text: 'A sweaty, panting leather daddy.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 578,
    official: true,
    text: 'Spring break!',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 580,
    official: true,
    text: 'Dining with cardboard cutouts of the cast of Friends.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 582,
    official: true,
    text: "Beefin' over turf.",
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 583,
    official: true,
    text: 'A squadron of moles wearing aviator goggles.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 584,
    official: true,
    text: 'Bullshit.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 585,
    official: true,
    text: 'The Google.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 587,
    official: true,
    text: 'The new Radiohead album.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 588,
    official: true,
    text: 'An army of skeletons.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 590,
    official: true,
    text: 'Mild autism.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 591,
    official: true,
    text: 'Nunchuck moves.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 593,
    official: true,
    text: 'An ether-soaked rag.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 594,
    official: true,
    text: 'A sweet spaceship.',
    regionId: '2',
  },
  {
    expansion: 'CAHe2',
    id: 595,
    official: true,
    text: 'A 55-gallon drum of lube.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 596,
    official: true,
    text: 'Special musical guest, Cher.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 597,
    official: true,
    text: 'The human body.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 598,
    official: true,
    text: 'Boris the Soviet Love Hammer.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 599,
    official: true,
    text: 'The grey nutrient broth that sustains Mitt Romney.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 601,
    official: true,
    text: 'Power.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 602,
    official: true,
    text: 'Oncoming traffic.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 603,
    official: true,
    text: 'A dollop of sour cream.',
    regionId: '2'
  },
  {
    expansion: 'CAHe2',
    id: 604,
    official: true,
    text: 'A slightly shittier parallel universe.',
    regionId: '2'
  }
];

db.getCollection('questions').insert(questions);
db.getCollection('answers').insert(answers);
