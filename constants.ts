import { Movie, Song } from "./types";

// Using a high-availability example MP3 that is widely supported and has high uptime
// export const VALENTINE_SONG_URL =
//   "https://www.youtube.com/watch?v=oMqIne65uHs&list=RDoMqIne65uHs&start_radio=1";
export const VALENTINE_SONG_URL = "/media/valentine.mp3";

export const MOVIES: Movie[] = [
  {
    title: "Jerry Maguire",
    year: "1996",
    description: "We live in a cynical world.",
    imageUrl:
      "https://i.pinimg.com/736x/27/79/8c/27798c9ffc660c80e239a95abffdcbfa.jpg",
    quote: "I love you for who you are",
  },
  {
    title: "Before Sunrise",
    year: "1995",
    description:
      "I believe if there’s any kind of God, it wouldn’t be in any of us, not you or me, but just this little space in between.",
    imageUrl:
      "https://miro.medium.com/v2/resize:fit:1200/1*1g_6UiIQnvdAIF3uH_OSrA.jpeg",
    quote: "Isn’t everything we do in life a way to be loved a little more?",
  },
  {
    title: "The Amazing Spider-Man",
    year: "2012",
    description:
      "I'll tell you what it says.  Says, 'I love you.' Because I love you.",
    imageUrl:
      "https://imgs.search.brave.com/6Wf6exQVKv6R24QKvauF7cysMaDpKHxt00JmaWwM-6k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMwLmdhbWVyYW50/aW1hZ2VzLmNvbS93/b3JkcHJlc3Mvd3At/Y29udGVudC91cGxv/YWRzLzIwMjEvMTAv/VGhlLUFtYXppbmct/U3BpZGVyLU1hbi1G/cmFuY2hpc2UtR3dl/bi1TdGFjeS1FbW1h/LVN0b25lLmpwZz9x/PTQ5JmZpdD1jcm9w/Jnc9ODI1JmRwcj0y",
    quote: "The future is whatever we make it.",
  },
  {
    title: "Frozen",
    year: "2013",
    description: "Love is putting someone else’s needs before yours.",
    imageUrl:
      "https://imgs.search.brave.com/h_ZEs58e_43piQxpdFbAM1h58YdnIFU01z--Pi1hp6k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sdW1p/ZXJlLWEuYWthbWFp/aGQubmV0L3YxL2lt/YWdlcy9vbGFmLW1l/ZXRpbmctYW5uYS1h/bmQtaGFucy1pbi1m/cm96ZW5fODk3OGIw/YWYuanBlZz9yZWdp/b249MSwwLDk5OCw1/NjE",
    quote: "Some people are worth melting for.",
  },
];

export const SONGS: Song[] = [
  {
    title: "Valentine",
    artist: "Jim Brickman",
    imageUrl:
      "https://imgs.search.brave.com/bePpIdBj0NQUvdfb2j1Z-EKOOnAD4URdLaYHZQe6cak/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmVi/YXlpbWcuY29tL2lt/YWdlcy9nL0Rob0FB/T1N3ckI5bUh2MEQv/cy1sNTAwLmpwZw",
    message: `And even if the sun refused to shine 
        Even if romance ran out of rhyme 
        You would still have my heart until the end of time 
        You're all I need, my love, my Valentine`,
  },
  {
    title: "Stupid In Love",
    artist: "MAX & Huh Yunjin",
    imageUrl:
      "https://imgs.search.brave.com/_qY6pRxI4wPxcThjJ5d4fLiMKLUTmScGj7kLkU9ncHM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZW9w/bGUuY29tL3RobWIv/WDVaWC1VcDFyZGRr/NFNlR09OWU4ya19F/MF9RPS80MDAweDAv/ZmlsdGVyczpub191/cHNjYWxlKCk6bWF4/X2J5dGVzKDE1MDAw/MCk6c3RyaXBfaWNj/KCk6Zm9jYWwoNzIy/eDMxNDo3MjR4MzE2/KS9NQVgtSFVILVlV/TkpJTi1tdXNpYy0w/MjE2MjQtMS0yMzk2/ZTQ0M2U3YWQ0M2Yw/OGI2NTY4MTBhZGM0/NTc5NC5qcGc",
    message: `Beautiful, beautiful, beautiful
      There's something about your eyes
      Tell me these feelings are mutual
      'Cause feelings are so hard to fight`,
  },
  {
    title: "Gravity",
    artist: "Sleep Theory",
    imageUrl:
      "https://imgs.search.brave.com/ZOl50dUWiArGfBAjxuC4oye3O0CQIVLe3zIKJzWo2O8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/c2xlZXAtdGhlb3J5/LWdyYXZpdHktZnJl/ZS1yaW5ndG9uZS1k/b3dubG9hZC12MC0w/MXNrMGpkc3FtNGYx/LmpwZz93aWR0aD02/MDAmZm9ybWF0PXBq/cGcmYXV0bz13ZWJw/JnM9MDY0ZjJiMDJh/ZWU2ZmY5NmRkMzVl/NzgxMDQ1N2EwMjg3/ZDdmNDE3OQ",
    message: `Your eyes say everything I know you've been trying to hide
      Don't try to fight it after all you been through
      Got your head in the clouds, nothing bringing you down
      I could be the gravity that brings the ground to you
      `,
  },
  {
    title: "Seven",
    artist: "Jungkook",
    imageUrl:
      "https://imgs.search.brave.com/dfpo8kERwwtqeupo2VHGBB0L3WFLkJHdckdtdtq3vEY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMS5z/bmRjZG4uY29tL2Fy/dHdvcmtzLWR0bFBr/encxa3hvbUhUTGgt/NmJ5bkRBLXQxMDgw/eDEwODAuanBn",
    message: `Think I met you in another life 
              So break me off another time
              You wrap around me and you give me life
              And that's why night after night
              I'll be lovin' you right`,
  },
];

export const VALENTINE_QUOTES = [
  {
    text: "Love is composed of a single soul inhabiting two bodies.",
    author: "Aristotle",
  },
  {
    text: "Whatever our souls are made of, his and mine are the same.",
    author: "Emily Brontë",
  },
  { text: "Where there is love there is life.", author: "Mahatma Gandhi" },
];
