export const VERTICAL_CARDS = [
  {
    id: '1',
    categoryId: 'h1',
    title: 'Exploring the Alps',
    description: 'A journey through the stunning landscapes of the Swiss Alps.',
    details:
      "Our adventure began in a small village, from where we started our ascent. The views were breathtaking, with snow-capped peaks and lush green valleys stretching as far as the eye could see. We encountered diverse flora and fauna, making it a memorable experience for any nature lover. The air was crisp and clean, a welcome change from the city hustle. We spent our evenings by a crackling fire, sharing stories and planning the next day's hike. The local cuisine was hearty and delicious, providing the perfect fuel for our mountain explorations. This trip was not just a physical journey but a spiritual one, reconnecting us with nature and ourselves.",
  },
  {
    id: '2',
    categoryId: 'h1',
    title: 'The Culinary Tour of Italy',
    description: 'Discovering the rich and diverse flavors of Italian cuisine.',
    details:
      'From the pasta in Rome to the pizza in Naples, every meal was a delight. We learned to make fresh pasta from scratch, tasted authentic gelato, and explored local markets bustling with fresh produce. This tour was a feast for the senses.',
  },
  {
    id: '3',
    categoryId: 'h2',
    title: 'Ancient Ruins of Greece',
    description:
      'A historical tour of Athens and the surrounding ancient sites.',
    details:
      'Walking through the Acropolis, you can almost hear the echoes of the past. We visited the Parthenon, the Theatre of Dionysus, and the ancient Agora. Each site has a story to tell about the birth of democracy and philosophy. Our guide, a passionate historian, brought the ruins to life with vivid descriptions of ancient life. We also explored the lesser-known sites, discovering hidden gems off the beaten path. The trip concluded with a visit to the National Archaeological Museum, home to some of the most important artifacts from ancient Greece. It was a profound journey into the heart of Western civilization.',
  },
  {
    id: '4',
    categoryId: 'h2',
    title: 'Japanese Zen Gardens',
    description:
      'Finding tranquility in the meticulously designed gardens of Kyoto.',
    details:
      'The rock gardens, moss gardens, and pond gardens are all designed to evoke a sense of peace and serenity. We participated in a traditional tea ceremony and learned about the principles of Zen Buddhism that influence these beautiful landscapes.',
  },
  {
    id: '5',
    categoryId: 'h3',
    title: 'The Great Barrier Reef',
    description: 'An underwater adventure exploring the vibrant marine life.',
    details:
      'Snorkeling and diving in the Great Barrier Reef is like entering another world. The coral formations are spectacular, and the reef is teeming with colorful fish, sea turtles, and other marine creatures. It is a fragile ecosystem that needs our protection.',
  },
  {
    id: '6',
    categoryId: 'h3',
    title: 'Safari in the Serengeti',
    description: 'Witnessing the great wildebeest migration in Tanzania.',
    details:
      'The sight of thousands of wildebeest and zebras crossing the plains is a spectacle of nature. We saw lions, elephants, giraffes, and many other animals in their natural habitat. The safari was a thrilling and humbling experience.',
  },
  {
    id: '7',
    categoryId: 'h4',
    title: 'The Northern Lights in Norway',
    description: 'Chasing the magical aurora borealis in the Arctic Circle.',
    details:
      'Seeing the Northern Lights dance across the sky is an unforgettable experience. We stayed in a cozy cabin, went dog sledding, and learned about the Sami culture. The Arctic winter is cold but beautiful.',
  },
  {
    id: '8',
    categoryId: 'h4',
    title: 'Hiking the Inca Trail',
    description:
      'A challenging but rewarding trek to the lost city of Machu Picchu.',
    details:
      'The four-day hike took us through diverse landscapes, including cloud forests and alpine tundra. The trail is steeped in history, with ancient ruins along the way. Reaching Machu Picchu at sunrise was a magical moment.',
  },
];

export const HORIZONTAL_CARDS = [
  { id: 'h1', title: 'Trending Now' },
  { id: 'h2', title: 'New Releases' },
  { id: 'h3', title: 'Staff Picks' },
  { id: 'h4', title: 'Most Popular' },
  { id: 'h5', title: 'Hidden Gems' },
  { id: 'h6', title: 'Award Winners' },
  { id: 'h7', title: 'Top Rated' },
];

export const BOTTOMSHEET_CARDS = Array.from({ length: 9 }, (_, i) => ({
  id: `bs-${i + 1}`,
  title: `Related Item ${i + 1}`,
}));
