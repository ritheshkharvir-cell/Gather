import { Event, Attendee, Category } from '../types';

export const MOCK_ATTENDEES: Attendee[] = [
  {
    id: 'a1',
    fullName: 'Sarah Jenkins',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWlHMdkFN_TUCfsZsnMvJv3IrKpdDIjXI5fe2FQjUthiuKpVQJpYf8YqflmkfWgedLVQxYED94QZtdnNA37VIwGRGptHbU5pApyHfVPM7G4uNzwIj9EEquGGeC2v2_1PykN3sggKGR0-HEisveyqIlcfLBXm7gKnKR_4SB4_3wv-1glLoFYLzCY9MbvmJD54KYXNplmiTZIzzHza8JhDNMMd0kA9jQ0yIqbImYGUWDxaMnvz3QMsbgFgswvm6mWBYXzLrK263R59E'
  },
  {
    id: 'a2',
    fullName: 'Alex Rivera',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJQXzDbyVMnOKcVImJyb483MICbZr2e2VxFUl20j2Hep3o4P_Naf1asB4GDJaEUKK0yDYPwQqRCtW2vvl-ISsJ-kLQTmDfd7iZRkRMRzmclv3tglNesZl_mJhBM08sf0knKWWgu4JRS5YMlHIzmVlUN1WroXbozxq2r7Tha3EwHWmRkeV8f1pRy6PgfNU62YcfAQPkT2lqx8X_bSAUFbc_pPLhgBJaIG1C6EagceBGhMruzRBnUXtbekoM-Nzh1x6jcKN-wc81pwQ'
  },
  {
    id: 'a3',
    fullName: 'Derrick Powell',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQH2PKJIyE4Jj6PjzZXhZJJJVlAmVuf1dSBE__V6zxSMY2NAXFK5fOuHD7pT4ctdXISZ4VlgQCm4r_aRtuaWWJZ-5_LmRMQ3h1hZh6urHWA8_fLI9zQvma-o62I8k2Y9k7Jw1moltuilHegpAuMpa58k6qSi1YiRIn_9bDk4QmSxGD-jOBSVx-8z70ezHh_Qm-1pLMfMOc6tNsfJgPjRjWG--nsw7I1kuNGuL_rmaVGLcuZ5cTpmLdrNKjHWpPfhi7me4O0NhB4EQ'
  },
  {
    id: 'a4',
    fullName: 'Maya Lin',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbN9sx29uO3R1GuCrLxmkLwPWvhmcASVqp5TaLuhObDmS19zPNrLqkHpq4tt1gjhc9j1cifJRb_n2cxpPgcWlI7St_Q5bHDrm2lwdP7PQO10NsmkYrkk7skPhXbO7D2rsxa7jGl4uBMj_fpd5j2jIKBTDYCqeLVAwcmj10ViE7_9jBHOWf8U7bVr1OSnIhrTMlH4JIRY924i5bi7XuypB6AIfOHbOY4kRRowaKjfkK6EBLhsZN1cOz4Vl1bwVBEreJZnlBh1prmvM'
  },
  {
    id: 'a5',
    fullName: 'Liam Carter',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJffWB7JCN6d38zD6YspR5AS6N1TgLlvIwDuPoF_wOAR4kqwwbKa1EoZG7MA_NT0nRc6g8-6beJoVIg8opt4kuewX8Zi7mRq6wbTDus0haeUfM2T4rbcz1Z_Njv1UKsBDp17MeI4mMg6GUBr56e46qk5BGeWLdWLD4YRO9g4JMCwiLUbOhXphbcfom2vuwerXC99IZva9sACyeVcE2moQgBh9MPSLGr1KAbgADWZzRlyaxSm1DUxLi4X5Gh92UJWOG3YCu6GrT0co'
  },
  {
    id: 'a6',
    fullName: 'Jessica Taylor',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIApiUd-OuCiyVVnOBwS6BF57qPFco6Kk8oUILCj1sodTawGm7QXO0KUP5JtojYcsUB4gcr4W4vrVtK2M9nfr-I0h0e1GvOKigh0nHN9ApEnXa3hvFiTNMPLIzU6lK1Ux2PJPO4ujw5bJBkDwFnNy-1gReQcNn7ljgtC_rqCFRivHGuKaGZT9ekAPyoHfox7ZFjCtS_RNl7obDF0oDuOpV_nYGWVoDzELn8uJXDthtY2872W9TpO2oDMZTP9ZEsWqFttSR4Ekd_40'
  }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'all', name: 'All Gathers', iconName: 'Compass' },
  { id: 'music', name: 'Music', iconName: 'Music' },
  { id: 'food', name: 'Food', iconName: 'Utensils' },
  { id: 'tech', name: 'Tech', iconName: 'Laptop' },
  { id: 'sports', name: 'Sports', iconName: 'Trophy' },
  { id: 'arts', name: 'Arts', iconName: 'Palette' },
  { id: 'nature', name: 'Nature', iconName: 'Trees' }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Rooftop Vinyl Sessions',
    description: "Join us for an evening of analog sound and panoramic city views. We're bringing together local vinyl collectors and DJs for a curated journey through rare soul, funk, and jazz. Whether you're a crate-digger or just looking for a vibe, come connect with the community as the sun dips below the skyline. Drinks and light bites are included with your RSVP.",
    date: '2026-10-24',
    time: '18:30',
    location: 'The High-Rise Lounge',
    locationDetails: '402 E 6th St, Austin, TX 78701',
    price: '$15 USD',
    isFree: false,
    category: 'Music',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALrQ2Ibb3ygDuXcyWRYS5gHEpQgO4aRSKTzC6z-dCLFaXWL813jHgqhB9TwT15p53rr57lcyu2cq3GUVPsSXjyPP4VhYw6iSXvXqwzOzP3FkYB_QZt4AVlwh0ORhP7jrHG6VfZQylnD_5RjwusKF0H434OoeKMCARrGcCB-UwtLixLrGIXFnjz4cvNlyJ_scL9xtR1rOc1JBU5sO24Hvc13KxruOW-q4o6WZUUgOlXU33qAU_ARnYM7KEZ7fp2-0sZ8SBXvjPu1lM',
    hostedById: 'u_marcus',
    hostedByName: 'Marcus Chen',
    hostedByAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9ixXFMOHxX7wtQIwsyJtpZ2mFauKE1WElQsMIEXZ92uy4zsnpwmyXu1UC_QS992bWtpoh28qM2IRnkO5TT2KCOl5YnjDTkhAPu-6me_efK2O9xPakHqTwMW5_TQyowUEH_tDltz8rXbdh843wjEKYGeBGyCcduQW48ubTCqrVav_Iy2jGCUMUCkLrh_tohrT4YsQoRhdDshHrGgb6RIcXmozvQSIsV7-O4ABFzEtn0oHkI3XYVs-fnlHJogcWJk1zmasgMuOVhDs',
    attendees: [MOCK_ATTENDEES[0], MOCK_ATTENDEES[1], MOCK_ATTENDEES[2], MOCK_ATTENDEES[3], MOCK_ATTENDEES[5]],
    registeredUserIds: []
  },
  {
    id: 'e2',
    title: 'Summer Rooftop Beats',
    description: 'A vibrant rooftop party at sunset with people dancing and socializing. The atmosphere is energetic, featuring warm golden hour lighting and silhouettes of a city skyline. The color palette is rich with sunset oranges, deep indigos, and glowing string lights, creating a modern and inclusive social vibe. Celebrate the summer with refreshing signature cocktails and live sets.',
    date: '2026-07-15',
    time: '19:00',
    location: 'The Sunset Deck',
    locationDetails: '78 Skyline Blvd, Los Angeles, CA 90012',
    price: '$25',
    isFree: false,
    category: 'Music',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMRknbg96p1bqF3lfeBBRg7h651m9wLxe5QYu9_EOZOObZY2quNkRQPZHOS5g3nDWgyZe-uWwHnEBnyDrlLbRbBzbLbz5SA2LDxCR_ZFBQg4SPM38j4clMbVH1uOTJTtzthHpmeDtZMp_9LeQffJYyC2ALUqm6YdOrfhBZuUfNLI9zWbqMidZCJ2_Wr8KIkFyvlpdf_mrVcpQBkDHi7j3VaBA1tRELKeli8EJzyg8FrGPSQEZXguMXv-Bv-XpJgxDudV55imkaltw',
    hostedById: 'u_lucas',
    hostedByName: 'Lucas Miller',
    hostedByAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJffWB7JCN6d38zD6YspR5AS6N1TgLlvIwDuPoF_wOAR4kqwwbKa1EoZG7MA_NT0nRc6g8-6beJoVIg8opt4kuewX8Zi7mRq6wbTDus0haeUfM2T4rbcz1Z_Njv1UKsBDp17MeI4mMg6GUBr56e46qk5BGeWLdWLD4YRO9g4JMCwiLUbOhXphbcfom2vuwerXC99IZva9sACyeVcE2moQgBh9MPSLGr1KAbgADWZzRlyaxSm1DUxLi4X5Gh92UJWOG3YCu6GrT0co',
    attendees: [MOCK_ATTENDEES[1], MOCK_ATTENDEES[2], MOCK_ATTENDEES[5]],
    registeredUserIds: []
  },
  {
    id: 'e3',
    title: 'Tech Founders Mixer',
    description: 'A group of diverse professionals engaged in conversation in a sleek, modern co-working space with floor-to-ceiling windows. Build your network, meet potential co-founders, and pitch your ideas casually. The mood is collaborative, innovative, and high-energy. Free drinks and pizza provided by our project sponsors.',
    date: '2026-07-17',
    time: '18:30',
    location: 'Innovative Hub Co',
    locationDetails: 'Suite 400, 100 Tech Plaza, San Francisco, CA 94103',
    price: 'FREE',
    isFree: true,
    category: 'Tech',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqtAZloQ-7bU2zNBZGNcCBIH5Nmq-G2G_A2F0ZgPKryLTW7xkbf03FjUuweBfhLK2sqOeFR2r0aAb6owvHowaNymD9aWCRB4JoIAcFTzAY1dWRcWxta1fR0QraiCsQvl8VhxcoH1C7c75aoqzeZQCuZ3kpMmLroivhQ6RB3f1aj9qatS_ShL08DD15nmw6wAHAMMfevgvYU2JP9q4XunTrs0z1vkZRCuHyUfD7-taQsA2qPhJDPNm3KIwVVZNTs69-7BqkIUvxzxw',
    hostedById: 'u_marcus',
    hostedByName: 'Marcus Chen',
    hostedByAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9ixXFMOHxX7wtQIwsyJtpZ2mFauKE1WElQsMIEXZ92uy4zsnpwmyXu1UC_QS992bWtpoh28qM2IRnkO5TT2KCOl5YnjDTkhAPu-6me_efK2O9xPakHqTwMW5_TQyowUEH_tDltz8rXbdh843wjEKYGeBGyCcduQW48ubTCqrVav_Iy2jGCUMUCkLrh_tohrT4YsQoRhdDshHrGgb6RIcXmozvQSIsV7-O4ABFzEtn0oHkI3XYVs-fnlHJogcWJk1zmasgMuOVhDs',
    attendees: [MOCK_ATTENDEES[0], MOCK_ATTENDEES[4], MOCK_ATTENDEES[3]],
    registeredUserIds: []
  },
  {
    id: 'e4',
    title: 'Underground Food Market',
    description: 'A bustling indoor food hall with various stalls, vibrant steam rising from hot dishes, and people tasting different cuisines. The lighting is warm and ambient, highlighting a rich palette of spice colors and fresh ingredients. Sample bites from over 20 global local creators and fusion chefs. Perfect for foodies and adventurers alike!',
    date: '2026-07-20',
    time: '20:00',
    location: 'Silo Warehouse',
    locationDetails: '88 Industrial Way, Brooklyn, NY 11201',
    price: '$10 Entry',
    isFree: false,
    category: 'Food',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATADRnQ16CT6vmRmzKepGG8ku36-w3v_gLjC-PuzKhQ1BugWqPcAvjiLN3Nuj2R8ruzeDpIW9wFzRBYb_0Qym5xVO7wZZYtapkEbZcHT-a0qRLlAU3PmLK9w0BGs-mr5tdQIHCZfinDJd8sLnNNoQ08-XAG0GY1ZEFgyZnNiSF8IMPgpo8i8GQW0ovZ__60p3_RkO2GkPrDOvYBDLsxtJE1fad3oSywsh7dQMcxcFDsaASSpcyVN0t2Jc0qLt7TulO-SlPJSTDywc',
    hostedById: 'u_chelsea',
    hostedByName: 'Chelsea Green',
    hostedByAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmBTI2aqM9RLRq6XIGR-pOZuLhHN6-BvGnhSoGxjtpKDkHOpTanXspd7MQ64MoP0I4H5e1DPMnWUTqxg56gAFiOvHJdllz6UB4HiKcCxF2CZuE9OhUsD14IjY_3GGHnc74P6EDR14aKw1aOJG2TiSaL20wmkBzEDSbv_VqtkTvUQpTSoaMgg4oIN236PnxC20gFLmrBq3C2S4teb1-xe_DQdVkR4oUmgimHBTL_r50SmUGDsP_sgMiESl7oF29Qh-o9VQb3EOYW38',
    attendees: [MOCK_ATTENDEES[2], MOCK_ATTENDEES[3], MOCK_ATTENDEES[4], MOCK_ATTENDEES[5]],
    registeredUserIds: []
  },
  {
    id: 'e5',
    title: 'Golden Hour Picnic',
    description: 'An expressivewide gathering in a lush city park. Bring a blanket, some snacks, and join our community as the warm gold illumination filters through the trees. Perfect for meeting new neighbors, relaxing with old friends, and snapping some phenomenal sunset photos. Open to pets as well!',
    date: '2026-06-08', // Set to Today based on current system date for high fidelity
    time: '18:30',
    location: 'Central Park West',
    locationDetails: 'Great Lawn Section B, New York, NY 10024',
    price: 'FREE',
    isFree: true,
    category: 'Nature',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEcsxkzwy_uL_yGMppRFJ7UgnytNk8YMd3d1l945ma_VRB5rKl-tNq8-QhZ3I1LuF-6yPIaUa665FRBCUs0MpH_ZXd7_ggKaIn7ul7s7G-MVc31PfJ7PIlPZjh8ajyQy-ND9GxMkhQIQwYnmMxdjjjC5VOCR1QPGfIUt8C0-3ANBQ-Xc0obK3qEohTQr6yUCFzZ2pidjs_wA79-B01aT1FxSm2Yn6FSyeV2-2NAY9HO_39CSWFVTgSq6xpORZt75zuMJ95wc0S0-M',
    hostedById: 'u_marcus',
    hostedByName: 'Marcus Chen',
    hostedByAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9ixXFMOHxX7wtQIwsyJtpZ2mFauKE1WElQsMIEXZ92uy4zsnpwmyXu1UC_QS992bWtpoh28qM2IRnkO5TT2KCOl5YnjDTkhAPu-6me_efK2O9xPakHqTwMW5_TQyowUEH_tDltz8rXbdh843wjEKYGeBGyCcduQW48ubTCqrVav_Iy2jGCUMUCkLrh_tohrT4YsQoRhdDshHrGgb6RIcXmozvQSIsV7-O4ABFzEtn0oHkI3XYVs-fnlHJogcWJk1zmasgMuOVhDs',
    attendees: [MOCK_ATTENDEES[0], MOCK_ATTENDEES[1], MOCK_ATTENDEES[2], MOCK_ATTENDEES[4]],
    registeredUserIds: []
  },
  {
    id: 'e6',
    title: 'Creative Night Loop',
    description: 'A vibrant indoor design circle where creators, coders, and artists collaborate in real time. Hosted in a loft with double-height windows and ambient warm lighting, this session focuses on UI iteration, electronic music production, and interactive prototyping. Join us to find partners for your next build!',
    date: '2026-10-14',
    time: '20:00',
    location: 'The Creative Loft',
    locationDetails: 'Flat-3B, 220 Broadway Ave, Austin, TX 78701',
    price: 'FREE',
    isFree: true,
    category: 'Arts',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXEJLJKiOGPjEkUEOje3WcwEG86gLv0MmPZKvDgqmGuCYBbR7B8pNTANeXr9si3va2uJCBgWQk8104aftIems_tq9EkHlwLE7Q3VH6Gq8owNqQPySCMt7yNW6raB9v08_BtDi31UbWz2HOw6x1m-6FtIZ6djo0bDvPJYW54_8ISEI_hqbEV5EBFt4H8iKOJLBw2rmiYFKeNL8ciXM-7UFH7Oaey8SsS9OV-bLA3gvnawhOgHAZ9iOSasxTrj2TIm3iSC37byCaP9w',
    hostedById: 'u_marcus',
    hostedByName: 'Marcus Chen',
    hostedByAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9ixXFMOHxX7wtQIwsyJtpZ2mFauKE1WElQsMIEXZ92uy4zsnpwmyXu1UC_QS992bWtpoh28qM2IRnkO5TT2KCOl5YnjDTkhAPu-6me_efK2O9xPakHqTwMW5_TQyowUEH_tDltz8rXbdh843wjEKYGeBGyCcduQW48ubTCqrVav_Iy2jGCUMUCkLrh_tohrT4YsQoRhdDshHrGgb6RIcXmozvQSIsV7-O4ABFzEtn0oHkI3XYVs-fnlHJogcWJk1zmasgMuOVhDs',
    attendees: [MOCK_ATTENDEES[1], MOCK_ATTENDEES[3], MOCK_ATTENDEES[5]],
    registeredUserIds: []
  }
];
