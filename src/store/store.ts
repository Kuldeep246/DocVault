import { create } from "zustand";

interface AppState {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (open: boolean) => void;

    isRenameModalOpen: boolean;
    setIsRenameModalOpen: (open: boolean) => void;

    fileId: string | null;
    setFileId: (fileId: string) => void;

    filename: string | null;
    setFilename: (filename: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
    isDeleteModalOpen: false,
    isRenameModalOpen: false,
    fileId: null,
    filename: "",

    // Actions to update the state
    setIsDeleteModalOpen: (open: boolean) => set((state) => ({ isDeleteModalOpen: open })),
    setIsRenameModalOpen: (open: boolean) => set((state) => ({ isRenameModalOpen: open })),
    setFileId: (fileId: string) => set((state) => ({ fileId })),
    setFilename: (filename: string | null) => set((state) => ({ filename })),
}));
