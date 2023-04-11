import Navbar from "@/components/Navbar";
import PostTweet from "@/components/PostTweet";
import TweetFeed from "@/components/TweetFeed";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-4 h-screen">
        <div className="pt-16"></div>
        <div className="pt-16 bg-white col-span-2 border border-light-gray">
          <p className="text-xl font-semibold border-b w-full p-3">Home</p>
          <TweetFeed />
        </div>
        <div className="pt-16">
          <PostTweet />
        </div>
      </div>
    </>
  );
}
