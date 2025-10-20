// 22nd⬇
// 18:00-19:00 Gil Charleston
// 19:00-20:00 Denzo
// 20:00-21:00 (N)ARZ
//
// 23rd⬇
// 15:00-16:00 Elemzene
// 16:00-17:00 L4C4
// 17:00-18:00 cosmic sub
// 18:00-20:00 recode rotterdam records
// 20:00-21:00 Alex Sharp
// 21:00-22:00 tbc
//
// 24th⬇
// 18:30-19:30 TRÜm
// 19:30-21:00 Stefan Soare
// 21:00-04:00 WATERHOUSE PARTY
//
// 25th⬇
// 12:00-13:30 Main identity b2b Althoff
// 13:30-14:30 Ontold
// 14:30-15:30 David Bucka
// 15:30-16:30 Granular Heat
// 16:30-17:30 TRÜm
// 17:30-18:30 Ides of March

type EventSlot = {
	artist: string;
	date: Date;
	startTime: number;
	endTime: number;
	profilePhotoUrl?: string;
	portfolioUrl?: string;
	instagram?: string;
};

const WED22 = new Date('Oct 22 2025 GMT+2');
const THUR23 = new Date('Oct 23 2025 GMT+2');
const FRI24 = new Date('Oct 24 2025 GMT+2');
const SAT25 = new Date('Oct 25 2025 GMT+2');

export const LINEUP: EventSlot[] = [
	// Wednesday 22nd

	{
		artist: 'Gill Charleston',
		date: WED22,
		startTime: 1800,
		endTime: 1900,
		instagram: 'gillcharleston',
		portfolioUrl: 'http://gillcharleston.com',
		profilePhotoUrl: 'https://i.imgur.com/B2321LI.png'
	},
	{
		artist: 'Denzo',
		date: WED22,
		startTime: 1900,
		endTime: 2000,
		instagram: 'the_denzo',
		profilePhotoUrl: 'https://i.imgur.com/nt2wsuD.png'
	},
	{
		artist: '(N)ARZ',
		date: WED22,
		startTime: 2000,
		endTime: 2100,
		profilePhotoUrl:
			'https://geo-media.beatport.com/image_size/590x404/8edcd12c-7345-42a3-99ba-b35497cabaf2.jpg',
		portfolioUrl: 'https://www.beatport.com/artist/narz/1330744'
	},
	// Thursday 23rd
	{
		artist: 'Elemzene',
		date: THUR23,
		startTime: 1500,
		endTime: 1600,
		portfolioUrl: 'https://soundcloud.com/elemzene',
		profilePhotoUrl: 'https://i1.sndcdn.com/artworks-PrkLDC8z2ZNyL5Y2-IVmtHA-t500x500.png'
	},
	{
		artist: 'L4C4',
		date: THUR23,
		startTime: 1600,
		endTime: 1700,
		instagram: 'l4c4_music',
		profilePhotoUrl: 'https://i.imgur.com/xigqfi9.png'
	},
	{
		artist: 'cosmic sub',
		date: THUR23,
		startTime: 1700,
		endTime: 1800
	},
	{
		artist: 'recode rotterdam records',
		date: THUR23,
		startTime: 1800,
		endTime: 2000,
		instagram: 'recoderecords',
		profilePhotoUrl:
			'https://cloudinary-cdn.ffm.to/s--mA5bY068--/w_256,h_256,c_lfill/f_webp/https%3A%2F%2Fimagestore.ffm.to%2Flink%2Fad8e7cc58d2ab52a1455e4ebb87641fc.png',
		portfolioUrl: 'https://ffm.bio/recode'
	},
	{
		artist: 'Alex Sharp',
		date: THUR23,
		startTime: 2000,
		endTime: 2100,
		instagram: 'alexsharpdj',
		profilePhotoUrl: 'https://i.imgur.com/6icM54s.png',
		portfolioUrl: 'https://linktr.ee/AlexSharp'
	},
	{
		artist: 'tbc',
		date: THUR23,
		startTime: 2100,
		endTime: 2200
	},
	// Friday 24th
	{
		artist: 'TRÜm',
		date: FRI24,
		startTime: 1830,
		endTime: 1930,
		profilePhotoUrl: 'https://i.imgur.com/2UGKBCi.png',
		portfolioUrl: 'https://soundcloud.com/trumofficial/tracks'
	},
	{
		artist: 'Stefan Soare',
		date: FRI24,
		startTime: 1930,
		endTime: 2100,
		profilePhotoUrl: 'https://i.imgur.com/2NrX5JQ.png',
		portfolioUrl: 'https://stefansoaremusic.net',
		instagram: 'stefansoaremusic'
	},
	{
		artist: 'WATERHOUSE PARTY',
		date: FRI24,
		startTime: 2100,
		endTime: 400
	},
	// Saturday 25th
	{
		artist: 'Main identity b2b Althoff',
		date: SAT25,
		startTime: 1200,
		endTime: 1330
	},
	{
		artist: 'Ontold',
		date: SAT25,
		startTime: 1330,
		endTime: 1430
	},
	{
		artist: 'David Bucka',
		date: SAT25,
		startTime: 1430,
		endTime: 1530,
		instagram: 'davidbucka_',
		profilePhotoUrl:
			'https://imgproxy.ra.co/_/quality:66/h:180/w:180/rt:fill/gravity:sm/aHR0cHM6Ly9zdGF0aWMucmEuY28vaW1hZ2VzL3Byb2ZpbGVzL3NxdWFyZS9kYXZpZGJ1Y2thLmpwZz9kYXRlVXBkYXRlZD0xNTY1MTA1NDg3MDAw',
		portfolioUrl: 'https://ra.co/dj/davidbucka'
	},
	{
		artist: 'Granular Heat',
		date: SAT25,
		startTime: 1530,
		endTime: 1630,
		instagram: 'granularheat',
		profilePhotoUrl: 'https://i.imgur.com/Ogx3BZC.png',
		portfolioUrl: 'https://linktr.ee/granularheat'
	},
	{
		artist: 'TRÜm',
		date: SAT25,
		startTime: 1630,
		endTime: 1730,
		profilePhotoUrl: 'https://i.imgur.com/2UGKBCi.png',
		portfolioUrl: 'https://soundcloud.com/trumofficial/tracks'
	},
	{
		artist: 'Ides of March',
		date: SAT25,
		startTime: 1730,
		endTime: 1830
	}
];
