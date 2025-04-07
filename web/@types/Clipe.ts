export type Clipe = {
  clip_id: string;
  video_src: string;
  posted_at: string;
  user: User;
};

export type User = {
  name: string;
  avatar_url: string;
};
