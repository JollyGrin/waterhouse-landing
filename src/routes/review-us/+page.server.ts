// src/routes/my-redirect/+page.server.js
import { redirect } from '@sveltejs/kit';

const GOOGLE_REVIEW_LINK = 'https://g.page/r/CX-2DOpGDJ9YEAE/review';

export function load() {
  throw redirect(302, GOOGLE_REVIEW_LINK);
}
