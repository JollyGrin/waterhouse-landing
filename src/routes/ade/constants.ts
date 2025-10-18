// 22nd⬇
// 18:00-19:00 Denzo
// 19:00-20:00 Denzo’s friend
// 20:00-20:21 (N)ARZ
//
// 23rd⬇
// 15:00-16:00 Elemzene
// 16:00-17:00 L4C4
// 17:00-18:00 cosmic sub
// 18:00-20:00 recode rotterdam records
// 20:00-21:00 Alex Sharp
// 21:00-22:00 tbc
//
// 25th⬇
//
// 12:00-13:30 Main identity b2b Althoff
// 13:30-14:30 Ontold
// 14:30-15:30 David Bucka

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
const SAT25 = new Date('Oct 25 2025 GMT+2');

export const LINEUP: EventSlot[] = [
	// Wednesday 22nd
	{
		artist: 'Denzo',
		date: WED22,
		startTime: 1800,
		endTime: 1900,
		instagram: 'the_denzo'
	},
	{
		artist: "Denzo's friend",
		date: WED22,
		startTime: 1900,
		endTime: 2000
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
		endTime: 1600
	},
	{
		artist: 'L4C4',
		date: THUR23,
		startTime: 1600,
		endTime: 1700
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
		endTime: 2000
	},
	{
		artist: 'Alex Sharp',
		date: THUR23,
		startTime: 2000,
		endTime: 2100
	},
	{
		artist: 'tbc',
		date: THUR23,
		startTime: 2100,
		endTime: 2200
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
	}
];
