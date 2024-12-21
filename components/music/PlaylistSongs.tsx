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
import MusicPlayInPlaylist from "../client/MusicPlayInPlaylist";
import SongActions from "./SongActions";

const PlaylistSongs = ({
  songs,
  isPublic,
  playlist,
}: {
  songs: Song[];
  isPublic: boolean;
  playlist: Playlist;
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Artist</TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Duration
            </TableHead>
            {!isPublic && <TableHead className="w-12"></TableHead>}
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
                className="group hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <TableCell className="w-12 p-0 text-center">
                  <div className="flex justify-center items-center h-full">
                    <MusicPlayInPlaylist song={song} playlist={playlist} />
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={albumImage}
                      alt={song.name}
                      width={40}
                      height={40}
                      className="rounded-md w-10 h-10 object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm truncate">
                        {song.name.replace(/&quot;/g, '"')}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate md:hidden">
                        {artistName}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="hidden md:table-cell text-gray-600 dark:text-gray-300">
                  {artistName}
                </TableCell>

                <TableCell className="hidden md:table-cell text-right text-gray-600 dark:text-gray-300">
                  {convertToTime(song.duration)}
                </TableCell>

                {!isPublic && (
                  <TableCell className="w-12 p-0">
                    <div className="flex justify-center">
                      <SongActions song={song} />
                    </div>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlaylistSongs;
