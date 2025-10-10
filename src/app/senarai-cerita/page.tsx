import BlogSenarai from "@/components/BlogSenarai";
import SenaraiSection from "@/components/SenaraiSection";
import { blogs } from "@/data/blog";

export default function SenaraiCerita() {
  return (
    <>
      <SenaraiSection
        text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur. Curabitur eros dolor, sollicitudin ut risus vel, efficitur viverra lorem. Vivamus volutpat, massa egestas consectetur dignissim, nisi purus volutpat turpis, in laoreet enim purus sed nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur. Curabitur eros dolor, sollicitudin ut risus vel, efficitur viverra lorem. Vivamus volutpat, massa egestas consectetur dignissim, nisi purus volutpat turpis, in laoreet enim purus sed nibh.`}
      />

      <BlogSenarai posts={blogs} />
    </>
  );
}
