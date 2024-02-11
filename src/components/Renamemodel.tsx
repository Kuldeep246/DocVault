"use client"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { DialogContent, Dialog, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { update } from "firebase/database";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import toast from 'react-hot-toast';



function Renamemodel() {
    const { user } = useUser();
    const [input, setInput] = useState("");
    const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] =
        useAppStore((state) => [
            state.isRenameModalOpen,
            state.setIsRenameModalOpen,
            state.fileId,
            state.filename,
        ]);



    const renameFile = async () => {
        if (!user || !fileId) return;

        const toastId = toast.loading("Renameing...");

        await updateDoc(doc(db, "users", user.id, "files", fileId), {
            filename: input,
        });

        toast.success("Renamed Successfully", {
            id: toastId,
        })
        setInput("");
        setIsRenameModalOpen(false);
    }
    return (
        <Dialog open={isRenameModalOpen}
            onOpenChange={(isOpen) => {
                setIsRenameModalOpen(isOpen);
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="pb-2">Rename the File</DialogTitle>
                </DialogHeader>
                <Input
                    id="Link"
                    defaultValue={filename ?? ''}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDownCapture={(e) => {
                        if (e.key === "Enter") {
                            renameFile();
                        }
                    }}
                />

                <div className="flex justify-end space-x-2 py-3">
                    <Button
                        size="sm"
                        className="px-3"
                        variant={"ghost"}
                        onClick={() => setIsRenameModalOpen(false)}
                    >
                        <span className="sr-only">Rename</span>
                        <span >Rename</span>
                    </Button>

                </div>
            </DialogContent>

        </Dialog>
    )
}

export default Renamemodel
