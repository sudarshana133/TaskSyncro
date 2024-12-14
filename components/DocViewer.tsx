import { getDoc } from "@/utils/module-resource-util";

interface DocViewerProps {
  url: string;
  fileType: string;
}
const DocViewer = async ({ url, fileType }: DocViewerProps) => {
//   const res = await getDoc(url);
//   console.log(res)
  return (
    <div>
      {url}
      {fileType}
    </div>
  );
};
export default DocViewer;
