import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface DeleteAlertProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAlert = ({ open, onClose, onConfirm }: DeleteAlertProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center bg-gray-800 text-gray-100 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-red-500">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            This action cannot be undone. This will permanently delete this
            playlist.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="space-x-4">
          <Button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 border border-gray-500"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-500"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAlert;
