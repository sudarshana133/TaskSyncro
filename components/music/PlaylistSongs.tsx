import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { convertToTime } from "@/utils/convertToMin";
import { Button } from "../ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import MusicPlayInPlaylist from "../client/MusicPlayInPlaylist";

const PlaylistSongs = ({ songs }: { songs: Song[] }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] sm:w-[100px]">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="hidden sm:table-cell">Artist</TableHead>
            <TableHead className="hidden sm:table-cell text-right">
              Duration
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song, index) => {
            const albumImage =
              song?.image?.[song.image.length - 1]?.url || "/placeholder.svg";
            const artistName =
              song?.artists?.primary?.[0]?.name || "Unknown Artist";

            return (
              <TableRow
                key={index}
                className="group hover:bg-gray-100 transition-colors duration-200"
              >
                <TableCell className="w-12 text-right font-medium text-gray-500">
                  <div className="flex justify-center items-center">
                    <span className="group-hover:hidden">{index + 1}</span>
                    <MusicPlayInPlaylist song={song} />
                  </div>
                </TableCell>

                <TableCell className="flex items-center space-x-2 sm:space-x-4">
                  <Image
                    src={albumImage}
                    alt={song.name}
                    width={1000}
                    height={1000}
                    className="rounded-md w-20 h-20 sm:w-12 sm:h-12 object-cover"
                  />
                  <div>
                    <div className="font-medium text-sm sm:text-base truncate max-w-[150px] sm:max-w-none text-gray-900">
                      {song.name.replace(/&quot;/g, '"')}
                    </div>
                    <div className="text-xs text-gray-500 sm:hidden truncate max-w-[120px]">
                      {artistName}
                    </div>
                  </div>
                </TableCell>

                {/* Artist Name (Visible on Larger Screens) */}
                <TableCell className="hidden sm:table-cell text-gray-600">
                  {artistName}
                </TableCell>

                {/* Duration (Visible on Larger Screens) */}
                <TableCell className="hidden sm:table-cell text-right text-gray-600">
                  {convertToTime(song.duration)}
                </TableCell>

                {/* More Options Button */}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-black w-8 h-8"
                  >
                    <MoreHorizontalIcon className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default PlaylistSongs;
