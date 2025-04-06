import ClipeItem from "../clipe-item/clipe-item";

export default async function ClipesList() {
  let baseUrl = "http://localhost:3000";

  if (process.env.VERCEL_ENV === "preview") {
    baseUrl = `https://${process.env.VERCEL_BRANCH_URL}`;
  } else if (
    process.env.VERCEL_ENV === "production" ||
    process.env.VERCEL_ENV === "development"
  ) {
    baseUrl = `https://${process.env.VERCEL_URL}`;
  }

  const [response, data] = await Promise.all([
    fetch(
      `${baseUrl}/api/proxy?url=https://cdn.discordapp.com/attachments/1145570523330379917/1358101550265794880/clipe.mp4?ex=67f29e21%26is=67f14ca1%26hm=6d8c26205295c7fcd04aca932fbd008fec5ee08ea89627bebd43e7ee73627fb1%26`,
    ),
    fetch("https://api.github.com/users/arawns1"),
  ]);

  const videoSrc = response.url;

  const user = await data.json();
  const { name, avatar_url, updated_at } = user;

  const userInfoData = {
    name,
    avatar_url,
    clip_posted_at: updated_at,
  };

  return (
    <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      <ClipeItem src={videoSrc} user={userInfoData} />
      <ClipeItem src={videoSrc} user={userInfoData} />
      <ClipeItem src={videoSrc} user={userInfoData} />
      <ClipeItem src={videoSrc} user={userInfoData} />
      <ClipeItem src={videoSrc} user={userInfoData} />
      <ClipeItem src={videoSrc} user={userInfoData} />
    </section>
  );
}
