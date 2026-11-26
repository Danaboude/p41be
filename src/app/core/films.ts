// One list of every self-hosted film on the site.
// Used for the VideoObject structured data (app.ts) and the video sitemap (api/sitemap.ts),
// so titles, files and durations stay the same in both places.

export interface SiteFilm {
  id: string;
  page: string;          // path of the page that shows the film
  anchor: string;        // element id of the film on that page
  name: string;
  description: string;
  file: string;          // path under public/
  poster: string;        // JPG thumbnail under public/ (search engines prefer JPG/PNG)
  durationSec: number;
  uploadDate: string;    // YYYY-MM-DD
}

export const SITE_ORIGIN = 'https://www.p41.be';

export const SITE_FILMS: SiteFilm[] = [
  {
    id: 'linebalance',
    page: '/time-study',
    anchor: 'video',
    name: 'Where do the seconds go? Line balancing with P41 Time Study',
    description: '48,000 bike lights, 20 working days, seven people. A time study and a balanced line take the takt time from 11.3 to 7.2 seconds with the same people and tasks, and the order is done in just over 16 days.',
    file: '/time-study/linebalance-film-720p.mp4',
    poster: '/time-study/linebalance-film-poster.jpg',
    durationSec: 149,
    uploadDate: '2026-11-23'
  },
  {
    id: 'price',
    page: '/time-study',
    anchor: 'cost-film',
    name: 'The price by tomorrow: cost price per unit from a time study',
    description: 'A buyer wants 48,000 lights and a price by tomorrow. P41 Time Study turns the time study into a cost price of €1.17 per light, including allowances, machines, materials, overhead and margin, and shows that paid waiting time from balance loss is real money.',
    file: '/time-study/price-film-720p.mp4',
    poster: '/time-study/price-film-poster.jpg',
    durationSec: 137,
    uploadDate: '2026-11-26'
  },
  {
    id: 'firstday',
    page: '/time-study',
    anchor: 'instructions-film',
    name: 'First day on the line: digital work instructions from the balanced study',
    description: 'A new operator scans a QR code at her station and follows step-by-step work instructions from the balanced study, with photos, safety and quality notes. Her remark goes to the engineer and the instruction updates everywhere.',
    file: '/time-study/firstday-film-720p.mp4',
    poster: '/time-study/firstday-film-poster.jpg',
    durationSec: 128,
    uploadDate: '2026-11-26'
  },
  {
    id: 'teamplanner',
    page: '/teamplanner',
    anchor: 'film',
    name: 'TeamPlanner: plan people, not blocks',
    description: 'From 07:42 chaos to a calm morning: TeamPlanner plans people, teams and vans to the quarter hour, warns before mistakes reach the field and turns the evening close into a draft invoice.',
    file: '/teamplanner/teamplanner-film-1080p.mp4',
    poster: '/teamplanner/teamplanner-film-poster.jpg',
    durationSec: 186,
    uploadDate: '2026-11-22'
  }
];

export const isoDuration = (sec: number) => `PT${Math.floor(sec / 60)}M${sec % 60}S`;
