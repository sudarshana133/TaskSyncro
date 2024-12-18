import MusicSearch from "@/components/music/MusicSearch";

const page = () => {
  return (
    <div className="flex justify-center mt-10">
      <MusicSearch maxRes={20} isHideOn={false} />
    </div>
  );
};
export default page;
